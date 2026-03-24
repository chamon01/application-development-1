let lists = [];
let nextId = 1;

exports.list = (req, res) => {
  return res.json({ data: lists });
};

exports.getOne = (req, res) => {
  const id = Number(req.params.id);
  const item = lists.find(x => x.id === id);
  if (!item) {
    return res.status(404).json({
      error: { code: "NOT_FOUND", message: "List not found" }
    });
  }
  return res.json({ data: item });
};

exports.create = (req, res) => {
  const { name } = req.body || {};
  if (!name || typeof name !== "string") {
    return res.status(400).json({
      error: { code: "VALIDATION_ERROR", message: "name is required (string)" }
    });
  }

  const exists = lists.some(l => l.name.toLowerCase() === name.toLowerCase());
  if (exists) {
    return res.status(409).json({
      error: { code: "CONFLICT", message: "List name already exists" }
    });
  }

  const newList = { id: nextId++, name, createdAt: new Date().toISOString() };
  lists.push(newList);
  return res.status(201).json({ data: newList });
};

exports.patch = (req, res) => {
  const id = Number(req.params.id);
  const item = lists.find(x => x.id === id);
  if (!item) {
    return res.status(404).json({
      error: { code: "NOT_FOUND", message: "List not found" }
    });
  }

  const { name } = req.body || {};
  if (name !== undefined && typeof name !== "string") {
    return res.status(400).json({
      error: { code: "VALIDATION_ERROR", message: "name must be a string" }
    });
  }

  if (name) item.name = name;
  return res.json({ data: item });
};

exports.remove = (req, res) => {
  const id = Number(req.params.id);
  const idx = lists.findIndex(x => x.id === id);
  if (idx === -1) {
    return res.status(404).json({
      error: { code: "NOT_FOUND", message: "List not found" }
    });
  }
  lists.splice(idx, 1);
  return res.json({ data: { deleted: true } });
};