module.exports = function errorHandler(err, req, res, next) {
  // next is required by Express error middleware signature even if unused
  void next;

  console.error("Unhandled error:", err);

  return res.status(500).json({
    error: { code: "INTERNAL_ERROR", message: "Unexpected server error" }
  });
};