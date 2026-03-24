const pool = require("../db");
const sendError = require("../helpers/sendError");

// GET /tasks  (optionally keep pagination if you want, but simplest = all rows)
exports.list = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM tasks");
  return res.json({ data: rows });
};

// GET /tasks/:id
exports.getOne = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return sendError(res, 400, "VALIDATION_ERROR", "id must be an integer");
  }

  const [rows] = await pool.query("SELECT * FROM tasks WHERE id = ?", [id]);
  const task = rows[0];

  if (!task) {
    return sendError(res, 404, "NOT_FOUND", "Task not found");
  }

  return res.json({ data: task });
};

// POST /tasks
exports.create = async (req, res) => {
  const { title, status, project_id } = req.body || {};

  if (!title || typeof title !== "string") {
    return sendError(res, 400, "VALIDATION_ERROR", "title is required (string)");
  }
  if (!status || typeof status !== "string") {
    return sendError(res, 400, "VALIDATION_ERROR", "status is required (string)");
  }
  if (!Number.isInteger(project_id)) {
    return sendError(res, 400, "VALIDATION_ERROR", "project_id is required (integer)");
  }

  const [result] = await pool.query(
    "INSERT INTO tasks (title, status, project_id) VALUES (?, ?, ?)",
    [title, status, project_id]
  );

  const [rows] = await pool.query("SELECT * FROM tasks WHERE id = ?", [result.insertId]);
  return res.status(201).json({ data: rows[0] });
};

// PATCH /tasks/:id
exports.patch = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return sendError(res, 400, "VALIDATION_ERROR", "id must be an integer");
  }

  // confirm exists
  const [existingRows] = await pool.query("SELECT * FROM tasks WHERE id = ?", [id]);
  if (existingRows.length === 0) {
    return sendError(res, 404, "NOT_FOUND", "Task not found");
  }

  const { title, status, project_id } = req.body || {};

  // Only allow these fields, and validate types if provided
  if (title !== undefined && typeof title !== "string") {
    return sendError(res, 400, "VALIDATION_ERROR", "title must be a string");
  }
  if (status !== undefined && typeof status !== "string") {
    return sendError(res, 400, "VALIDATION_ERROR", "status must be a string");
  }
  if (project_id !== undefined && !Number.isInteger(project_id)) {
    return sendError(res, 400, "VALIDATION_ERROR", "project_id must be an integer");
  }

  // If nothing to update
  if (title === undefined && status === undefined && project_id === undefined) {
    return sendError(res, 400, "VALIDATION_ERROR", "No valid fields provided to update");
  }

  // Build update dynamically but safely (parameterized)
  const fields = [];
  const values = [];

  if (title !== undefined) {
    fields.push("title = ?");
    values.push(title);
  }
  if (status !== undefined) {
    fields.push("status = ?");
    values.push(status);
  }
  if (project_id !== undefined) {
    fields.push("project_id = ?");
    values.push(project_id);
  }

  values.push(id);

  await pool.query(`UPDATE tasks SET ${fields.join(", ")} WHERE id = ?`, values);

  const [rows] = await pool.query("SELECT * FROM tasks WHERE id = ?", [id]);
  return res.json({ data: rows[0] });
};

// DELETE /tasks/:id
exports.remove = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return sendError(res, 400, "VALIDATION_ERROR", "id must be an integer");
  }

  const [result] = await pool.query("DELETE FROM tasks WHERE id = ?", [id]);

  if (result.affectedRows === 0) {
    return sendError(res, 404, "NOT_FOUND", "Task not found");
  }

  return res.json({ data: { deleted: true } });
};