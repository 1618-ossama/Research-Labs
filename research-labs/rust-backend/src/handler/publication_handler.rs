use actix_web::{web, HttpResponse};
use uuid::Uuid;

use crate::repositories::{database::Database, postgres_db::PostgresDatabase};

pub async fn get_publications(db: web::Data<PostgresDatabase>) -> HttpResponse {
    let res = db
        .into_inner()
        .get_publication(Uuid::from_u128(1))
        .await
        .unwrap();
    HttpResponse::Ok().json(res)
}

pub async fn get_publications_by_user(
    db: web::Data<PostgresDatabase>,
    id: web::Path<u32>,
) -> HttpResponse {
    let res = db
        .into_inner()
        .get_publications_by_user(Uuid::from_u128(id.into_inner() as u128))
        .await
        .unwrap();
    HttpResponse::Ok().json(res)
}
