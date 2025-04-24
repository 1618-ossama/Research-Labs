pub mod publication;
use serde::Deserialize;
use uuid::Uuid;

#[derive(Deserialize)]
pub struct PublicationInput {
    pub title: String,
    pub journal: String,
    pub status: String,
    pub submitter_id: Uuid,
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
