module.exports = function requireAdmin(req, res, next) {
  if (!req.session.user || req.session.user.role !== "admin") {
    return res.status(403).json({
      error: {
        code: "FORBIDDEN",
        message: "You do not have permission to access this route."
      }
    });
  }

  next();
};