# Error Handling

## Standard error format
{
  "error": {
    "code": "STRING_CODE",
    "message": "Human readable message",
    "details": [
      {
        "field": "fieldName",
        "issue": "what went wrong"
      }
    ]
  }
}

## Error cases

400 Bad Request (invalid input)
Example: POST /tasks missing title
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": [
      { "field": "title", "issue": "required" }
    ]
  }
}

404 Not Found
Example: GET /tasks/task_does_not_exist
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Task not found",
    "details": [
      { "field": "id", "issue": "task_does_not_exist" }
    ]
  }
}

409 Conflict
Example: POST /lists with duplicate name for the same user
{
  "error": {
    "code": "CONFLICT",
    "message": "List name already exists",
    "details": [
      { "field": "name", "issue": "duplicate" }
    ]
  }
}