const sendError = require("../helpers/sendError");

let lists = [];
let nextId = 1;

function parseId(req) {
  const id = Number(req.params.id);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function normalizeName(name) {
  return typeof name === "string" ? name.trim() : "";
}

exports.list = (req, res) => {
  return res.json({ data: lists });
};

exports.getOne = (req, res) => {
  const id = parseId(req);
  if (!id) {
    return sendError(res, 400, "BAD_REQUEST", "Invalid id");
  }

  const list = lists.find(x => x.id === id);
  if (!list) {
    return sendError(res, 404, "NOT_FOUND", "List not found");
  }

  return res.json({ data: list });
};

exports.create = (req, res) => {
  const { name } = req.body || {};
  const cleanName = normalizeName(name);

  if (cleanName.length === 0) {
    return sendError(res, 400, "VALIDATION_ERROR", "name must be a non-empty string");
  }

  const exists = lists.some(l => l.name.toLowerCase() === cleanName.toLowerCase());
  if (exists) {
    return sendError(res, 409, "CONFLICT", "List name already exists");
  }

  const now = new Date().toISOString();
  const newList = {
    id: nextId++,
    name: cleanName,
    createdAt: now,
    updatedAt: now
  };

  lists.push(newList);
  return res.status(201).json({ data: newList });
};

exports.patch = (req, res) => {
  const id = parseId(req);
  if (!id) {
    return sendError(res, 400, "BAD_REQUEST", "Invalid id");
  }

  const list = lists.find(x => x.id === id);
  if (!list) {
    return sendError(res, 404, "NOT_FOUND", "List not found");
  }

  const body = req.body || {};
  const hasName = Object.prototype.hasOwnProperty.call(body, "name");

  if (!hasName) {
    return sendError(res, 400, "VALIDATION_ERROR", "Provide at least one field to update");
  }

  const cleanName = normalizeName(body.name);
  if (cleanName.length === 0) {
    return sendError(res, 400, "VALIDATION_ERROR", "name must be a non-empty string");
  }

  const exists = lists.some(
    l => l.id !== id && l.name.toLowerCase() === cleanName.toLowerCase()
  );
  if (exists) {
    return sendError(res, 409, "CONFLICT", "List name already exists");
  }

  list.name = cleanName;
  list.updatedAt = new Date().toISOString();
  return res.json({ data: list });
};

exports.remove = (req, res) => {
  const id = parseId(req);
  if (!id) {
    return sendError(res, 400, "BAD_REQUEST", "Invalid id");
  }

  const index = lists.findIndex(x => x.id === id);
  if (index === -1) {
    return sendError(res, 404, "NOT_FOUND", "List not found");
  }

  lists.splice(index, 1);
  return res.json({ data: { deleted: true } });
};
