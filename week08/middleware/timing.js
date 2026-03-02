module.exports = function timing(req, res, next) {
  const start = Date.now();
  res.on("finish", () => {
    const ms = Date.now() - start;
    console.log(`[${req.method} ${req.originalUrl}] completed in ${ms}ms`);
  });
  next();
};