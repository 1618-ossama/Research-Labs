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
