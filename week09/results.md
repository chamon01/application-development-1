# Week09 Results - Task Management DB

This database represents a simple task management system. It stores users, the projects created by those users, and the tasks that belong to each project. This shows how relational databases connect related data across multiple tables.

## Tables created
- users
- projects
- tasks

## Relationships
- One user can create many projects.
- One project can contain many tasks.
- The projects table connects to users using user_id.
- The tasks table connects to projects using project_id.

## What is a primary key?
A primary key is a column that uniquely identifies each row in a table. In this database, the id column is the primary key in each table.

## What is a foreign key?
A foreign key is a column that links one table to another table’s primary key. In this database, projects.user_id references users.id, and tasks.project_id references projects.id.