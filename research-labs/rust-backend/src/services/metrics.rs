use actix_web::{get, web, HttpResponse, Result};

use crate::repositories::postgres_db::PostgresDatabase;

#[get("/api/metrics")]
async fn get_metrics(data: web::Data<PostgresDatabase>) -> Result<HttpResponse> {
    let metrics = data.get_metrics().await.map_err(|e| {
        println!("Error collecting metrics: {}", e);
        actix_web::error::ErrorInternalServerError("Failed to collect metrics")
    })?;

    Ok(HttpResponse::Ok().json(metrics))
}
