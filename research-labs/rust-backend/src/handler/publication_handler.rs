use crate::{
    models::*,
    repositories::{database::Database, postgres_db::PostgresDatabase},
};
use actix_multipart::Multipart;
use actix_web::HttpRequest;
use actix_web::{web, Error, HttpResponse};
use uuid::Uuid;

/// Add a publication
pub async fn add_publication(
    db: web::Data<PostgresDatabase>,
    form: web::Json<PublicationInput>,
) -> HttpResponse {
    match db
        .add_publication(
            form.title.clone(),
            form.journal.clone(),
            form.status.clone(),
            form.submitter_id,
        )
        .await
    {
        Ok(_) => HttpResponse::Created().finish(),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

/// Delete a publication by ID
pub async fn delete_publication(
    db: web::Data<PostgresDatabase>,
    id: web::Path<Uuid>,
) -> HttpResponse {
    println!("Delete request for publication with the id: {}", id.clone());
    match db.delete_publication(id.into_inner()).await {
        Ok(publi) => HttpResponse::Ok().json(publi),
        Err(_) => HttpResponse::NotFound().finish(),
    }
}

/// Delete a publication by ID
// pub async fn update_status_publication(
//     db: web::Data<PostgresDatabase>,
//     id: web::Path<Uuid>,
//     status: web::Path<String>,
// ) -> HttpResponse {
//     println!("Update status for {} to {}", id.clone(), status);
//     match db.update_publication(id.into_inner()).await {
//         Ok(publi) => HttpResponse::Ok().json(publi),
//         Err(_) => HttpResponse::NotFound().finish(),
//     }
// }
//
pub async fn get_publication(db: web::Data<PostgresDatabase>, id: web::Path<Uuid>) -> HttpResponse {
    match db.get_publication(id.into_inner()).await {
        Ok(publi) => HttpResponse::Ok().json(publi),
        Err(_) => HttpResponse::NotFound().finish(),
    }
}

/// Get all publications
pub async fn get_publications(db: web::Data<PostgresDatabase>) -> HttpResponse {
    match db.get_publications().await {
        Ok(publications) => HttpResponse::Ok().json(publications),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

/// Get publications by user
pub async fn get_publications_by_user(
    db: web::Data<PostgresDatabase>,
    user_id: web::Path<Uuid>,
) -> HttpResponse {
    match db.get_publications_by_user(user_id.into_inner()).await {
        Ok(publications) => HttpResponse::Ok().json(publications),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

use futures::StreamExt;
use serde_json::json; // For .next() on the Multipart stream
pub async fn upload_file(mut payload: Multipart) -> Result<HttpResponse, Error> {
    while let Some(field) = payload.next().await {
        let mut field = field?;
        while let Some(chunk) = field.next().await {
            let _ = chunk?;
        }
    }
    let dummy_filename = format!("{}.txt", Uuid::new_v4());
    let dummy_file_path = format!("/public/uploads/{}", dummy_filename);

    Ok(HttpResponse::Ok().json(json!({ "filePath": dummy_file_path })))
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

pub async fn get_groups_by_user_id(
    db: web::Data<PostgresDatabase>,
    user_id: web::Path<Uuid>,
) -> HttpResponse {
    match db.get_groups_by_user_id(user_id.into_inner()).await {
        Ok(groups) => HttpResponse::Ok().json(groups),
        Err(_) => HttpResponse::InternalServerError().finish(),
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

/// Add a group
pub async fn add_group(
    db: web::Data<PostgresDatabase>,
    group: web::Json<GroupInput>,
) -> HttpResponse {
    match db
        .add_group(
            group.id,
            group.title.clone(),
            group.description.clone(),
            group.status.clone(),
            group.leader_id,
        )
        .await
    {
        Ok(_) => HttpResponse::Created().finish(),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

/// Get a group by ID
pub async fn get_group(db: web::Data<PostgresDatabase>, id: web::Path<Uuid>) -> HttpResponse {
    match db.get_group(id.into_inner()).await {
        Ok(group) => HttpResponse::Ok().json(group),
        Err(_) => HttpResponse::NotFound().finish(),
    }
}

/// Add user to group
pub async fn add_user_to_group(
    db: web::Data<PostgresDatabase>,
    body: web::Json<AddUserToGroupInput>,
) -> HttpResponse {
    match db.add_user_to_group(body.leader_id, body.group_id).await {
        Ok(_) => HttpResponse::Created().finish(),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}
