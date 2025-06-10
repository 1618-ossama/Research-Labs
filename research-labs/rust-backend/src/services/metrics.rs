use actix_web::{get, web, HttpResponse, Result};

use crate::{handler::publication_handler::AppState, repositories::postgres_db::PostgresDatabase};

#[get("/api/metrics")]
async fn get_metrics(state: web::Data<AppState>) -> Result<HttpResponse> {
    let metrics = state.db_pool.get_metrics().await.map_err(|e| {
        println!("Error collecting metrics: {}", e);
        actix_web::error::ErrorInternalServerError("Failed to collect metrics")
    })?;

    Ok(HttpResponse::Ok().json(metrics))
}
