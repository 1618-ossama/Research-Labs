use actix_web::web;

use crate::handler::publication_handler::get_publications;

pub fn publication_route_config(cfg: &mut web::ServiceConfig) {
    cfg.service(web::scope("/api").route("/publications", web::get().to(get_publications)));
}
