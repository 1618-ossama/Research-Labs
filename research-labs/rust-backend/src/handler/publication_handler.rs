use crate::{
    models::{
        publication::{
            CreateConference, LinkPayload, PublicationInput, UpdatePublication,
            UpdatePublicationInput,
        },
        *,
    },
    repositories::{database::Database, postgres_db::PostgresDatabase},
};
use actix_multipart::Multipart;
use actix_web::{web, Error, HttpResponse};
use actix_web::{HttpRequest, Responder};
use uuid::Uuid;

/// Add a publication
pub async fn add_publication(
    db: web::Data<PostgresDatabase>,
    form: web::Json<PublicationInput>,
) -> HttpResponse {
    match db
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
        Ok(_) => HttpResponse::Created().finish(),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

pub async fn update_publication_handler(
    db: web::Data<PostgresDatabase>,
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

    match db.update_publication(id, update).await {
        Ok(_) => HttpResponse::NoContent().finish(),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

/// Delete a publication by ID
pub async fn delete_publication(
    db: web::Data<PostgresDatabase>,
    id: web::Path<Uuid>,
) -> HttpResponse {
    println!("Delete request for publication with the id: {}", id.clone());
    match db.delete_publication(id.into_inner()).await {
        Ok(publi) => HttpResponse::Ok().json(publi),
        Err(_) => HttpResponse::NotFound().finish(),
    }
}

pub async fn get_publication(db: web::Data<PostgresDatabase>, id: web::Path<Uuid>) -> HttpResponse {
    match db.get_publication(id.into_inner()).await {
        Ok(publi) => HttpResponse::Ok().json(publi),
        Err(_) => HttpResponse::NotFound().finish(),
    }
}

/// Get all publications
pub async fn get_publications(db: web::Data<PostgresDatabase>) -> HttpResponse {
    match db.get_publications().await {
        Ok(publications) => HttpResponse::Ok().json(publications),
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

pub async fn get_groups_by_user_id(
    db: web::Data<PostgresDatabase>,
    user_id: web::Path<Uuid>,
) -> HttpResponse {
    return HttpResponse::NoContent().finish();
    // match db.get_groups_by_user_id(user_id.into_inner()).await {
    //     Ok(groups) => HttpResponse::Ok().json(groups),
    //     Err(_) => HttpResponse::InternalServerError().finish(),
    // }
}

/// Add a group
pub async fn add_group(
    db: web::Data<PostgresDatabase>,
    group: web::Json<GroupInput>,
) -> HttpResponse {
    return HttpResponse::NoContent().finish();
    // match db
    //     .add_group(
    //         group.id,
    //         group.title.clone(),
    //         group.description.clone(),
    //         group.status.clone(),
    //         group.leader_id,
    //     )
    //     .await
    // {
    //     Ok(_) => HttpResponse::Created().finish(),
    //     Err(_) => HttpResponse::InternalServerError().finish(),
    // }
}

/// Get a group by ID
pub async fn get_group(db: web::Data<PostgresDatabase>, id: web::Path<Uuid>) -> HttpResponse {
    return HttpResponse::NoContent().finish();

    // match db.get_group(id.into_inner()).await {
    //     Ok(group) => HttpResponse::Ok().json(group),
    //     Err(_) => HttpResponse::NotFound().finish(),
    // }
}

/// Add user to group
pub async fn add_user_to_group(
    db: web::Data<PostgresDatabase>,
    body: web::Json<AddUserToGroupInput>,
) -> HttpResponse {
    return HttpResponse::NoContent().finish();
    // match db.add_user_to_group(body.leader_id, body.group_id).await {
    //     Ok(_) => HttpResponse::Created().finish(),
    //     Err(_) => HttpResponse::InternalServerError().finish(),
    // }
}

pub async fn link_publication(
    db: web::Data<PostgresDatabase>,
    payload: web::Json<LinkPayload>,
) -> HttpResponse {
    for pub_id in &payload.publication_ids {
        if let Err(_) = db
            .link_publication_to_conference(payload.conference_id, *pub_id)
            .await
        {
            return HttpResponse::InternalServerError().finish();
        }
    }
    HttpResponse::Ok().json("Linked successfully.")
}
