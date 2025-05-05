use crate::errors;

use crate::models::publication::{Group, Publication, PublicationFile};
use errors::Result;
use uuid::Uuid;

pub trait Database {
    async fn add_publication(
        &self,
        title: String,
        journal: String,
        status: String,
        submitter_id: Uuid,
    ) -> Result<()>;

    async fn delete_publication(&self, publication_id: Uuid) -> Result<()>;
    async fn get_publication(&self, publication_id: Uuid) -> Result<Publication>;
    async fn get_publications(&self) -> Result<Vec<Publication>>;
    // PUBLICATION FILES
    async fn get_publications_by_user(&self, user_id: Uuid) -> Result<Vec<Publication>>;
    async fn add_file(
        &self,
        id: Uuid,
        file_type: String,
        file_path: String,
        publication_id: Uuid,
    ) -> Result<()>;

    async fn get_files_by_publication(&self, publication_id: Uuid) -> Result<Vec<PublicationFile>>;

    // GROUPS
    async fn add_group(
        &self,
        id: Uuid,
        title: String,
        description: String,
        status: String,
        leader_id: Uuid,
    ) -> Result<()>;

    async fn get_groups_by_user_id(&self, user_id: Uuid) -> Result<Vec<Group>>;
    async fn get_group(&self, group_id: Uuid) -> Result<Group>;
    async fn add_user_to_group(&self, leader_id: Uuid, group_id: Uuid) -> Result<()>;
}
