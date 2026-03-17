-- =========================================
-- Week09 - Task Management Database
-- =========================================

-- Part 1: Create DB + use it
CREATE DATABASE task_management_db;
USE task_management_db;

-- Part 3: Create tables
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL,
    project_id INT NOT NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id)
);

-- Part 4: Insert sample data (3 users, 3 projects, 5+ tasks)

INSERT INTO users (name, email) VALUES
('Conner Hamon', 'conner@example.com'),
('Alex Carter', 'alex@example.com'),
('Jordan Lee', 'jordan@example.com');

INSERT INTO projects (name, description, user_id) VALUES
('Home Network Upgrade', 'Plan and track home lab improvements', 1),
('Mobile App Build', 'Build the iOS pizza ordering app', 2),
('Study Plan', 'Track A+ Core 2 study work', 3);

INSERT INTO tasks (title, status, project_id) VALUES
('Buy Ethernet cables', 'completed', 1),
('Configure VLANs', 'in progress', 1),
('Create login screen', 'not started', 2),
('Write API routes', 'in progress', 2),
('Review practice questions', 'completed', 3),
('Schedule study sessions', 'not started', 3);

-- Part 5: Required queries

-- Query 1 — Show all users
SELECT * FROM users;

-- Query 2 — Show all projects
SELECT * FROM projects;

-- Query 3 — Show all tasks
SELECT * FROM tasks;

-- Query 4 — Show tasks with project names (JOIN)
SELECT
    t.title AS task_title,
    t.status AS task_status,
    p.name AS project_name
FROM tasks t
JOIN projects p ON t.project_id = p.id;

-- Query 5 — Show projects with user names (JOIN)
SELECT
    p.name AS project_name,
    u.name AS user_name
FROM projects p
JOIN users u ON p.user_id = u.id;

-- Query 6 — Show only completed tasks
SELECT * FROM tasks
WHERE status = 'completed';

-- Query 7 — Sort tasks alphabetically by title
SELECT * FROM tasks
ORDER BY title ASC;
