use actix_web::web;

use crate::handler::publication_handler::*;

pub fn route_config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/api")
            // Publications
            .route("/publications", web::post().to(add_publication))
            .route("/publications", web::get().to(get_publications))
            .route("/publications/{id}", web::get().to(get_publication))
            .route(
                "/publications/user/{id}",
                web::get().to(get_publications_by_user),
            )
            // Publication files
            .route("/publication-files", web::post().to(add_file))
            .route(
                "/publication-files/{id}",
                web::get().to(get_files_by_publication),
            )
            // Groups
            .route("/groups", web::post().to(add_group))
            .route("/groups/{id}", web::get().to(get_group))
            .route("/groups/user/{id}", web::get().to(get_groups_by_user_id))
            // Group-User
            .route("/groups/add-user", web::post().to(add_user_to_group)),
    );
}
