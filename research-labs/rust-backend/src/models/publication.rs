use serde::{Deserialize, Deserializer, Serialize};
use sqlx::types::time::OffsetDateTime;

use sqlx::FromRow;
#[derive(Serialize, Deserialize, Debug, FromRow)]
pub struct Publication {
    pub id: Uuid,
    pub title: String,

    #[serde(rename = "abstract")]
    #[sqlx(rename = "abstract")]
    pub abstract_: Option<String>,

    pub journal: String,
    pub doi: Option<String>,
    pub status: String,
    pub visibility: String,

    pub submitter_id: Option<Uuid>,
    pub conference_id: Option<Uuid>,
    pub submitted_at: OffsetDateTime,
}
#[derive(Deserialize)]
pub struct LinkPayload {
    pub conference_id: Uuid,
    pub publication_ids: Vec<Uuid>,
    pub user_id: String,
}

// use chrono::{DateTime, Utc};
#[derive(Deserialize, FromRow)]
pub struct UpdatePublication {
    pub title: Option<String>,
    pub journal: Option<String>,
    #[serde(rename = "abstract")]
    #[sqlx(rename = "abstract")]
    pub abstract_: String,
    pub doi: Option<String>,
    pub status: Option<String>, // "DRAFT", "APPROVED", "WAITING", "DELETED"
    pub visibility: Option<String>, // "PUBLIC", "PRIVATE"
    pub conference_id: Option<Uuid>,
}

#[derive(Deserialize, FromRow)]
pub struct UpdatePublicationInput {
    pub title: Option<String>,
    pub journal: Option<String>,
    #[serde(rename = "abstract")]
    #[sqlx(rename = "abstract")]
    pub abstract_: String,
    pub doi: Option<String>,
    pub status: Option<String>,
    pub visibility: Option<String>,
    pub conference_id: Option<Uuid>,
}
#[derive(Deserialize, FromRow)]
pub struct PublicationInput {
    pub title: String,
    pub journal: String,
    #[serde(rename = "abstract")]
    #[sqlx(rename = "abstract")]
    pub abstract_: String,
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
use time::PrimitiveDateTime;
use uuid::Uuid;

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct User {
    pub id: Uuid,
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
    pub publication_id: Uuid,
}

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct Group {
    pub id: Uuid,
    pub title: String,
    pub description: String,
    pub status: String,
    pub created_at: OffsetDateTime,
    pub leader_id: Uuid,
}
#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct GroupUser {
    pub leader_id: Uuid,
    pub group_id: Uuid,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Conference {
    pub id: Uuid,
    pub name: String,
    pub description: String,
    pub location: String,
    pub start_date: time::PrimitiveDateTime,
    pub end_date: time::PrimitiveDateTime,
}

#[derive(Deserialize)]
pub struct CreateConference {
    pub name: String,
    pub description: String,
    pub location: String,

    #[serde(with = "datetime_format")]
    pub start_date: PrimitiveDateTime,

    #[serde(with = "datetime_format")]
    pub end_date: PrimitiveDateTime,
}

mod datetime_format {
    use serde::{self, Deserialize, Deserializer};
    use time::{format_description::FormatItem, PrimitiveDateTime};

    const FORMAT: &[FormatItem] =
        &time::macros::format_description!("[year]-[month]-[day] [hour]:[minute]:[second]");
    pub fn deserialize<'de, D>(deserializer: D) -> Result<PrimitiveDateTime, D::Error>
    where
        D: Deserializer<'de>,
    {
        let s = String::deserialize(deserializer)?;
        PrimitiveDateTime::parse(&s, FORMAT).map_err(serde::de::Error::custom)
    }
}
