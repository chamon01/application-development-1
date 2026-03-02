const sendError = require("../helpers/sendError");

let tasks = [];
let nextId = 1;

function paginate(items, page = 1, limit = 10) {
  const p = Number(page) || 1;
  const l = Number(limit) || 10;
  const start = (p - 1) * l;

  return {
    data: items.slice(start, start + l),
    meta: { page: p, limit: l, total: items.length }
  };
}

exports.list = (req, res) => {
  const { page, limit } = req.query;
  return res.json(paginate(tasks, page, limit));
};

exports.getOne = (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find(x => x.id === id);

  if (!task) {
    return sendError(res, 404, "NOT_FOUND", "Task not found");
  }

  return res.json({ data: task });
};

exports.create = (req, res) => {
  const { title, listId, priority } = req.body;

  const now = new Date().toISOString();

  const newTask = {
    id: nextId++,
    title,
    completed: false,
    listId,
    dueDate: null,
    priority: priority ?? "medium",
    createdAt: now,
    updatedAt: now
  };

  tasks.push(newTask);
  return res.status(201).json({ data: newTask });
};

exports.patch = (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find(x => x.id === id);

  if (!task) {
    return sendError(res, 404, "NOT_FOUND", "Task not found");
  }

  const allowed = ["title", "completed", "listId", "dueDate", "priority"];
  for (const key of allowed) {
    if (req.body && req.body[key] !== undefined) {
      task[key] = req.body[key];
    }
  }

  task.updatedAt = new Date().toISOString();
  return res.json({ data: task });
};

exports.remove = (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex(x => x.id === id);

  if (index === -1) {
    return sendError(res, 404, "NOT_FOUND", "Task not found");
  }

  tasks.splice(index, 1);
  return res.json({ data: { deleted: true } });
};