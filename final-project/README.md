# Task Manager API

## Description
This is a backend API for managing users, projects, and tasks. It includes authentication, authorization, and CRUD operations.

## Setup
1. Install dependencies:
npm install

2. Make sure MySQL is running and the database is created.

## Run Server
npm start

Server runs on:
http://localhost:3000

## API Endpoints

Auth
POST /auth/login
POST /auth/logout

Tasks
GET /tasks
POST /tasks
PATCH /tasks/:id
DELETE /tasks/:id

Lists
GET /lists
POST /lists
PATCH /lists/:id
DELETE /lists/:id

## Notes
- Some routes require login
- Some routes require admin or ownership permissions