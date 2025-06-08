mod models;
use actix_cors::Cors;
use dotenv::dotenv;

use handler::publication_handler::AppState;
use redis::Commands;
use repositories::postgres_db::PostgresDatabase;
use routes::route_config;
use services::{metrics::get_metrics, upload::serve_upload_file};
use sqlx::PgPool;
mod handler;
mod routes;

mod repositories;
use actix_web::{
    web::{self},
    App, HttpServer,
};
use std::{env, sync::Arc};
pub mod errors;
pub mod services;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    let host = env::var("RUST_HOST").unwrap();
    let port = env::var("RUST_PORT").unwrap();

    println!("database url: {}", &env::var("DATABASE_URL").unwrap());

    let redis_client =
        redis::Client::open("redis://127.0.0.1/").expect("Failed to connect to Redis");

    let db_pool = PostgresDatabase::new(
        PgPool::connect(&env::var("DATABASE_URL").unwrap())
            .await
            .unwrap(),
    );
    let app_state = web::Data::new(AppState {
        redis_client,
        db_pool: Arc::new(db_pool),
    });

    println!("api running at {host}:{port}");
    HttpServer::new(move || {
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header()
            .supports_credentials();
        App::new()
            .service(serve_upload_file)
            .service(get_metrics)
            .configure(route_config)
            .app_data(app_state.clone())
            .wrap(cors)
    })
    .bind(format!("{host}:{port}"))?
    .run()
    .await
}
