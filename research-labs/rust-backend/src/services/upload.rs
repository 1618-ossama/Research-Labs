use actix_files::NamedFile;
use actix_web::{get, web, Result};
use std::{env, path::Path};

fn get_upload_dir() -> &'static str {
    match env::var("UPLOAD_DIR") {
        Ok(val) => Box::leak(val.into_boxed_str()),
        Err(_) => "/home/noredine/public/uploads",
    }
}

use actix_web::{http::header::ContentDisposition, http::header::DispositionType};

#[get("/api/uploads/{filename:.*}")]
async fn serve_upload_file(path: web::Path<String>) -> Result<NamedFile> {
    let filename = path.into_inner();
    println!("upload dir: {}", get_upload_dir());
    let safe_path = Path::new(get_upload_dir()).join(&filename);

    let canonical_path = match std::fs::canonicalize(&safe_path) {
        Ok(p) => p,
        Err(_) => return Err(actix_web::error::ErrorNotFound("File not found")),
    };

    if !canonical_path.starts_with(get_upload_dir()) {
        return Err(actix_web::error::ErrorForbidden("Access denied"));
    }

    let mut file = NamedFile::open(canonical_path)?;
    file = file.set_content_disposition(ContentDisposition {
        disposition: DispositionType::Inline,
        parameters: vec![],
    });

    Ok(file)
}
