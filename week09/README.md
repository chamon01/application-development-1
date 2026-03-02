# Week 09 - Express Tasks & Lists API

## Project Overview
This project is a simple Express REST API with two resources:
- Tasks
- Lists

It demonstrates middleware order, validation, API key authorization, and consistent JSON error responses.

Target users:
- Students learning Express / backend APIs

Core resources:
- /tasks
- /lists

---

## Setup Instructions

### Requirements
- Node.js 18+ recommended
- npm

### Install
npm install

### Start the server
npm start

Server runs at:
http://localhost:3000

Environment variables:
None

---

## API Overview

| Method | Endpoint        | Description |
|------:|------------------|-------------|
| GET   | /tasks           | List tasks (pagination supported) |
| GET   | /tasks/:id       | Get one task |
| POST  | /tasks           | Create task (requires x-api-key) |
| PATCH | /tasks/:id       | Update task (requires x-api-key) |
| DELETE| /tasks/:id       | Delete task (requires x-api-key) |
| GET   | /lists           | List lists |
| GET   | /lists/:id       | Get one list |
| POST  | /lists           | Create list (requires x-api-key) |
| PATCH | /lists/:id       | Update list (requires x-api-key) |
| DELETE| /lists/:id       | Delete list (requires x-api-key) |

---

## Example Requests

### Successful POST (201)
POST http://localhost:3000/tasks  
Headers:
- Content-Type: application/json
- x-api-key: 12345

Body:
{
  "title": "Test task",
  "listId": "1"
}

### Validation Error (400)
POST http://localhost:3000/tasks  
Headers:
- Content-Type: application/json
- x-api-key: 12345

Body:
{
  "listId": "1"
}

### Unauthorized (401)
POST http://localhost:3000/tasks  
Headers:
- Content-Type: application/json
(no x-api-key header)

Body:
{
  "title": "No key",
  "listId": "1"
}

---

## Linting
npm run lint