let nextTaskId = 1;

// In-memory storage
const tasks = [];

// helper: consistent errors
function sendError(res, status, code, message) {
  return res.status(status).json({ error: { code, message } });
}

// GET /tasks?page=1&limit=10
function listTasks(req, res) {
  const page = req.query.page ? Number(req.query.page) : 1;
  const limit = req.query.limit ? Number(req.query.limit) : 10;

  if (!Number.isInteger(page) || page < 1 || !Number.isInteger(limit) || limit < 1) {
    return sendError(res, 400, "VALIDATION_ERROR", "page and limit must be positive integers");
  }

  const total = tasks.length;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const data = tasks.slice(startIndex, endIndex);

  return res.status(200).json({
    data,
    meta: { page, limit, total }
  });
}

// GET /tasks/:id
function getTaskById(req, res) {
  const id = Number(req.params.id);
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return sendError(res, 404, "NOT_FOUND", "Task not found");
  }

  return res.status(200).json({ data: task });
}

// POST /tasks
// required: title, listId
function createTask(req, res) {
  const { title, listId, dueDate, priority } = req.body || {};

  if (!title || typeof title !== "string") {
    return sendError(res, 400, "VALIDATION_ERROR", "title is required and must be a string");
  }
  if (!listId || typeof listId !== "string") {
    return sendError(res, 400, "VALIDATION_ERROR", "listId is required and must be a string");
  }

  // Example 409: duplicate title inside same list (simple uniqueness rule)
  const dup = tasks.find(t => t.listId === listId && t.title.toLowerCase() === title.toLowerCase());
  if (dup) {
    return sendError(res, 409, "CONFLICT", "Task title already exists in this list");
  }

  const now = new Date().toISOString();

  const newTask = {
    id: nextTaskId++,
    title,
    completed: false,
    listId,
    dueDate: dueDate || null,
    priority: priority || "medium",
    createdAt: now,
    updatedAt: now
  };

  tasks.push(newTask);

  return res.status(201).json({ data: newTask });
}

// PATCH /tasks/:id
function updateTask(req, res) {
  const id = Number(req.params.id);
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return sendError(res, 404, "NOT_FOUND", "Task not found");
  }

  const { title, completed, dueDate, priority } = req.body || {};

  if (title !== undefined && typeof title !== "string") {
    return sendError(res, 400, "VALIDATION_ERROR", "title must be a string");
  }
  if (completed !== undefined && typeof completed !== "boolean") {
    return sendError(res, 400, "VALIDATION_ERROR", "completed must be a boolean");
  }

  // 409 example: cannot set completed true if task has no title (state rule, mostly illustrative)
  if (completed === true && (!task.title || task.title.trim().length === 0)) {
    return sendError(res, 409, "CONFLICT", "Cannot complete a task with an empty title");
  }

  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;
  if (dueDate !== undefined) task.dueDate = dueDate;
  if (priority !== undefined) task.priority = priority;

  task.updatedAt = new Date().toISOString();

  return res.status(200).json({ data: task });
}

// DELETE /tasks/:id
function deleteTask(req, res) {
  const id = Number(req.params.id);
  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) {
    return sendError(res, 404, "NOT_FOUND", "Task not found");
  }

  tasks.splice(index, 1);
  return res.status(200).json({ data: { deleted: true } });
}

module.exports = {
  listTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
