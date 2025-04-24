use actix_web::{web, HttpResponse};

use crate::repositories::{database::Database, postgres_db::PostgresDatabase};

pub async fn get_publications(db: web::Data<PostgresDatabase>) -> HttpResponse {
    let res = db.into_inner().get_publication(12).await.unwrap();
    HttpResponse::Ok().json(res)
}

pub async fn get_publications_by_user(
    db: web::Data<PostgresDatabase>,
    id: web::Path<u32>,
) -> HttpResponse {
    let res = db
        .into_inner()
        .get_publications_by_user(id.into_inner())
        .await
        .unwrap();
    HttpResponse::Ok().json(res)
}
