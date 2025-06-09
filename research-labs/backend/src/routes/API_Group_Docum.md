# API Documentation for Group Management

## Base URL
`/api/groups`

## Authentication
All endpoints require authentication. Include the JWT token in the `Authorization` header and credentials.

---

## Endpoints

### 1. Get All Groups
**URL:** `/`  
**Method:** `GET`  
**Description:** Get all active groups (non-deleted). For non-admin users, only returns groups they're members of.  

#### Response:
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "id": "uuid",
      "title": "Group Title",
      "description": "Group Description",
      "status": "ONGOINING",
      "created_at": "ISO date",
      "updated_at": "ISO date",
      "leader_id": "uuid",
      "leader": {
        "id": "uuid",
        "username": "leader_username",
        "first_name": "Leader",
        "last_name": "User"
      },
      "members": [
        {
          "id": "uuid",
          "username": "member_username",
          "first_name": "Member",
          "last_name": "User",
          "photo_url": "url/to/photo"
        }
      ]
    }
  ]
}
```

### 2. Get User's Groups
**URL:** `/my-groups`  
**Method:** `GET`  
**Description:** Get all groups the authenticated user belongs to.  
**Response:** Same structure as "Get All Groups"

### 3. Create Group
**URL:** `/`  
**Method:** `POST`  
**Description:** Create a new group with the authenticated user as leader.  

#### Request Body:
```json
{
  "title": "Group Title",
  "description": "Group description (10-500 chars)"
}
```
**Validation:**  
- Title: 3-100 characters  
- Description: 10-500 characters

#### Response:
```json
{
  "success": true,
  "message": "Group created successfully",
  "data": { "groupId": "uuid" }
}
```

### 4. Get Group by ID
**URL:** `/:id`  
**Method:** `GET`  
**Description:** Get details of a specific group. Only accessible to group members or admins.  

#### Response:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Group Title",
    "description": "Group Description",
    "status": "ONGOINING",
    "created_at": "ISO date",
    "updated_at": "ISO date",
    "leader_id": "uuid",
    "leader": {
      "id": "uuid",
      "username": "leader_username",
      "first_name": "Leader",
      "last_name": "User",
      "email": "leader@example.com"
    },
    "members": [
      {
        "id": "uuid",
        "username": "member_username",
        "first_name": "Member",
        "last_name": "User",
        "email": "member@example.com",
        "role": "RESEARCHER",
        "photo_url": "url/to/photo",
        "joined_at": "ISO date"
      }
    ]
  }
}
```

### 5. Update Group
**URL:** `/:id`  
**Method:** `PUT`  
**Description:** Update group details. Only accessible to group leader or admin.  

#### Request Body:
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "status": "ONGOINING"
}
```

#### Response:
```json
{
  "success": true,
  "message": "Group updated successfully",
  "data": { "groupId": "uuid" }
}
```

### 6. Delete Group
**URL:** `/:id`  
**Method:** `DELETE`  
**Description:** Soft delete a group (sets status to DELETED). Only accessible to group leader or admin.  

#### Response:
```json
{
  "success": true,
  "message": "Group deleted successfully"
}
```

### 7. Get Group Members
**URL:** `/:id/members`  
**Method:** `GET`  
**Description:** Get all members of a group. Only accessible to group members or admins.  

#### Response:
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": "uuid",
      "username": "member_username",
      "first_name": "Member",
      "last_name": "User",
      "email": "member@example.com",
      "role": "RESEARCHER",
      "photo_url": "url/to/photo",
      "affiliation": "University",
      "joined_at": "ISO date"
    }
  ]
}
```

### 8. Add Member to Group
**URL:** `/:id/members`  
**Method:** `POST`  
**Description:** Add a user to the group. Only accessible to group leader or admin.  

#### Request Body:
```json
{
  "userId": "uuid-of-user-to-add"
}
```

#### Response:
```json
{
  "success": true,
  "message": "Member added to group successfully"
}
```

### 9. Remove Member from Group
**URL:** `/:id/members/:userId`  
**Method:** `DELETE`  
**Description:** Remove a user from the group. Accessible to group leader, admin, or the user themselves.  

#### Response:
```json
{
  "success": true,
  "message": "Member removed from group successfully"
}
```

### 10. Join Group
**URL:** `/:id/join`  
**Method:** `POST`  
**Description:** Authenticated user joins a group (must be ONGOINING status).  

#### Response:
```json
{
  "success": true,
  "message": "Successfully joined the group"
}
```

### 11. Leave Group
**URL:** `/:id/leave`  
**Method:** `POST`  
**Description:** Authenticated user leaves a group (can't leave if they're the leader).  

#### Response:
```json
{
  "success": true,
  "message": "Successfully left the group"
}
```

### 12. Admin - Get All Groups
**URL:** `/admin/all`  
**Method:** `GET`  
**Description:** Get all groups including deleted ones (admin only).  
**Response:** Same structure as "Get All Groups"

---

## Error Responses
Common error responses include:  

- **401 Unauthorized:** Invalid or missing authentication  
- **403 Forbidden:** Insufficient permissions  
- **404 Not Found:** Resource not found  
- **400 Bad Request:** Validation errors  

#### Example:
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "path": "title",
      "message": "Group title must be at least 3 characters"
    }
  ]
}
```

---

## TypeScript Interfaces
```ts
interface Group {
  id: string;
  title: string;
  description: string;
  status: 'ONGOINING' | 'SUSPENDED' | 'FINISHED' | 'DELETED';
  created_at: string;
  updated_at: string;
  leader_id: string;
  leader: {
    id: string;
    username: string;
    first_name?: string;
    last_name?: string;
    email?: string;
  };
  members: GroupMember[];
}

interface GroupMember {
  id: string;
  username: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  role?: 'ADMIN' | 'RESEARCHER' | 'LEADER' | 'GUEST';
  photo_url?: string;
  affiliation?: string;
  joined_at: string;
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  count?: number;
  data: T;
  errors?: Array<{
    path: string;
    message: string;
    code?: string;
  }>;
}
```

