# Pagination & Filtering

Endpoint that supports pagination:
GET /tasks

Pagination method:
page/limit

Example query parameters:
- /tasks?page=1&limit=10
- /tasks?page=2&limit=10

Filtering examples:
- /tasks?completed=true
- /tasks?listId=list_123
- /tasks?priority=high
