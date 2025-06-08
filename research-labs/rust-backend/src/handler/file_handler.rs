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
use crate::repositories::postgres_db::PostgresDatabase;

use super::publication_handler::AppState;

/// Returns the directory where uploaded files should be stored.
fn get_upload_dir() -> &'static str {
    match env::var("UPLOAD_DIR") {
        Ok(val) => Box::leak(val.into_boxed_str()),
        Err(_) => "/home/noredine/public/uploads",
    }
}

/// Handles multipart file upload.
///
/// # Errors
/// - Returns `BadRequest` if the file type is disallowed.
/// - Returns `InternalServerError` if file I/O fails.
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

/// Adds a file reference to a publication.
///
/// # Errors
/// - Returns `Unauthorized` if the user is not authenticated or not the owner.
/// - Returns `InternalServerError` if a database operation fails.
pub async fn add_file(
    db: web::Data<PostgresDatabase>,
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

    let publication = match db.get_publication(file.publication_id).await {
        Ok(p) => p,
        Err(_) => return HttpResponse::InternalServerError().finish(),
    };

    if let Some(submitter_id) = publication.submitter_id {
        if submitter_id != user_id {
            return HttpResponse::Unauthorized().body("You do not own this publication");
        }
    }

    match db
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

/// Retrieves files associated with a publication.
///
/// # Errors
/// - Returns `InternalServerError` if a database query fails.
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
