const express = require("express");
const controller = require("../controllers/tasksController");
const validateTask = require("../middleware/validateTask");

const router = express.Router();

router.get("/", controller.list);
router.get("/:id", controller.getOne);

router.post("/", validateTask, controller.create);
router.patch("/:id", validateTask, controller.patch);

router.delete("/:id", controller.remove);

module.exports = router;