const express = require("express");
const logger = require("./middleware/logger");
const timing = require("./middleware/timing");
const apiKey = require("./middleware/apiKey");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./helpers/notFound");

const tasksRoutes = require("./routes/tasks");
const listsRoutes = require("./routes/lists");

const app = express();

app.use(express.json());
app.use(logger);
app.use(timing);

// API key only for POST/PATCH/DELETE (NOT GET)
app.use((req, res, next) => {
  if (req.method === "GET") return next();
  return apiKey(req, res, next);
});

app.use("/tasks", tasksRoutes);
app.use("/lists", listsRoutes);

// 404 handler
app.use(notFound);

// Central error handler (must be last)
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));