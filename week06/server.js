const express = require("express");
const logger = require("./middleware/logger");

const tasksRoutes = require("./routes/tasks");
const listsRoutes = require("./routes/lists");

const app = express();

// 1) JSON parsing
app.use(express.json());

// 2) Request logging middleware
app.use(logger);

// Routes
app.use("/tasks", tasksRoutes);
app.use("/lists", listsRoutes);

// 3) 404 handler (no route matched)
app.use((req, res) => {
  return res.status(404).json({
    error: {
      code: "NOT_FOUND",
      message: "Route not found"
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});