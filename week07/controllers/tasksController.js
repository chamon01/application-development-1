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
  const t = tasks.find(x => x.id === id);
  if (!t) {
    return res.status(404).json({
      error: { code: "NOT_FOUND", message: "Task not found" }
    });
  }
  return res.json({ data: t });
};

exports.create = (req, res) => {
  const { title, listId, priority } = req.body;

  const newTask = {
    id: nextId++,
    title,
    completed: false,
    listId,
    dueDate: null,
    priority: priority ?? "medium",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  tasks.push(newTask);
  return res.status(201).json({ data: newTask });
};

exports.patch = (req, res) => {
  const id = Number(req.params.id);
  const t = tasks.find(x => x.id === id);
  if (!t) {
    return res.status(404).json({
      error: { code: "NOT_FOUND", message: "Task not found" }
    });
  }

  const allowed = ["title", "completed", "listId", "dueDate", "priority"];
  for (const key of allowed) {
    if (req.body[key] !== undefined) t[key] = req.body[key];
  }
  t.updatedAt = new Date().toISOString();

  return res.json({ data: t });
};

exports.remove = (req, res) => {
  const id = Number(req.params.id);
  const idx = tasks.findIndex(x => x.id === id);
  if (idx === -1) {
    return res.status(404).json({
      error: { code: "NOT_FOUND", message: "Task not found" }
    });
  }
  tasks.splice(idx, 1);
  return res.json({ data: { deleted: true } });
};