use actix_multipart::Multipart;
use actix_web::{HttpRequest, HttpResponse};
use futures::{StreamExt, TryStreamExt};
use serde_json::json;
use std::env;
use std::io::Write;
use std::{fs::File, path::Path};
use uuid::Uuid;

use actix_web::{web, Error};

fn get_upload_dir() -> &'static str {
    match env::var("UPLOAD_DIR") {
        Ok(val) => Box::leak(val.into_boxed_str()),
        Err(_) => "/home/noredine/public/uploads",
    }
}

use crate::models::PublicationFileInput;
use crate::repositories::postgres_db::PostgresDatabase;

pub async fn upload_file(mut payload: Multipart) -> Result<HttpResponse, Error> {
    let allowed_extensions = ["png", "jpg", "jpeg", "pdf", "txt"];
    while let Some(mut field) = payload.try_next().await? {
        let content_disposition = field.content_disposition();
        // Get filename or generate one
        let filename = if let Some(cd) = content_disposition {
            if let Some(name) = cd.get_filename() {
                sanitize_filename::sanitize(name)
            } else {
                format!("{}.bin", Uuid::new_v4())
            }
        } else {
            format!("{}.bin", Uuid::new_v4())
        };
        println!("fn: {filename}");

        // Extract file extension and validate
        let extension = Path::new(&filename)
            .extension()
            .and_then(|ext| ext.to_str())
            .map(|ext| ext.to_lowercase());

        println!("ext: {extension:?}");
        match extension {
            Some(ext) if allowed_extensions.contains(&ext.as_str()) => {} // OK
            _ => {
                return Ok(HttpResponse::BadRequest().body("File type not allowed"));
            }
        }

        // Store the file
        let filepath = format!("{}/{}", get_upload_dir(), filename);
        println!("fp0000: {}", filepath);
        let mut f = File::create(&filepath)?;
        while let Some(chunk) = field.next().await {
            let data = chunk?;
            f.write_all(&data)?;
        }

        println!("fp: {filepath}");
        return Ok(HttpResponse::Ok().json(json!({ "filePath": filepath })));
    }

    Ok(HttpResponse::BadRequest().body("No file found"))
}

/// Add file to a publication
pub async fn add_file(
    db: web::Data<PostgresDatabase>,
    file: web::Json<PublicationFileInput>,
    req: HttpRequest,
) -> HttpResponse {
    println!("Incoming request: {:?}", req);
    println!("Cookies: {:?}", req.cookies());

    let user_id = match req.cookie("userId") {
        Some(cookie) => match Uuid::parse_str(cookie.value()) {
            Ok(uid) => {
                println!("Parsed userId from cookie: {}", uid);
                uid
            }
            Err(e) => {
                println!(
                    "Invalid userId cookie value: {}, error: {:?}",
                    cookie.value(),
                    e
                );
                return HttpResponse::Unauthorized().body("Invalid userId cookie");
            }
        },
        None => {
            println!("Missing userId cookie");
            return HttpResponse::Unauthorized().body("Missing userId cookie");
        }
    };

    let publication = match db.get_publication(file.publication_id).await {
        Ok(pub_) => {
            println!("Found publication with submitter_id: {}", pub_.submitter_id);
            pub_
        }
        Err(e) => {
            println!("Error fetching publication: {:?}", e);
            return HttpResponse::InternalServerError().finish();
        }
    };

    if publication.submitter_id != user_id {
        println!("User ID does not match publication submitter");
        return HttpResponse::Unauthorized().body("You do not own this publication");
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
        Ok(_) => {
            println!("File added successfully");
            HttpResponse::Created().finish()
        }
        Err(e) => {
            println!("Error adding file: {:?}", e);
            HttpResponse::InternalServerError().finish()
        }
    }
}

/// Get files for a publication
pub async fn get_files_by_publication(
    db: web::Data<PostgresDatabase>,
    id: web::Path<Uuid>,
) -> HttpResponse {
    match db.get_files_by_publication(id.into_inner()).await {
        Ok(files) => HttpResponse::Ok().json(files),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}
