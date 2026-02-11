# Resources

## Resource: users
- Endpoint: /users/{userId}
- Relationship: /users/{userId}/tasks

## Resource: lists
- Endpoint: /lists/{listId}
- Relationship: /lists/{listId}/tasks

## Resource: tasks
- Endpoint: /tasks/{taskId}
- Relationship: /lists/{listId}/tasks and /users/{userId}/tasks
