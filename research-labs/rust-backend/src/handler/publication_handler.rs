use actix_web::{web, HttpResponse};

use crate::{
    models::publication::Publication,
    repositories::{database::Database, postgres_db::PostgresDatabase},
};

pub async fn get_publications(db: web::Data<PostgresDatabase>) -> HttpResponse {
    let res = db.into_inner().get_publication(12).await.unwrap();
    HttpResponse::Ok().json(res)
}
