const sendError = require("../helpers/sendError");

let lists = [];
let nextId = 1;

exports.list = (req, res) => {
  return res.json({ data: lists });
};

exports.getOne = (req, res) => {
  const id = Number(req.params.id);
  const list = lists.find(x => x.id === id);

  if (!list) {
    return sendError(res, 404, "NOT_FOUND", "List not found");
  }

  return res.json({ data: list });
};

exports.create = (req, res) => {
  const { name } = req.body || {};

  if (!name || typeof name !== "string") {
    return sendError(res, 400, "VALIDATION_ERROR", "name is required (string)");
  }

  const exists = lists.some(l => l.name.toLowerCase() === name.toLowerCase());
  if (exists) {
    return sendError(res, 409, "CONFLICT", "List name already exists");
  }

  const now = new Date().toISOString();
  const newList = { id: nextId++, name, createdAt: now, updatedAt: now };

  lists.push(newList);
  return res.status(201).json({ data: newList });
};

exports.patch = (req, res) => {
  const id = Number(req.params.id);
  const list = lists.find(x => x.id === id);

  if (!list) {
    return sendError(res, 404, "NOT_FOUND", "List not found");
  }

  const { name } = req.body || {};
  if (name !== undefined && typeof name !== "string") {
    return sendError(res, 400, "VALIDATION_ERROR", "name must be a string");
  }

  if (name) {
    const exists = lists.some(
      l => l.id !== id && l.name.toLowerCase() === name.toLowerCase()
    );
    if (exists) {
      return sendError(res, 409, "CONFLICT", "List name already exists");
    }
    list.name = name;
  }

  list.updatedAt = new Date().toISOString();
  return res.json({ data: list });
};

exports.remove = (req, res) => {
  const id = Number(req.params.id);
  const index = lists.findIndex(x => x.id === id);

  if (index === -1) {
    return sendError(res, 404, "NOT_FOUND", "List not found");
  }

  lists.splice(index, 1);
  return res.json({ data: { deleted: true } });
};