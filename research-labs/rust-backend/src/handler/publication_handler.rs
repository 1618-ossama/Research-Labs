use actix_web::{web, HttpResponse};
use uuid::Uuid;

use crate::{
    models::*,
    repositories::{database::Database, postgres_db::PostgresDatabase},
};

/// Add a publication
pub async fn add_publication(
    db: web::Data<PostgresDatabase>,
    form: web::Json<PublicationInput>,
) -> HttpResponse {
    match db
        .add_publication(
            form.title.clone(),
            form.journal.clone(),
            form.status.clone(),
            form.submitter_id,
        )
        .await
    {
        Ok(_) => HttpResponse::Created().finish(),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

/// Get a publication by ID
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

/// Add file to a publication
pub async fn add_file(
    db: web::Data<PostgresDatabase>,
    file: web::Json<PublicationFileInput>,
) -> HttpResponse {
    match db
        .add_file(
            file.id,
            file.file_type.clone(),
            file.file_path.clone(),
            file.publication_id,
        )
        .await
    {
        Ok(_) => HttpResponse::Created().finish(),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

pub async fn get_groups_by_user_id(
    db: web::Data<PostgresDatabase>,
    user_id: web::Path<Uuid>,
) -> HttpResponse {
    match db.get_groups_by_user_id(user_id.into_inner()).await {
        Ok(groups) => HttpResponse::Ok().json(groups),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}
/// Get files for a publication
pub async fn get_files_by_publication(
    db: web::Data<PostgresDatabase>,
    id: web::Path<Uuid>,
) -> HttpResponse {
    match db.get_files_by_publication(id.into_inner()).await {
        Ok(files) => HttpResponse::Ok().json(files),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

/// Add a group
pub async fn add_group(
    db: web::Data<PostgresDatabase>,
    group: web::Json<GroupInput>,
) -> HttpResponse {
    match db
        .add_group(
            group.id,
            group.title.clone(),
            group.description.clone(),
            group.status.clone(),
            group.leader_id,
        )
        .await
    {
        Ok(_) => HttpResponse::Created().finish(),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

/// Get a group by ID
pub async fn get_group(db: web::Data<PostgresDatabase>, id: web::Path<Uuid>) -> HttpResponse {
    match db.get_group(id.into_inner()).await {
        Ok(group) => HttpResponse::Ok().json(group),
        Err(_) => HttpResponse::NotFound().finish(),
    }
}

/// Add user to group
pub async fn add_user_to_group(
    db: web::Data<PostgresDatabase>,
    body: web::Json<AddUserToGroupInput>,
) -> HttpResponse {
    match db.add_user_to_group(body.leader_id, body.group_id).await {
        Ok(_) => HttpResponse::Created().finish(),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}
