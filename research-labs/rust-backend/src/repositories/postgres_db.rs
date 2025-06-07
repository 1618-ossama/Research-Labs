use crate::errors::*;
use crate::models::metrics::Metrics;
use crate::models::publication::{
    Conference, CreateConference, Group, Publication, PublicationFile, UpdatePublication,
};
use sqlx::postgres::Postgres;
use sqlx::{query, Pool};

use uuid::Uuid;

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
        SELECT id, title, abstract as "abstract_", journal, doi, status, visibility, submitter_id, conference_id, submitted_at::timestamptz AS "submitted_at!"
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
        SELECT id, title, abstract AS "abstract_", journal, doi, status, visibility, submitter_id, conference_id, submitted_at::timestamptz AS "submitted_at!"
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
        let _ = query!(
            "UPDATE publications SET status = 'DELETED' WHERE id = $1",
            publication_id
        )
        .execute(&self.pool)
        .await
        .unwrap();
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
        abstract_: String,
        doi: Option<String>,
        status: Option<String>,
        visibility: Option<String>,
        submitter_id: Uuid,
        conference_id: Option<Uuid>,
    ) -> Result<()> {
        let id = Uuid::new_v4();

        // Apply defaults
        let status = status.unwrap_or_else(|| "DRAFT".to_string());
        let visibility = visibility.unwrap_or_else(|| "PRIVATE".to_string());
        let doi = doi.unwrap_or_else(|| "0".to_string());

        sqlx::query!(
            r#"
        INSERT INTO publications (
            id, title, abstract, journal, doi, status, visibility,
            submitter_id, conference_id
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        "#,
            id,
            title,
            abstract_,
            journal,
            doi,
            status,
            visibility,
            submitter_id,
            conference_id
        )
        .execute(&self.pool)
        .await
        .map_err(|e| {
            eprintln!("Database error while inserting publication: {:?}", e);
            e
        })?;

        println!("Inserted Publication: {:?}", title);
        Ok(())
    }

    pub async fn update_publication(&self, id: Uuid, update: UpdatePublication) -> Result<()> {
        sqlx::query!(
            r#"
        UPDATE publications
        SET
            title = COALESCE($1, title),
            journal = COALESCE($2, journal),
            doi = COALESCE($3, doi),
            status = COALESCE($4, status),
            visibility = COALESCE($5, visibility),
            conference_id = COALESCE($6, conference_id),
            updated_at = NOW()
        WHERE id = $7
        "#,
            update.title,
            update.journal,
            update.doi,
            update.status,
            update.visibility,
            update.conference_id,
            id
        )
        .execute(&self.pool)
        .await?;
        return Ok(());
    }

    pub async fn get_publications_by_user(&self, user_id: Uuid) -> Result<Vec<Publication>> {
        let publications = query_as!(
            Publication,
            r#"
            SELECT id, title, abstract AS "abstract_", journal, doi, status, visibility, submitter_id, conference_id, submitted_at::timestamptz AS "submitted_at!"
            FROM publications
            WHERE submitter_id = $1
            "#,
            user_id
        )
        .fetch_all(&self.pool)
        .await?;
        Ok(publications)
    }

    pub async fn get_conferences_by_user(&self, user_id: Uuid) -> Result<Vec<Conference>> {
        let conferences = query_as!(
            Conference,
            r#"
        SELECT DISTINCT c.id, c.name, c.description, c.location, c.start_date, c.end_date
        FROM conferences c
        INNER JOIN conference_publications cp ON cp.conference_id = c.id
        INNER JOIN publications p ON p.id = cp.publication_id
        WHERE p.submitter_id = $1
        "#,
            user_id
        )
        .fetch_all(&self.pool)
        .await?;
        Ok(conferences)
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
        let publications = sqlx::query_as::<_, Publication>(
            r#"
    SELECT p.id, p.title, p.abstract, p.journal, p.doi,
           p.status, p.visibility, p.submitted_at::timestamptz AS submitted_at,
           p.conference_id, p.submitter_id
    FROM publications p
    INNER JOIN conference_publications cp ON p.id = cp.publication_id
    WHERE cp.conference_id = $1
    "#,
        )
        .bind(conference_id)
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

    pub async fn get_metrics(&self) -> Result<Metrics> {
        let total_users: (i64,) = sqlx::query_as("SELECT COUNT(*) FROM users")
            .fetch_one(&self.pool)
            .await?;

        // Users grouped by role AND status
        let users_by_role_status = sqlx::query_as::<_, (String, String, i64)>(
            "SELECT role, status, COUNT(*) FROM users GROUP BY role, status",
        )
        .fetch_all(&self.pool)
        .await?;

        // New users created in last 7 and 30 days
        let new_users_7d: (i64,) = sqlx::query_as(
            "SELECT COUNT(*) FROM users WHERE created_at >= NOW() - INTERVAL '7 days'",
        )
        .fetch_one(&self.pool)
        .await?;

        let new_users_30d: (i64,) = sqlx::query_as(
            "SELECT COUNT(*) FROM users WHERE created_at >= NOW() - INTERVAL '30 days'",
        )
        .fetch_one(&self.pool)
        .await?;

        let total_publications: (i64,) = sqlx::query_as("SELECT COUNT(*) FROM publications")
            .fetch_one(&self.pool)
            .await?;

        // Publications grouped by status AND visibility
        let publications_by_status_visibility = sqlx::query_as::<_, (String, String, i64)>(
            "SELECT status, visibility, COUNT(*) FROM publications GROUP BY status, visibility",
        )
        .fetch_all(&self.pool)
        .await?;

        // New publications created in last 7 and 30 days
        let new_publications_7d: (i64,) = sqlx::query_as(
            "SELECT COUNT(*) FROM publications WHERE submitted_at >= NOW() - INTERVAL '7 days'",
        )
        .fetch_one(&self.pool)
        .await?;

        let new_publications_30d: (i64,) = sqlx::query_as(
            "SELECT COUNT(*) FROM publications WHERE submitted_at >= NOW() - INTERVAL '30 days'",
        )
        .fetch_one(&self.pool)
        .await?;

        let total_conferences: (i64,) = sqlx::query_as("SELECT COUNT(*) FROM conferences")
            .fetch_one(&self.pool)
            .await?;

        // Conferences starting within next 30 days
        let upcoming_conferences_30d: (i64,) = sqlx::query_as(
            "SELECT COUNT(*) FROM conferences WHERE start_date >= NOW() AND start_date <= NOW() + INTERVAL '30 days'",
        )
        .fetch_one(&self.pool)
        .await?;

        // Publications count per conference
        let publications_per_conference = sqlx::query_as::<_, (Uuid, String, i64)>(
            r#"
            SELECT c.id, c.name, COUNT(p.id)
            FROM publications p
            JOIN conferences c ON p.conference_id = c.id
            GROUP BY c.id, c.name
            ORDER BY COUNT(p.id) DESC
            LIMIT 10
            "#,
        )
        .fetch_all(&self.pool)
        .await?;

        // Top users by publications count
        let top_users_by_publications = sqlx::query_as::<_, (Uuid, String, i64)>(
            r#"
            SELECT u.id, u.username, COUNT(p.id)
            FROM users u
            JOIN publications p ON u.id = p.submitter_id
            GROUP BY u.id, u.username
            ORDER BY COUNT(p.id) DESC
            LIMIT 5
            "#,
        )
        .fetch_all(&self.pool)
        .await?;

        Ok(Metrics {
            total_users: total_users.0,
            users_by_role_status,
            new_users_7d: new_users_7d.0,
            new_users_30d: new_users_30d.0,
            total_publications: total_publications.0,
            publications_by_status_visibility,
            new_publications_7d: new_publications_7d.0,
            new_publications_30d: new_publications_30d.0,
            total_conferences: total_conferences.0,
            upcoming_conferences_30d: upcoming_conferences_30d.0,
            publications_per_conference,
            top_users_by_publications,
        })
    }
}
