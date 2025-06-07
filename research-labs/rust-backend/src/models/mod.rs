pub mod metrics;
pub mod publication;
use serde::Deserialize;
use uuid::Uuid;

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
