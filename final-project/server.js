const express = require("express");
const session = require("express-session");

const authRoutes = require("./routes/auth");
const listsRoutes = require("./routes/lists");
const tasksRoutes = require("./routes/tasks");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(
  session({
    secret: "capstone-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 30
    }
  })
);

app.get("/", (req, res) => {
  res.json({
    message: "Capstone Task Manager API is running."
  });
});

app.use("/auth", authRoutes);
app.use("/lists", listsRoutes);
app.use("/tasks", tasksRoutes);

app.use((req, res) => {
  return res.status(404).json({
    error: {
      code: "NOT_FOUND",
      message: "Route not found"
    }
  });
});

app.use((err, req, res, next) => {
  console.error(err);

  const status = err.status || 500;
  const code = err.code || "SERVER_ERROR";
  const message = err.message || "Internal server error";

  return res.status(status).json({
    error: {
      code,
      message
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});