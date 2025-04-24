use serde::{Deserialize, Serialize};
use sqlx::types::time::OffsetDateTime;

#[derive(Debug, Deserialize, Serialize)]
pub struct Publication {
    pub id: u32,
    pub title: String,
    pub journal: String,
    pub status: String,
    pub submitter_id: u32,
    pub submiited_at: String,
}

use sqlx::FromRow;
use uuid::Uuid;

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct User {
    pub id: i32,
    pub username: String,
    pub email: String,
    pub password_hash: String,
    pub role: String,
    pub created_at: chrono::NaiveDateTime,
    pub updated_at: chrono::NaiveDateTime,
}
#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct PublicationFile {
    pub id: Uuid,
    pub file_type: String,
    pub file_path: String,
    pub publication_id: i32,
}

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct Group {
    pub id: Uuid,
    pub title: String,
    pub description: String,
    pub status: String,
    pub created_at: chrono::DateTime<chrono::Utc>,
    pub leader_id: i32,
}
#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct GroupUser {
    pub leader_id: i32,
    pub group_id: Uuid,
}
