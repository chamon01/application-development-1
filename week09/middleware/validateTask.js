module.exports = function validateTask(req, res, next) {
  const { title, listId } = req.body || {};

  if (!title || typeof title !== "string") {
    return res.status(400).json({
      error: { code: "VALIDATION_ERROR", message: "title is required (string)" }
    });
  }

  if (!listId || typeof listId !== "string") {
    return res.status(400).json({
      error: { code: "VALIDATION_ERROR", message: "listId is required (string)" }
    });
  }

  next();
};