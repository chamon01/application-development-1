const pool = require("../db");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        error: {
          code: "VALIDATION_ERROR",
          message: "email and password are required"
        }
      });
    }

    const [rows] = await pool.query(
      "SELECT id, email, role FROM users WHERE email = ? AND password = ?",
      [email, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        error: {
          code: "INVALID_CREDENTIALS",
          message: "Email or password is incorrect."
        }
      });
    }

    req.session.user = rows[0];

    return res.json({
      message: "Login successful.",
      user: req.session.user
    });
  } catch (err) {
    return next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({
          error: {
            code: "LOGOUT_FAILED",
            message: "Could not log out."
          }
        });
      }

      return res.json({
        message: "Logout successful."
      });
    });
  } catch (err) {
    return next(err);
  }
};

exports.me = async (req, res) => {
  return res.json({
    user: req.session.user
  });
};