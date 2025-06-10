use actix_multipart::Multipart;
use actix_web::{web, Error, HttpRequest, HttpResponse};
use futures::{StreamExt, TryStreamExt};
use serde_json::json;
use std::{
    env,
    fs::File,
    io::Write,
    path::{Path, PathBuf},
};
use uuid::Uuid;

use crate::models::publication::PublicationFileInput;

use super::publication_handler::AppState;

fn get_upload_dir() -> &'static str {
    match env::var("UPLOAD_DIR") {
        Ok(val) => Box::leak(val.into_boxed_str()),
        Err(_) => "/home/noredine/public/uploads",
    }
}

pub async fn upload_file(mut payload: Multipart) -> Result<HttpResponse, Error> {
    let allowed_extensions = ["png", "jpg", "jpeg", "pdf", "txt"];

    while let Some(mut field) = payload.try_next().await? {
        let content_disposition = field.content_disposition();
        let filename = content_disposition
            .and_then(|cd| cd.get_filename().map(sanitize_filename::sanitize))
            .unwrap_or_else(|| format!("{}.bin", Uuid::new_v4()));

        let extension = Path::new(&filename)
            .extension()
            .and_then(|ext| ext.to_str())
            .map(|ext| ext.to_lowercase());

        match extension {
            Some(ext) if allowed_extensions.contains(&ext.as_str()) => {}
            _ => return Ok(HttpResponse::BadRequest().body("File type not allowed")),
        }

        let filepath = PathBuf::from(get_upload_dir()).join(&filename);
        let mut file = File::create(&filepath)?;

        while let Some(chunk) = field.next().await {
            let data = chunk?;
            file.write_all(&data)?;
        }

        return Ok(HttpResponse::Ok().json(json!({
            "filePath": filepath
        })));
    }

    Ok(HttpResponse::BadRequest().body("No file found"))
}

pub async fn add_file(
    state: web::Data<AppState>,
    file: web::Json<PublicationFileInput>,
    req: HttpRequest,
) -> HttpResponse {
    let user_id = match req.cookie("userId") {
        Some(cookie) => match Uuid::parse_str(cookie.value()) {
            Ok(uid) => uid,
            Err(_) => return HttpResponse::Unauthorized().body("Invalid userId cookie"),
        },
        None => return HttpResponse::Unauthorized().body("Missing userId cookie"),
    };

    let publication = match state.db_pool.get_publication(file.publication_id).await {
        Ok(p) => p,
        Err(_) => return HttpResponse::InternalServerError().finish(),
    };

    // if let Some(_submitter_id) = publication.submitter_id {
    //     // if submitter_id != user_id {
    //     //     return HttpResponse::Unauthorized().body("You do not own this publication");
    //     // }
    // }

    match state
        .db_pool
        .add_file(
            file.id,
            file.file_type.clone(),
            file.file_path.clone(),
            file.publication_id,
        )
        .await
    {
        Ok(_) => HttpResponse::Created().finish(),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

pub async fn get_files_by_publication(
    state: web::Data<AppState>,
    id: web::Path<Uuid>,
) -> HttpResponse {
    match state
        .db_pool
        .get_files_by_publication(id.into_inner())
        .await
    {
        Ok(files) => HttpResponse::Ok().json(files),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}
