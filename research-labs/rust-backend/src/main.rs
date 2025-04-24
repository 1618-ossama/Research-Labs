mod models;
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
    let host = env::var("HOST").unwrap();
    let port = env::var("PORT").unwrap();

    let db_pool = PostgresDatabase::new(
        PgPool::connect(&env::var("DATABASE_URL").unwrap())
            .await
            .unwrap(),
    );

    println!("api running at {host}:{port}");
    HttpServer::new(move || {
        App::new()
            .configure(route_config)
            .app_data(Data::new(db_pool.clone()))
    })
    .bind(format!("{host}:{port}"))?
    .run()
    .await
}
