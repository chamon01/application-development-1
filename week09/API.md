# API Documentation

Base URL: http://localhost:3000  
Content-Type: application/json

Error format:
{
  "error": { "code": "ERROR_CODE", "message": "Message" }
}

API key rule:
- GET routes: no key required
- POST/PATCH/DELETE: require header x-api-key: 12345

---

## Tasks

### GET /tasks
Query (optional): page, limit

200 OK
{
  "data": [],
  "meta": { "page": 1, "limit": 10, "total": 0 }
}

### GET /tasks/:id
200 OK
{ "data": { "id": 1, "title": "Example", "listId": "1" } }

404 NOT_FOUND
{ "error": { "code": "NOT_FOUND", "message": "Task not found" } }

### POST /tasks
Headers: x-api-key: 12345

Body:
{
  "title": "string",
  "listId": "string"
}

201 Created
{ "data": { "id": 1, "title": "Test task", "listId": "1" } }

400 VALIDATION_ERROR
401 UNAUTHORIZED

### PATCH /tasks/:id
Headers: x-api-key: 12345

Body (partial allowed):
{
  "title": "string",
  "completed": true
}

200 OK
{ "data": { "id": 1, "title": "Updated", "completed": true } }

400 VALIDATION_ERROR
401 UNAUTHORIZED
404 NOT_FOUND

### DELETE /tasks/:id
Headers: x-api-key: 12345

200 OK
{ "data": { "deleted": true } }

401 UNAUTHORIZED
404 NOT_FOUND

---

## Lists

### GET /lists
200 OK
{ "data": [] }

### GET /lists/:id
200 OK
{ "data": { "id": 1, "name": "Groceries" } }

404 NOT_FOUND
{ "error": { "code": "NOT_FOUND", "message": "List not found" } }

### POST /lists
Headers: x-api-key: 12345

Body:
{ "name": "Groceries" }

201 Created
{ "data": { "id": 1, "name": "Groceries" } }

400 VALIDATION_ERROR
401 UNAUTHORIZED
409 CONFLICT

### PATCH /lists/:id
Headers: x-api-key: 12345

Body:
{ "name": "New Name" }

200 OK
{ "data": { "id": 1, "name": "New Name" } }

400 VALIDATION_ERROR
401 UNAUTHORIZED
404 NOT_FOUND
409 CONFLICT

### DELETE /lists/:id
Headers: x-api-key: 12345

200 OK
{ "data": { "deleted": true } }

401 UNAUTHORIZED
404 NOT_FOUND