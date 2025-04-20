use actix_web::{get, web, HttpResponse};

use crate::{
    models::publication::Publication,
    repositories::{database::Database, postgres_db::PostgresDatabase},
};

pub async fn get_publications(db: web::Data<PostgresDatabase>) -> HttpResponse {
    let res = db.into_inner().get_publication(12).await.unwrap();
    HttpResponse::Ok().json(res)
}

#[get("/publications/{id}")]
pub async fn get_publications_by_user(
    db: web::Data<PostgresDatabase>,
    user_id: web::Path<u32>,
) -> HttpResponse {
    let res = db
        .into_inner()
        .get_publications_by_user(user_id.into_inner())
        .await
        .unwrap();
    HttpResponse::Ok().json(res)
}
