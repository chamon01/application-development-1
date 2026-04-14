const pool = require("../db");

exports.list = async (req, res, next) => {
  try {
    let sql = `
      SELECT tasks.id, tasks.title, tasks.completed, tasks.list_id, tasks.owner_id, lists.name AS list_name
      FROM tasks
      JOIN lists ON tasks.list_id = lists.id
    `;
    let params = [];

    if (req.session.user.role !== "admin") {
      sql += " WHERE tasks.owner_id = ?";
      params = [req.session.user.id];
    }

    sql += " ORDER BY tasks.id ASC";

    const [rows] = await pool.query(sql, params);
    return res.json({ data: rows });
  } catch (err) {
    return next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const [rows] = await pool.query("SELECT * FROM tasks WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        error: {
          code: "NOT_FOUND",
          message: "Task not found"
        }
      });
    }

    const task = rows[0];

    if (req.session.user.role !== "admin" && task.owner_id !== req.session.user.id) {
      return res.status(403).json({
        error: {
          code: "FORBIDDEN",
          message: "You do not have permission to access this task."
        }
      });
    }

    return res.json({ data: task });
  } catch (err) {
    return next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { title, completed, list_id } = req.body || {};

    if (!title || list_id === undefined) {
      return res.status(400).json({
        error: {
          code: "VALIDATION_ERROR",
          message: "title and list_id are required"
        }
      });
    }

    const [listRows] = await pool.query("SELECT * FROM lists WHERE id = ?", [list_id]);

    if (listRows.length === 0) {
      return res.status(404).json({
        error: {
          code: "NOT_FOUND",
          message: "List not found"
        }
      });
    }

    const list = listRows[0];

    if (req.session.user.role !== "admin" && list.user_id !== req.session.user.id) {
      return res.status(403).json({
        error: {
          code: "FORBIDDEN",
          message: "You do not have permission to add a task to this list."
        }
      });
    }

    const [result] = await pool.query(
      "INSERT INTO tasks (title, completed, list_id, owner_id) VALUES (?, ?, ?, ?)",
      [title, completed ? 1 : 0, list_id, req.session.user.id]
    );

    const [rows] = await pool.query("SELECT * FROM tasks WHERE id = ?", [result.insertId]);
    return res.status(201).json({ data: rows[0] });
  } catch (err) {
    return next(err);
  }
};

exports.patch = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { title, completed, list_id } = req.body || {};

    const [existingRows] = await pool.query("SELECT * FROM tasks WHERE id = ?", [id]);

    if (existingRows.length === 0) {
      return res.status(404).json({
        error: {
          code: "NOT_FOUND",
          message: "Task not found"
        }
      });
    }

    const task = existingRows[0];

    if (req.session.user.role !== "admin" && task.owner_id !== req.session.user.id) {
      return res.status(403).json({
        error: {
          code: "FORBIDDEN",
          message: "You do not have permission to update this task."
        }
      });
    }

    const newTitle = title !== undefined ? title : task.title;
    const newCompleted = completed !== undefined ? (completed ? 1 : 0) : task.completed;
    const newListId = list_id !== undefined ? list_id : task.list_id;

    await pool.query(
      "UPDATE tasks SET title = ?, completed = ?, list_id = ? WHERE id = ?",
      [newTitle, newCompleted, newListId, id]
    );

    const [rows] = await pool.query("SELECT * FROM tasks WHERE id = ?", [id]);
    return res.json({ data: rows[0] });
  } catch (err) {
    return next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const [existingRows] = await pool.query("SELECT * FROM tasks WHERE id = ?", [id]);

    if (existingRows.length === 0) {
      return res.status(404).json({
        error: {
          code: "NOT_FOUND",
          message: "Task not found"
        }
      });
    }

    const task = existingRows[0];

    if (req.session.user.role !== "admin" && task.owner_id !== req.session.user.id) {
      return res.status(403).json({
        error: {
          code: "FORBIDDEN",
          message: "You do not have permission to delete this task."
        }
      });
    }

    await pool.query("DELETE FROM tasks WHERE id = ?", [id]);

    return res.json({
      data: {
        deleted: true
      }
    });
  } catch (err) {
    return next(err);
  }
};