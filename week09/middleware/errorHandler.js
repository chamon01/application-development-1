module.exports = function errorHandler(err, req, res, next) {
  void next;

  console.error(err);

  return res.status(500).json({
    error: { code: "SERVER_ERROR", message: "Unexpected error" }
  });
};
