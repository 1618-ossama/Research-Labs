use actix_web::web;

use crate::handler::publication_handler::{get_publications, get_publications_by_user};

pub fn route_config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/api")
            .route(
                "/publications/{id}",
                web::get().to(get_publications_by_user),
            )
            .route("/publications", web::get().to(get_publications)),
    );
}
