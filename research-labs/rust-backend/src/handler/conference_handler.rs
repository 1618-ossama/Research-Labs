use actix_web::{web, HttpResponse, Responder};
use redis::Commands;
use uuid::Uuid;

use crate::{
    models::publication::{Conference, CreateConference},
    // repositories::postgres_db::PostgresDatabase,
};

use super::publication_handler::AppState;

pub async fn get_all_conferences(state: web::Data<AppState>) -> HttpResponse {
    let redis_key = "conferences_cache";
    if let Ok(mut redis_conn) = state.redis_client.get_connection() {
        if let Ok(Some(cached)) = redis_conn.get::<_, Option<String>>(redis_key) {
            if let Ok(conferences) = serde_json::from_str::<Vec<Conference>>(&cached) {
                println!("Return Cached data");
                return HttpResponse::Ok().json(conferences);
            }
        }
    }

    match state.db_pool.get_all_conferences().await {
        Ok(conferences) => {
            if let Ok(mut redis_conn) = state.redis_client.get_connection() {
                let _: redis::RedisResult<()> =
                    redis_conn.set(redis_key, serde_json::to_string(&conferences).unwrap());
            }

            HttpResponse::Ok().json(conferences)
        }
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

pub async fn get_conference_by_id(state: web::Data<AppState>, id: web::Path<Uuid>) -> HttpResponse {
    print!("get_conference_by_id");
    match state.db_pool.get_conference_by_id(id.into_inner()).await {
        Ok(conf) => HttpResponse::Ok().json(conf),
        Err(_) => HttpResponse::NotFound().finish(),
    }
}

pub async fn create_conference(
    state: web::Data<AppState>,
    payload: web::Json<CreateConference>,
) -> HttpResponse {
    match state.db_pool.create_conference(payload.into_inner()).await {
        Ok(id) => HttpResponse::Created().json(id),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

pub async fn get_conference_pubs(
    state: web::Data<AppState>,
    path: web::Path<Uuid>,
) -> impl Responder {
    let conference_id = path.into_inner();
    println!("conf: {}", conference_id);

    match state
        .db_pool
        .get_publications_by_conference(conference_id)
        .await
    {
        Ok(publications) => HttpResponse::Ok().json(publications),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

pub async fn update_conference(
    _state: web::Data<AppState>,
    _id: web::Path<Uuid>,
    _payload: web::Json<CreateConference>,
) -> HttpResponse {
    return HttpResponse::NoContent().finish();
    // match state.db_pool
    //     .update_conference(id.into_inner(), payload.into_inner())
    //     .await
    // {
    //     Ok(_) => HttpResponse::Ok().finish(),
    //     Err(_) => HttpResponse::NotFound().finish(),
    // }
}

pub async fn delete_conference(state: web::Data<AppState>, id: web::Path<Uuid>) -> HttpResponse {
    return HttpResponse::NoContent().finish();
    match state.db_pool.delete_conference(id.into_inner()).await {
        Ok(_) => HttpResponse::Ok().finish(),
        Err(_) => HttpResponse::NotFound().finish(),
    }
}

pub async fn get_conferences_by_user(
    state: web::Data<AppState>,
    user_id: web::Path<Uuid>,
) -> HttpResponse {
    match state
        .db_pool
        .get_conferences_by_user(user_id.into_inner())
        .await
    {
        Ok(conf) => HttpResponse::Ok().json(conf),
        Err(_) => HttpResponse::NotFound().finish(),
    }
}
