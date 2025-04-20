use crate::errors;

use crate::models::publication::Publication;
use errors::Result;

pub trait Database {
    async fn add_publication(
        &self,
        title: String,
        journal: String,
        status: String,
        submitter_id: u32,
    ) -> Result<()>;
    async fn get_publication(&self, publication_id: u32) -> Result<Vec<Publication>>;
    async fn get_publications_by_user(&self, user_id: u32) -> Result<Vec<Publication>>;
}
