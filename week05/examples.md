# Example Requests & Responses

All JSON responses use UTF-8 and ISO 8601 timestamps.

## 1) POST /tasks (Create)
Status: 201 Created

Request:
{
  "title": "Finish Week 5 API design",
  "listId": "list_123",
  "dueDate": "2026-02-10",
  "priority": "medium"
}

Response (201 Created):
{
  "id": "task_789",
  "title": "Finish Week 5 API design",
  "completed": false,
  "listId": "list_123",
  "ownerUserId": "user_001",
  "dueDate": "2026-02-10",
  "priority": "medium",
  "createdAt": "2026-02-02T22:10:00.000Z",
  "updatedAt": "2026-02-02T22:10:00.000Z"
}

## 2) GET /tasks/{taskId}
Status: 200 OK

Request:
GET /tasks/task_789

Response (200 OK):
{
  "id": "task_789",
  "title": "Finish Week 5 API design",
  "completed": false,
  "listId": "list_123",
  "ownerUserId": "user_001",
  "dueDate": "2026-02-10",
  "priority": "medium",
  "createdAt": "2026-02-02T22:10:00.000Z",
  "updatedAt": "2026-02-02T22:10:00.000Z"
}

## 3) PATCH /tasks/{taskId}
Status: 200 OK

Request:
{
  "completed": true
}

Response (200 OK):
{
  "id": "task_789",
  "title": "Finish Week 5 API design",
  "completed": true,
  "listId": "list_123",
  "ownerUserId": "user_001",
  "dueDate": "2026-02-10",
  "priority": "medium",
  "createdAt": "2026-02-02T22:10:00.000Z",
  "updatedAt": "2026-02-02T22:12:30.000Z"
}