module.exports = function sendError(res, status = 500, code = "SERVER_ERROR", message = "Unexpected error", details) {
  const httpStatus = Number(status) || 500;

  const payload = { error: { code, message } };
  if (details !== undefined) payload.error.details = details;

  return res.status(httpStatus).json(payload);
};
