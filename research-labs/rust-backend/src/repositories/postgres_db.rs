use crate::errors::*;
use crate::models::publication::Publication;
use sqlx::postgres::Postgres;
use sqlx::{query, Pool};

use super::database::Database;
pub struct PostgresDatabase {
    pub pool: Pool<Postgres>,
}
impl Clone for PostgresDatabase {
    fn clone(&self) -> Self {
        PostgresDatabase {
            pool: self.pool.clone(),
        }
    }
}
impl PostgresDatabase {
    pub fn new(pool: Pool<Postgres>) -> Self {
        PostgresDatabase { pool: pool }
    }
}
impl Database for PostgresDatabase {
    async fn get_publication(&self, publication_id: u32) -> Result<Vec<Publication>> {
        let record: Vec<Publication>;
        let res = query!("Select * from publications")
            .map(|record| Publication {
                id: record.id as u32,
                title: record.title,
                journal: record.journal,
                status: record.status,
                submitter_id: record.submitter_id as u32,
                submiited_at: record.submitted_at.to_string(),
            })
            .fetch_all(&self.pool)
            .await?;
        return Ok(res);
    }
    async fn add_publication(
        &self,
        title: String,
        journal: String,
        status: String,
        submitter_id: u32,
    ) -> Result<()> {
        let res = query("Select * from publications")
            .execute(&self.pool)
            .await
            .unwrap();
        return Ok(());
    }
    async fn get_publications_by_user(
        &self,
        user_id: u32,
    ) -> Result<Vec<crate::models::publication::Publication>> {
        todo!()
    }
}
