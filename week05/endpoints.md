# Endpoints (REST Contract)

Conventions:
- Resources are plural nouns (no verbs in URLs).
- GET is safe (no state changes).
- PUT replaces full resource, PATCH updates partial fields.
- Status codes follow HTTP semantics.

## Users
### GET /users
Purpose: List users (admin/testing).
Returns: 200 OK

### GET /users/{userId}
Purpose: Get a single user by id.
Returns: 200 OK, 404 Not Found

## Lists
### GET /lists
Purpose: List lists for the current user.
Returns: 200 OK

### GET /lists/{listId}
Purpose: Get a single list.
Returns: 200 OK, 404 Not Found

### POST /lists
Purpose: Create a list.
Returns: 201 Created

### PUT /lists/{listId}
Purpose: Replace list (full update, idempotent).
Returns: 200 OK, 404 Not Found, 400 Bad Request

### DELETE /lists/{listId}
Purpose: Delete list (idempotent).
Returns: 204 No Content, 404 Not Found

## Tasks
### GET /tasks
Purpose: List tasks for current user (supports filtering + pagination).
Returns: 200 OK

### GET /tasks/{taskId}
Purpose: Get a single task.
Returns: 200 OK, 404 Not Found

### POST /tasks
Purpose: Create a task.
Returns: 201 Created

### PATCH /tasks/{taskId}
Purpose: Partial update (ex: completed, title, dueDate, priority).
Returns: 200 OK, 404 Not Found, 400 Bad Request, 409 Conflict (rare)

### DELETE /tasks/{taskId}
Purpose: Delete task (idempotent).
Returns: 204 No Content, 404 Not Found

## Subresources (relationships)
### GET /users/{userId}/tasks
Purpose: List tasks owned by a user (ownership relationship).
Returns: 200 OK, 404 Not Found

### GET /lists/{listId}/tasks
Purpose: List tasks in a list.
Returns: 200 OK, 404 Not Found
