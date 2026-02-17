const express = require("express");
const router = express.Router();

const tasksController = require("../controllers/tasksController");

// GET /tasks 
router.get("/", tasksController.listTasks);

// GET /tasks/:id
router.get("/:id", tasksController.getTaskById);

// POST /tasks
router.post("/", tasksController.createTask);

// PATCH /tasks/:id
router.patch("/:id", tasksController.updateTask);

// DELETE /tasks/:id
router.delete("/:id", tasksController.deleteTask);

module.exports = router;
