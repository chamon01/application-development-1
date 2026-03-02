const sendError = require("../helpers/sendError");

let tasks = [];
let nextId = 1;

function parseId(req) {
  const id = Number(req.params.id);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function paginate(items, page = 1, limit = 10) {
  const p = Math.max(1, Number(page) || 1);
  const l = Math.min(100, Math.max(1, Number(limit) || 10));
  const start = (p - 1) * l;

  return {
    data: items.slice(start, start + l),
    meta: { page: p, limit: l, total: items.length }
  };
}

function isValidDateString(value) {
  if (value === null) return true;
  if (typeof value !== "string") return false;
  return !Number.isNaN(Date.parse(value));
}

function isValidPriority(value) {
  return value === "low" || value === "medium" || value === "high";
}

exports.list = (req, res) => {
  const { page, limit } = req.query;
  return res.json(paginate(tasks, page, limit));
};

exports.getOne = (req, res) => {
  const id = parseId(req);
  if (!id) {
    return sendError(res, 400, "BAD_REQUEST", "Invalid id");
  }

  const task = tasks.find(x => x.id === id);
  if (!task) {
    return sendError(res, 404, "NOT_FOUND", "Task not found");
  }

  return res.json({ data: task });
};

exports.create = (req, res) => {
  const { title, listId, priority } = req.body || {};

  // validate fields (in case middleware is missing/misapplied)
  if (typeof title !== "string" || title.trim().length === 0) {
    return sendError(res, 400, "VALIDATION_ERROR", "title must be a non-empty string");
  }
  if (typeof listId !== "string" || listId.trim().length === 0) {
    return sendError(res, 400, "VALIDATION_ERROR", "listId must be a non-empty string");
  }
  if (priority !== undefined && !isValidPriority(priority)) {
    return sendError(res, 400, "VALIDATION_ERROR", "priority must be low, medium, or high");
  }

  const now = new Date().toISOString();

  const newTask = {
    id: nextId++,
    title: title.trim(),
    completed: false,
    listId: listId.trim(),
    dueDate: null,
    priority: priority ?? "medium",
    createdAt: now,
    updatedAt: now
  };

  tasks.push(newTask);
  return res.status(201).json({ data: newTask });
};

exports.patch = (req, res) => {
  const id = parseId(req);
  if (!id) {
    return sendError(res, 400, "BAD_REQUEST", "Invalid id");
  }

  const task = tasks.find(x => x.id === id);
  if (!task) {
    return sendError(res, 404, "NOT_FOUND", "Task not found");
  }

  const body = req.body || {};
  const hasTitle = Object.prototype.hasOwnProperty.call(body, "title");
  const hasListId = Object.prototype.hasOwnProperty.call(body, "listId");
  const hasCompleted = Object.prototype.hasOwnProperty.call(body, "completed");
  const hasDueDate = Object.prototype.hasOwnProperty.call(body, "dueDate");
  const hasPriority = Object.prototype.hasOwnProperty.call(body, "priority");

  // require at least one field to update
  if (!hasTitle && !hasListId && !hasCompleted && !hasDueDate && !hasPriority) {
    return sendError(res, 400, "VALIDATION_ERROR", "Provide at least one field to update");
  }

  if (hasTitle) {
    if (typeof body.title !== "string" || body.title.trim().length === 0) {
      return sendError(res, 400, "VALIDATION_ERROR", "title must be a non-empty string");
    }
    task.title = body.title.trim();
  }

  if (hasListId) {
    if (typeof body.listId !== "string" || body.listId.trim().length === 0) {
      return sendError(res, 400, "VALIDATION_ERROR", "listId must be a non-empty string");
    }
    task.listId = body.listId.trim();
  }

  if (hasCompleted) {
    if (typeof body.completed !== "boolean") {
      return sendError(res, 400, "VALIDATION_ERROR", "completed must be a boolean");
    }
    task.completed = body.completed;
  }

  if (hasDueDate) {
    if (!isValidDateString(body.dueDate)) {
      return sendError(res, 400, "VALIDATION_ERROR", "dueDate must be an ISO date string or null");
    }
    task.dueDate = body.dueDate;
  }

  if (hasPriority) {
    if (!isValidPriority(body.priority)) {
      return sendError(res, 400, "VALIDATION_ERROR", "priority must be low, medium, or high");
    }
    task.priority = body.priority;
  }

  task.updatedAt = new Date().toISOString();
  return res.json({ data: task });
};

exports.remove = (req, res) => {
  const id = parseId(req);
  if (!id) {
    return sendError(res, 400, "BAD_REQUEST", "Invalid id");
  }

  const index = tasks.findIndex(x => x.id === id);
  if (index === -1) {
    return sendError(res, 404, "NOT_FOUND", "Task not found");
  }

  tasks.splice(index, 1);
  return res.json({ data: { deleted: true } });
};
