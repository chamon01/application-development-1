module.exports = function validateTask(req, res, next) {
  const body = req.body || {};
  const method = req.method.toUpperCase();

  const hasTitle = Object.prototype.hasOwnProperty.call(body, "title");
  const hasListId = Object.prototype.hasOwnProperty.call(body, "listId");

  // PATCH: must send at least one updatable field
  if (method === "PATCH" && !hasTitle && !hasListId) {
    return res.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        message: "Provide at least one field to update: title or listId"
      }
    });
  }

  // POST: require both fields
  if (method === "POST") {
    if (!hasTitle) {
      return res.status(400).json({
        error: { code: "VALIDATION_ERROR", message: "title is required (string)" }
      });
    }
    if (!hasListId) {
      return res.status(400).json({
        error: { code: "VALIDATION_ERROR", message: "listId is required (string)" }
      });
    }
  }

  // If title is present (POST or PATCH), validate it
  if (hasTitle) {
    const title = body.title;
    if (typeof title !== "string" || title.trim().length === 0) {
      return res.status(400).json({
        error: { code: "VALIDATION_ERROR", message: "title must be a non-empty string" }
      });
    }
    req.body.title = title.trim();
  }

  // If listId is present (POST or PATCH), validate it
  if (hasListId) {
    const listId = body.listId;
    if (typeof listId !== "string" || listId.trim().length === 0) {
      return res.status(400).json({
        error: { code: "VALIDATION_ERROR", message: "listId must be a non-empty string" }
      });
    }
    req.body.listId = listId.trim();
  }

  next();
};
