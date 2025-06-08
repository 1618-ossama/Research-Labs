use std::{sync::Arc, time::Duration};

use crate::{
    models::{
        publication::{
            LinkPayload, Publication, PublicationInput, UpdatePublication, UpdatePublicationInput,
        },
        *,
    },
    repositories::postgres_db::PostgresDatabase,
};
use actix_web::{web, HttpResponse};
use redis::Commands;
use uuid::Uuid;

/// Add a publication
pub async fn add_publication(
    state: web::Data<AppState>,
    form: web::Json<PublicationInput>,
) -> HttpResponse {
    match state
        .db_pool
        .add_publication(
            form.title.clone(),
            form.journal.clone(),
            form.abstract_.clone(),
            form.doi.clone(),
            form.status.clone(),
            form.visibility.clone(),
            form.submitter_id,
            form.conference_id,
        )
        .await
    {
        Ok(_) => {
            if let Ok(mut redis_conn) = state.redis_client.get_connection() {
                let _: redis::RedisResult<()> = redis_conn.del("publications_cache");
            }

            return HttpResponse::Created().finish();
        }
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

pub async fn update_publication_handler(
    state: web::Data<AppState>,
    path: web::Path<Uuid>,
    form: web::Json<UpdatePublicationInput>,
) -> HttpResponse {
    let id = path.into_inner();

    // Validate status if present
    if let Some(ref status) = form.status {
        let valid_status = ["DRAFT", "APPROVED", "WAITING", "DELETED"];
        if !valid_status.contains(&status.as_str()) {
            return HttpResponse::BadRequest().finish();
        }
    }
    // Validate visibility if present
    if let Some(ref visibility) = form.visibility {
        let valid_visibility = ["PUBLIC", "PRIVATE"];
        if !valid_visibility.contains(&visibility.as_str()) {
            return HttpResponse::BadRequest().finish();
        }
    }

    let update = UpdatePublication {
        title: form.title.clone(),
        journal: form.journal.clone(),
        abstract_: form.abstract_.clone(),
        doi: form.doi.clone(),
        status: form.status.clone(),
        visibility: form.visibility.clone(),
        conference_id: form.conference_id,
    };

    match state.db_pool.update_publication(id, update).await {
        Ok(_) => HttpResponse::NoContent().finish(),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

/// Delete a publication by ID
pub async fn delete_publication(state: web::Data<AppState>, id: web::Path<Uuid>) -> HttpResponse {
    println!("Delete request for publication with the id: {}", id.clone());
    match state.db_pool.delete_publication(id.into_inner()).await {
        Ok(publi) => HttpResponse::Ok().json(publi),
        Err(_) => HttpResponse::NotFound().finish(),
    }
}

pub async fn get_publication(state: web::Data<AppState>, id: web::Path<Uuid>) -> HttpResponse {
    println!("get pub");
    match state.db_pool.get_publication(id.into_inner()).await {
        Ok(publi) => HttpResponse::Ok().json(publi),
        Err(_) => HttpResponse::NotFound().finish(),
    }
}
#[derive(Clone)]
pub struct AppState {
    pub redis_client: redis::Client,
    pub db_pool: Arc<PostgresDatabase>,
}

pub async fn get_publications(state: web::Data<AppState>) -> HttpResponse {
    let mut redis_conn = match state.redis_client.get_connection() {
        Ok(conn) => conn,
        Err(e) => {
            eprintln!("❌ Redis connection error: {:?}", e);

            return match state.db_pool.get_publications().await {
                Ok(publications) => HttpResponse::Ok().json(publications),
                Err(_) => HttpResponse::InternalServerError().finish(),
            };
        }
        Err(_) => return HttpResponse::InternalServerError().body("Redis error"),
    };

    let cached: redis::RedisResult<Option<String>> = redis_conn.get("publications_cache");

    if let Ok(Some(json_str)) = cached {
        if let Ok(publications) = serde_json::from_str::<Vec<Publication>>(&json_str) {
            println!("return cached value");
            return HttpResponse::Ok().json(publications);
        }
    }

    match state.db_pool.get_publications().await {
        Ok(publications) => {
            if let Ok(json) = serde_json::to_string(&publications) {
                let _: Result<(), _> = redis_conn.set_ex("publications_cache", json, 300);
                // 300s = 5 mens
            }

            HttpResponse::Ok().json(publications)
        }
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

/// Get publications by user
pub async fn get_publications_by_user(
    db: web::Data<PostgresDatabase>,
    user_id: web::Path<Uuid>,
) -> HttpResponse {
    match db.get_publications_by_user(user_id.into_inner()).await {
        Ok(publications) => HttpResponse::Ok().json(publications),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

pub async fn link_publication(
    state: web::Data<AppState>,
    payload: web::Json<LinkPayload>,
) -> HttpResponse {
    for pub_id in &payload.publication_ids {
        if let Err(_) = state
            .db_pool
            .link_publication_to_conference(payload.conference_id, *pub_id)
            .await
        {
            return HttpResponse::InternalServerError().finish();
        }
    }
    HttpResponse::Ok().json("Linked successfully.")
}
