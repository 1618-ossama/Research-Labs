use serde::Serialize;
use sqlx::types::Uuid;

#[derive(Debug, Serialize)]
pub struct Metrics {
    pub total_users: i64,

    // Users grouped by role and status, with counts
    pub users_by_role_status: Vec<(String, String, i64)>, // (role, status, count)

    pub new_users_7d: i64,
    pub new_users_30d: i64,

    pub total_publications: i64,

    // Publications grouped by status and visibility
    pub publications_by_status_visibility: Vec<(String, String, i64)>, // (status, visibility, count)

    pub new_publications_7d: i64,
    pub new_publications_30d: i64,

    pub total_conferences: i64,
    pub upcoming_conferences_30d: i64,

    // Publications count per conference (UUID + name + count)
    pub publications_per_conference: Vec<(Uuid, String, i64)>,

    // Top users by publications (UUID + username + count)
    pub top_users_by_publications: Vec<(Uuid, String, i64)>,
}
