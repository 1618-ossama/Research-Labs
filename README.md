# 🧪 Research Lab Management Web App

A full-stack web application for managing research publications, groups, and user collaboration within a laboratory environment. Built with **Rust (SQLx)** and **Node.js** on the backend, and **Next.js** on the frontend.

---

## 🚀 Features

### ✅ User Management
- Register and manage user accounts
- Roles: `admin`, `researcher`, `leader`
- Secure password storage using hashes
- Email format validation

### 📚 Publications
- Submit, update, and track publication status (`DRAFT`, `WAITING`, `APPROVED`)
- Upload and manage associated files
- Link publications to submitting researchers

### 👥 Group Collaboration
- Create and manage research groups
- Assign leaders to groups
- Add users to groups
- Group status: `OPENED`, `CLOSED`, `DELETED`

### 🗃️ Database Schema (PostgreSQL)
- Well-structured tables for users, publications, publication files, and groups
- Foreign key relationships to enforce data integrity

---

## 🛠️ Tech Stack

### Backend
- **Rust**: Safe and performant web backend
- **SQLx**: Async PostgreSQL driver with compile-time SQL checking
- **Actix-Web**: Fast and powerful web framework
- **Node.js**: Optional support for additional backend microservices

### Frontend
- **Next.js**: React-based framework for SSR and SPA capabilities

### Database
- **PostgreSQL**: Reliable and scalable relational database

## Setup & Installation

### Prerequisites
- Rust toolchain
- docker compose
- Node.js .
- NPM .
- PostgreSQL 

### Steps





## Diagrams 

User Registration Diagram :
```mermaid
sequenceDiagram
    participant R as Researcher
    participant S as Server
    participant DB as Database

    R->>S: Submit Publication (title, journal)
    S->>DB: INSERT INTO publications
    DB-->>S: OK
    S-->>R: Publication created

    R->>S: Upload File (file_path, file_type)
    S->>DB: INSERT INTO publication_files
    DB-->>S: OK
    S-->>R: File added

    R->>S: Create Group (title, desc)
    S->>DB: INSERT INTO groups
    DB-->>S: OK
    S-->>R: Group created

    R->>S: Join Group
    S->>DB: INSERT INTO group_user
    DB-->>S: OK
    S-->>R: Joined group

```
## Class Diagram :
```mermaid
classDiagram
    class User {
        UUID id
        String username
        String email
        String password_hash
        String role (admin | researcher | leader)
        Timestamp created_at
        Timestamp updated_at
    }

    class Publication {
        UUID id
        String title
        Text journal
        String status (DRAFT | APPROVED | WAITING)
        UUID submitter_id
        Timestamp submitted_at
    }

    class PublicationFile {
        UUID id
        String file_type
        String file_path
        UUID publication_id
    }

    class Group {
        UUID id
        String title
        String description
        String status (OPENED | CLOSED | DELETED)
        Timestamp created_at
        UUID leader_id
    }

    class GroupUser {
        UUID leader_id
        UUID group_id
    }

    User "1" --> "0..*" Publication : submits
    Publication "1" --> "0..*" PublicationFile : has files
    User "1" --> "0..*" Group : leads
    Group "1" --> "0..*" GroupUser : has members
    User "1" --> "0..*" GroupUser : joins
```

## Sequence diagram
```mermaid
sequenceDiagram
    participant Researcher
    participant Application
    participant Database

    Researcher->>Application: Initiate Publication Submission
    Application->>Application: Validate User Authentication/Authorization
    Application->>Database: Query users table (Check submitter_id exists)
    Database-->>Application: User validation result

    alt User Validated
        Application->>Database: Insert new record into publications table
        Database-->>Application: New publication ID

        Researcher->>Application: Upload Publication Files (e.g., PDF, LaTeX)
        loop For each file
            Application->>Application: Process File Upload
            Application->>Database: Insert new record into publication_files table (linking to publication ID)
            Database-->>Application: File record confirmation
        end

        Application->>Researcher: Confirmation of Publication Submission
    else User Invalid
        Application->>Researcher: Error: User not authorized or found
    end

```
## License

This project is licensed under the MIT License.
