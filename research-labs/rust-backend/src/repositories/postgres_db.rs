use crate::errors::*;
use crate::models::publication::{Group, Publication, PublicationFile};
use sqlx::postgres::Postgres;
use sqlx::{query, Pool};
use uuid::Uuid;

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
    async fn get_publication(&self, publication_id: Uuid) -> Result<Publication> {
        let record = sqlx::query!("SELECT * FROM publications WHERE id = $1", publication_id)
            .fetch_one(&self.pool)
            .await?;

        let publication = Publication {
            id: record.id,
            title: record.title,
            journal: record.journal,
            status: record.status,
            submitter_id: record.submitter_id,
            submiited_at: record.submitted_at.to_string(),
        };

        Ok(publication)
    }

    async fn get_publications(&self) -> Result<Vec<Publication>> {
        let record: Vec<Publication>;
        let res = query!("Select * from publications")
            .map(|record| Publication {
                id: record.id,
                title: record.title,
                journal: record.journal,
                status: record.status,
                submitter_id: record.submitter_id,
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
        submitter_id: Uuid,
    ) -> Result<()> {
        sqlx::query!(
            "insert into publications(title,journal,status,submitter_id) values($1,$2,$3,$4)",
            title,
            journal,
            status,
            submitter_id
        )
        .execute(&self.pool)
        .await
        .unwrap();
        println!("Inserted Problem:{:?}", title);
        Ok(())
    }
    async fn get_publications_by_user(
        &self,
        user_id: Uuid,
    ) -> Result<Vec<crate::models::publication::Publication>> {
        let record: Vec<Publication>;
        let res = query!("Select * from publications where submitter_id=$1", user_id)
            .map(|record| Publication {
                id: record.id,
                title: record.title,
                journal: record.journal,
                status: record.status,
                submitter_id: record.submitter_id,
                submiited_at: record.submitted_at.to_string(),
            })
            .fetch_all(&self.pool)
            .await?;
        return Ok(res);
    }
    // PUBLICATION FILES
    async fn add_file(
        &self,
        id: Uuid,
        file_type: String,
        file_path: String,
        publication_id: Uuid,
    ) -> Result<()> {
        sqlx::query!(
            "INSERT INTO publication_files (id, file_type, file_path, publication_id)
         VALUES ($1, $2, $3, $4)",
            id,
            file_type,
            file_path,
            publication_id
        )
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    async fn get_files_by_publication(&self, publication_id: Uuid) -> Result<Vec<PublicationFile>> {
        let files = sqlx::query_as!(
            PublicationFile,
            "SELECT id, file_type, file_path, publication_id
         FROM publication_files WHERE publication_id = $1",
            publication_id
        )
        .fetch_all(&self.pool)
        .await?;
        Ok(files)
    }

    // GROUPS
    async fn add_group(
        &self,
        id: Uuid,
        title: String,
        description: String,
        status: String,
        leader_id: Uuid,
    ) -> Result<()> {
        sqlx::query!(
            "INSERT INTO groups (id, title, description, status, leader_id)
         VALUES ($1, $2, $3, $4, $5)",
            id,
            title,
            description,
            status,
            leader_id
        )
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    async fn get_groups_by_user_id(&self, user_id: Uuid) -> Result<Vec<Group>> {
        let groups = sqlx::query_as!(
            Group,
            "SELECT g.id, g.title, g.description, g.status, g.created_at, g.leader_id
         FROM groups g
         JOIN group_user gu ON gu.group_id = g.id
         WHERE gu.leader_id = $1",
            user_id
        )
        .fetch_all(&self.pool)
        .await?;
        Ok(groups)
    }

    async fn get_group(&self, group_id: Uuid) -> Result<Group> {
        let group = sqlx::query_as!(
            Group,
            "SELECT id, title, description, status, created_at, leader_id
         FROM groups WHERE id = $1",
            group_id
        )
        .fetch_one(&self.pool)
        .await?;
        Ok(group)
    }

    // GROUP-USER
    async fn add_user_to_group(&self, leader_id: Uuid, group_id: Uuid) -> Result<()> {
        sqlx::query!(
            "INSERT INTO group_user (leader_id, group_id) VALUES ($1, $2)",
            leader_id,
            group_id
        )
        .execute(&self.pool)
        .await?;
        Ok(())
    }
}
