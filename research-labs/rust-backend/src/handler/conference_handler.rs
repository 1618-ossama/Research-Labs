use actix_web::{web, HttpResponse, Responder};
use uuid::Uuid;

use crate::{models::publication::CreateConference, repositories::postgres_db::PostgresDatabase};

pub async fn get_all_conferences(db: web::Data<PostgresDatabase>) -> HttpResponse {
    match db.get_all_conferences().await {
        Ok(list) => HttpResponse::Ok().json(list),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

pub async fn get_conference_by_id(
    db: web::Data<PostgresDatabase>,
    id: web::Path<Uuid>,
) -> HttpResponse {
    match db.get_conference_by_id(id.into_inner()).await {
        Ok(conf) => HttpResponse::Ok().json(conf),
        Err(_) => HttpResponse::NotFound().finish(),
    }
}

pub async fn create_conference(
    db: web::Data<PostgresDatabase>,
    payload: web::Json<CreateConference>,
) -> HttpResponse {
    match db.create_conference(payload.into_inner()).await {
        Ok(id) => HttpResponse::Created().json(id),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}
pub async fn get_conference_pubs(
    db: web::Data<PostgresDatabase>,
    path: web::Path<Uuid>,
) -> impl Responder {
    let conference_id = path.into_inner();
    println!("conf: {}", conference_id);

    match db.get_publications_by_conference(conference_id).await {
        Ok(publications) => HttpResponse::Ok().json(publications),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

pub async fn update_conference(
    db: web::Data<PostgresDatabase>,
    id: web::Path<Uuid>,
    payload: web::Json<CreateConference>,
) -> HttpResponse {
    return HttpResponse::NoContent().finish();
    // match db
    //     .update_conference(id.into_inner(), payload.into_inner())
    //     .await
    // {
    //     Ok(_) => HttpResponse::Ok().finish(),
    //     Err(_) => HttpResponse::NotFound().finish(),
    // }
}

pub async fn delete_conference(
    db: web::Data<PostgresDatabase>,
    id: web::Path<Uuid>,
) -> HttpResponse {
    return HttpResponse::NoContent().finish();
    // match db.delete_conference(id.into_inner()).await {
    //     Ok(_) => HttpResponse::Ok().finish(),
    //     Err(_) => HttpResponse::NotFound().finish(),
    // }
}
