let nextListId = 1;

// In-memory storage
const lists = [];

// helper: consistent errors
function sendError(res, status, code, message) {
  return res.status(status).json({ error: { code, message } });
}

// GET /lists
function listLists(req, res) {
  return res.status(200).json({ data: lists });
}

// GET /lists/:id
function getListById(req, res) {
  const id = Number(req.params.id);
  const list = lists.find(l => l.id === id);

  if (!list) {
    return sendError(res, 404, "NOT_FOUND", "List not found");
  }

  return res.status(200).json({ data: list });
}

// POST /lists
// required: name
function createList(req, res) {
  const { name } = req.body || {};

  if (!name || typeof name !== "string") {
    return sendError(res, 400, "VALIDATION_ERROR", "name is required and must be a string");
  }

  // 409: duplicate list name
  const dup = lists.find(l => l.name.toLowerCase() === name.toLowerCase());
  if (dup) {
    return sendError(res, 409, "CONFLICT", "List name already exists");
  }

  const now = new Date().toISOString();

  const newList = {
    id: nextListId++,
    name,
    createdAt: now,
    updatedAt: now
  };

  lists.push(newList);

  return res.status(201).json({ data: newList });
}

// PATCH /lists/:id
function updateList(req, res) {
  const id = Number(req.params.id);
  const list = lists.find(l => l.id === id);

  if (!list) {
    return sendError(res, 404, "NOT_FOUND", "List not found");
  }

  const { name } = req.body || {};

  if (name !== undefined && typeof name !== "string") {
    return sendError(res, 400, "VALIDATION_ERROR", "name must be a string");
  }

  // 409: rename to existing name
  if (name) {
    const dup = lists.find(l => l.id !== id && l.name.toLowerCase() === name.toLowerCase());
    if (dup) {
      return sendError(res, 409, "CONFLICT", "List name already exists");
    }
    list.name = name;
  }

  list.updatedAt = new Date().toISOString();

  return res.status(200).json({ data: list });
}

// DELETE /lists/:id
function deleteList(req, res) {
  const id = Number(req.params.id);
  const index = lists.findIndex(l => l.id === id);

  if (index === -1) {
    return sendError(res, 404, "NOT_FOUND", "List not found");
  }

  lists.splice(index, 1);
  return res.status(200).json({ data: { deleted: true } });
}

module.exports = {
  listLists,
  getListById,
  createList,
  updateList,
  deleteList
};
