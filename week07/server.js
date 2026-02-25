const express = require("express");
const logger = require("./middleware/logger");
const timing = require("./middleware/timing");
const apiKey = require("./middleware/apiKey");

const tasksRoutes = require("./routes/tasks");
const listsRoutes = require("./routes/lists");

const app = express();

app.use(express.json());
app.use(logger);
app.use(timing);

// API key ONLY for POST/PATCH/DELETE (NOT GET)
app.use((req, res, next) => {
  if (req.method === "GET") return next();
  return apiKey(req, res, next);
});

app.use("/tasks", tasksRoutes);
app.use("/lists", listsRoutes);

app.use((req, res) => {
  return res.status(404).json({
    error: { code: "NOT_FOUND", message: "Route not found" }
  });
});

app.listen(3000, () => console.log("API running on http://localhost:3000"));