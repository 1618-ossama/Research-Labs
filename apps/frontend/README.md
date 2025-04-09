# Research Lab Management Web App

A comprehensive web application designed for managing research labs at universities. It facilitates interactions between **Professors**, **Doctorants (PhD Students)**, and **Admins**, and includes features such as supervision, collaboration, file sharing, notifications, activity tracking, and more.

## Features

- **User Roles & Permissions**
  - **Admin**: Manages user registrations, roles, and permissions.
  - **Professor**: Supervises Doctorants and manages research activities , Upload researchs and conferences.
  - **Doctorant**: Participates in research, uploads papers, and communicates with Professors.
  - **External Professor**: External supervisor with limited permissions.

- **Communication & Collaboration**
  - **Chat**: Real-time messaging between users.
  - **Group Chats**: Create and participate in group discussions.
  - **Follow Research Topics**: Follow specific research areas or tags.

- **Research Management**
  - **Upload Research**: Upload research papers, conference submissions, and presentations.
  - **Version Control**: Track changes to uploaded research.
  - **Metadata**: Add metadata (title, authors, abstract) to research documents.

- **Activity Tracking**
  - **Activity Log**: Track all user activities and system events.
  - **Audit Logs**: Admins can access logs of critical system actions.

- **Notifications & Alerts**
  - **User Notifications**: Professors are notified of new Doctorants in their department. Users receive updates about follows, uploads, and messages.

- **Security**
  - **Multi-Factor Authentication (MFA)**: Secure login with support for JWT and biometric login.
  - **Role-Based Access Control (RBAC)**: Fine-grained permissions to control data access.

## Technologies Used

- **Frontend**: Next.js
- **Backend**: Node.js 
- **Database**: PostgreSQL 
- **Authentication**: JWT tokens + Biometric Login
- **Version Control**: Git, GitHub

## Setup & Installation

### Prerequisites

- Node.js .
- NPM .
- PostgreSQL 

### Steps

1. **Clone the repository**:

    ```bash
    git clone https://github.com/yourusername/research-lab-management.git
    cd research-lab-management
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Set up the database**:
   - Build the container running PostgreSQL.
   
4. **Run the development server**:

    ```bash
    npm run development
    ```

5. **Open the app**:
   - Open `http://localhost:3000` in your web browser.

## License

This project is licensed under the MIT License.

## Diagrams 
```mermaid
```
sequenceDiagram
    actor Admin as A
    actor Professor as P
    actor Doctorant as D
    actor ExternalProfessor as EP
    participant "Research Lab Management System" as S
    participant "Database" as DB
    participant "Notification Service" as NS
    participant "Authentication Service" as Auth
    participant "Activity Log" as AL
    participant "Search Service" as SS
    participant "File Management" as FM

    %% Admin approval flow
    A->>S: Approve Registration (Doctorant, Professor)
    S->>DB: Store User Info
    S->>NS: Notify New Registration

    %% User login flow (MFA + JWT Authentication)
    D->>Auth: Login with MFA
    P->>Auth: Login with MFA
    A->>Auth: Login with MFA
    Auth->>S: Authenticate User
    S->>DB: Check User Credentials

    %% File Upload and Version Control (Doctorant or Professor)
    D->>FM: Upload Research Paper
    P->>FM: Upload Research Paper
    FM->>DB: Store Research File
    FM->>DB: Track Version
    FM->>NS: Notify Research Update

    %% File metadata and version control
    FM->>DB: Add Metadata (title, authors, abstract)
    FM->>DB: Save Metadata

    %% Follow and Notifications
    D->>S: Follow Research Topic
    P->>S: Follow Research Topic
    S->>NS: Notify Follow Activity

    %% Activity Log
    D->>AL: Record Activity (Upload, Follow, Chat)
    P->>AL: Record Activity (Upload, Follow, Chat)
    A->>AL: Record Admin Actions
    AL->>DB: Save Activity Log

    %% Search and Filters for Research
    D->>SS: Search Research Papers
    P->>SS: Search Research Papers
    S->>SS: Fetch Results
    SS->>DB: Search Database for Research

    %% Chatting between Users
    D->>S: Send Message (Chat)
    P->>S: Send Message (Chat)
    S->>DB: Store Chat Message
    S->>NS: Notify Message Received

    %% Group Chat Creation
    P->>S: Create Group Chat
    D->>S: Join Group Chat
    S->>DB: Store Group Chat
    S->>NS: Notify Group Chat Creation

    %% Admin system management and role assignment
    A->>S: Manage Roles and Permissions
    S->>DB: Update User Role
    S->>NS: Notify Role Change
    
    A->>S: Access Audit Logs
    S->>DB: Fetch Audit Logs
    
    %% Role-Based Access Control (RBAC)
    Auth->>S: Check Role Permissions 

```
```
```
