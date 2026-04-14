module.exports = function requireLogin(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({
      error: {
        code: "NOT_AUTHENTICATED",
        message: "You must be logged in to access this route."
      }
    });
  }

  next();
};