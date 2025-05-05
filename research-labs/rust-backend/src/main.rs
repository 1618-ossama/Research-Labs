mod models;
use actix_cors::Cors;
use dotenv::dotenv;

use repositories::postgres_db::PostgresDatabase;
use routes::route_config;
use sqlx::PgPool;
mod handler;
mod routes;

mod repositories;
use actix_web::{web::Data, App, HttpServer};
use std::env;
pub mod errors;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    let host = env::var("RUST_HOST").unwrap();
    let port = env::var("RUST_PORT").unwrap();

    println!("database url: {}", &env::var("DATABASE_URL").unwrap());
    let db_pool = PostgresDatabase::new(
        PgPool::connect(&env::var("DATABASE_URL").unwrap())
            .await
            .unwrap(),
    );

    println!("api running at {host}:{port}");
    HttpServer::new(move || {
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header();
        App::new()
            .configure(route_config)
            .app_data(Data::new(db_pool.clone()))
            .wrap(cors)
    })
    .bind(format!("{host}:{port}"))?
    .run()
    .await
}
