use crate::errors::*;
use crate::models::publication::{
    Conference, CreateConference, Group, Publication, PublicationFile,
};
use sqlx::postgres::Postgres;
use sqlx::{query, Pool, Transaction};

use time::{OffsetDateTime, PrimitiveDateTime};
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
        PostgresDatabase { pool }
    }
}
use sqlx::query_as;

impl PostgresDatabase {
    pub async fn get_publication(&self, publication_id: Uuid) -> Result<Publication> {
        let publication = sqlx::query_as!(
        Publication,
        r#"
        SELECT id, title, journal, doi, status, visibility, submitter_id, conference_id, submitted_at
        FROM publications
        WHERE id = $1
        "#,
        publication_id
    )
    .fetch_one(&self.pool)
    .await?;

        Ok(publication)
    }

    pub async fn get_publications(&self) -> Result<Vec<Publication>> {
        let publications = sqlx::query_as!(
        Publication,
        r#"
        SELECT id, title, journal, doi, status, visibility, submitter_id, conference_id, submitted_at
        FROM publications
        "#
    )
    .fetch_all(&self.pool)
    .await?;

        Ok(publications)
    }
    pub async fn get_files_by_publication(
        &self,
        publication_id: Uuid,
    ) -> Result<Vec<PublicationFile>> {
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
    // PUBLICATION FILES
    pub async fn add_file(
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

    pub async fn delete_publication(&self, publication_id: Uuid) -> Result<()> {
        let _ = query!("Delete from publications where id=$1", publication_id)
            .execute(&self.pool)
            .await?;
        return Ok(());
    }

    // async fn get_files_by_publication(&self, publication_id: Uuid) -> Result<Vec<PublicationFile>> {
    //     let files = sqlx::query_as!(
    //         PublicationFile,
    //         "SELECT id, file_type, file_path, publication_id
    //      FROM publication_files WHERE publication_id = $1",
    //         publication_id
    //     )
    //     .fetch_all(&self.pool)
    //     .await?;
    //     Ok(files)
    // }
    pub async fn add_publication(
        &self,
        title: String,
        journal: String,
        status: String,
        submitter_id: Uuid,
    ) -> Result<()> {
        let id = Uuid::new_v4();
        sqlx::query!(
            "insert into publications(id, title,journal,status,submitter_id) values($1,$2,$3,$4,$5)",
            id,
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
    pub async fn get_publications_by_user(&self, user_id: Uuid) -> Result<Vec<Publication>> {
        let publications = query_as!(
            Publication,
            r#"
            SELECT id, title, journal, doi, status, visibility, submitter_id, conference_id, submitted_at
            FROM publications
            WHERE submitter_id = $1
            "#,
            user_id
        )
        .fetch_all(&self.pool)
        .await?;
        Ok(publications)
    }
    pub async fn get_publications_by_conference_id(
        &self,
        conference_id: Uuid,
    ) -> Result<Vec<Publication>> {
        let publications = sqlx::query_as!(
            Publication,
            r#"
        SELECT p.id, p.title, p.journal, p.doi, p.status, p.visibility,
               p.submitter_id, p.conference_id, p.submitted_at
        FROM publications p
        INNER JOIN conference_publications cp ON p.id = cp.publication_id
        WHERE cp.conference_id = $1
        "#,
            conference_id
        )
        .fetch_all(&self.pool)
        .await?;

        Ok(publications)
    }

    pub async fn get_all_conferences(&self) -> Result<Vec<Conference>> {
        let conferences = sqlx::query_as!(
            Conference,
            r#"
        SELECT id, name, description, location, start_date, end_date
        FROM conferences
        "#
        )
        .fetch_all(&self.pool)
        .await?;

        Ok(conferences)
    }

    pub async fn get_conference_by_id(&self, id: Uuid) -> Result<Conference> {
        let conf = sqlx::query_as!(
            Conference,
            r#"
        SELECT id, name, description, location, start_date, end_date
        FROM conferences
        WHERE id = $1
        "#,
            id
        )
        .fetch_one(&self.pool)
        .await?;

        // Return conference with no publications loaded
        Ok(conf)
    }

    pub async fn create_conference(&self, data: CreateConference) -> Result<Uuid> {
        let conference_id = Uuid::new_v4();

        sqlx::query!(
            r#"
        INSERT INTO conferences (id, name, description, location, start_date, end_date)
        VALUES ($1, $2, $3, $4, $5, $6)
        "#,
            conference_id,
            data.name,
            data.description,
            data.location,
            data.start_date,
            data.end_date
        )
        .execute(&self.pool)
        .await?;

        Ok(conference_id)
    }
    pub async fn get_publications_by_conference(
        &self,
        conference_id: Uuid,
    ) -> Result<Vec<Publication>> {
        // Assuming you have a join table `conference_publications` linking publications to conferences
        // Adjust the query if you store `conference_id` directly in `publications` table instead

        let publications = sqlx::query_as!(
            Publication,
            r#"
            SELECT p.id, p.title, p.journal, p.doi, p.status, p.visibility, p.submitted_at, p.conference_id, p.submitter_id
            FROM publications p
            INNER JOIN conference_publications cp ON p.id = cp.publication_id
            WHERE cp.conference_id = $1
            "#,
            conference_id
        )
        .fetch_all(&self.pool)
        .await?;

        println!("{:#?}", publications);
        Ok(publications)
    }
    pub async fn link_publication_to_conference(
        &self,
        conference_id: Uuid,
        publication_id: Uuid,
    ) -> Result<()> {
        sqlx::query!(
            r#"
        INSERT INTO conference_publications (conference_id, publication_id)
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING
        "#,
            conference_id,
            publication_id
        )
        .execute(&self.pool)
        .await?;

        Ok(())
    }
}
