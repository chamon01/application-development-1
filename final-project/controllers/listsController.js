const pool = require("../db");

exports.list = async (req, res, next) => {
  try {
    let sql = "SELECT * FROM lists";
    let params = [];

    if (req.session.user.role !== "admin") {
      sql += " WHERE user_id = ?";
      params = [req.session.user.id];
    }

    sql += " ORDER BY id ASC";

    const [rows] = await pool.query(sql, params);
    return res.json({ data: rows });
  } catch (err) {
    return next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const [rows] = await pool.query("SELECT * FROM lists WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        error: {
          code: "NOT_FOUND",
          message: "List not found"
        }
      });
    }

    const list = rows[0];

    if (req.session.user.role !== "admin" && list.user_id !== req.session.user.id) {
      return res.status(403).json({
        error: {
          code: "FORBIDDEN",
          message: "You do not have permission to access this list."
        }
      });
    }

    return res.json({ data: list });
  } catch (err) {
    return next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { name } = req.body || {};

    if (!name || typeof name !== "string") {
      return res.status(400).json({
        error: {
          code: "VALIDATION_ERROR",
          message: "name is required"
        }
      });
    }

    const [result] = await pool.query(
      "INSERT INTO lists (name, user_id) VALUES (?, ?)",
      [name, req.session.user.id]
    );

    const [rows] = await pool.query("SELECT * FROM lists WHERE id = ?", [result.insertId]);
    return res.status(201).json({ data: rows[0] });
  } catch (err) {
    return next(err);
  }
};

exports.patch = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { name } = req.body || {};

    if (!name || typeof name !== "string") {
      return res.status(400).json({
        error: {
          code: "VALIDATION_ERROR",
          message: "name is required"
        }
      });
    }

    const [existingRows] = await pool.query("SELECT * FROM lists WHERE id = ?", [id]);

    if (existingRows.length === 0) {
      return res.status(404).json({
        error: {
          code: "NOT_FOUND",
          message: "List not found"
        }
      });
    }

    const list = existingRows[0];

    if (req.session.user.role !== "admin" && list.user_id !== req.session.user.id) {
      return res.status(403).json({
        error: {
          code: "FORBIDDEN",
          message: "You do not have permission to update this list."
        }
      });
    }

    await pool.query("UPDATE lists SET name = ? WHERE id = ?", [name, id]);

    const [rows] = await pool.query("SELECT * FROM lists WHERE id = ?", [id]);
    return res.json({ data: rows[0] });
  } catch (err) {
    return next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const [existingRows] = await pool.query("SELECT * FROM lists WHERE id = ?", [id]);

    if (existingRows.length === 0) {
      return res.status(404).json({
        error: {
          code: "NOT_FOUND",
          message: "List not found"
        }
      });
    }

    const list = existingRows[0];

    if (req.session.user.role !== "admin" && list.user_id !== req.session.user.id) {
      return res.status(403).json({
        error: {
          code: "FORBIDDEN",
          message: "You do not have permission to delete this list."
        }
      });
    }

    await pool.query("DELETE FROM lists WHERE id = ?", [id]);

    return res.json({
      data: {
        deleted: true
      }
    });
  } catch (err) {
    return next(err);
  }
};