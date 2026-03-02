module.exports = function apiKey(req, res, next) {
  const key = req.header("x-api-key");
  if (key !== "12345") {
    return res.status(401).json({
      error: { code: "UNAUTHORIZED", message: "Missing or invalid API key" }
    });
  }
  next();
};