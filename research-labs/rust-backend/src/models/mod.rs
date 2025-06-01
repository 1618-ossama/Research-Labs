pub mod metrics;
pub mod publication;
use serde::Deserialize;
use uuid::Uuid;

// use chrono::{DateTime, Utc};
#[derive(Deserialize)]
pub struct UpdatePublication {
    pub title: Option<String>,
    pub journal: Option<String>,
    pub doi: Option<String>,
    pub status: Option<String>, // "DRAFT", "APPROVED", "WAITING", "DELETED"
    pub visibility: Option<String>, // "PUBLIC", "PRIVATE"
    pub conference_id: Option<Uuid>,
}

#[derive(Deserialize)]
pub struct UpdatePublicationInput {
    pub title: Option<String>,
    pub journal: Option<String>,
    pub doi: Option<String>,
    pub status: Option<String>,
    pub visibility: Option<String>,
    pub conference_id: Option<Uuid>,
}
#[derive(Deserialize)]
pub struct PublicationInput {
    pub title: String,
    pub journal: String,
    pub doi: Option<String>,
    pub status: Option<String>,
    pub visibility: Option<String>,
    pub submitter_id: Uuid,
    pub conference_id: Option<Uuid>,
}

#[derive(Deserialize)]
pub struct PublicationFileInput {
    pub id: Uuid,
    pub file_type: String,
    pub file_path: String,
    pub publication_id: Uuid,
}

#[derive(Deserialize)]
pub struct GroupInput {
    pub id: Uuid,
    pub title: String,
    pub description: String,
    pub status: String,
    pub leader_id: Uuid,
}

#[derive(Deserialize)]
pub struct AddUserToGroupInput {
    pub leader_id: Uuid,
    pub group_id: Uuid,
}
