use crate::errors;

use crate::models::publication::Publication;
use errors::Result;

pub trait Database {
    async fn add_publication(
        &self,
        title: String,
        journal: String,
        status: String,
        submitter_id: i32,
    ) -> Result<()>;
    async fn get_publication(&self, publication_id: u32) -> Result<Vec<Publication>>;
    async fn get_publications_by_user(&self, user_id: u32) -> Result<Vec<Publication>>;
    // PUBLICATION FILES
    async fn add_file(
        &self,
        id: Uuid,
        file_type: String,
        file_path: String,
        publication_id: i32,
    ) -> Result<()>;

    async fn get_files_by_publication(&self, publication_id: i32) -> Result<Vec<PublicationFile>>;

    // GROUPS
    async fn add_group(
        &self,
        id: Uuid,
        title: String,
        description: String,
        status: String,
        leader_id: i32,
    ) -> Result<()>;
    async fn get_group(&self, group_id: Uuid) -> Result<Group>;
    async fn add_user_to_group(&self, leader_id: i32, group_id: Uuid) -> Result<()>;
}
