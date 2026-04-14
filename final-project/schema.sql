DROP DATABASE IF EXISTS capstone_task_manager;
CREATE DATABASE capstone_task_manager;
USE capstone_task_manager;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  role VARCHAR(20) NOT NULL
);

CREATE TABLE lists (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  completed TINYINT(1) NOT NULL DEFAULT 0,
  list_id INT NOT NULL,
  owner_id INT NOT NULL,
  FOREIGN KEY (list_id) REFERENCES lists(id),
  FOREIGN KEY (owner_id) REFERENCES users(id)
);

INSERT INTO users (email, password, role) VALUES
('admin@example.com', 'password123', 'admin'),
('user@example.com', 'password123', 'user');

INSERT INTO lists (name, user_id) VALUES
('Admin List', 1),
('User List', 2);

INSERT INTO tasks (title, completed, list_id, owner_id) VALUES
('Review reports', 0, 1, 1),
('Deploy update', 1, 1, 1),
('Finish homework', 0, 2, 2),
('Study backend concepts', 1, 2, 2);
