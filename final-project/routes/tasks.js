const express = require("express");
const controller = require("../controllers/tasksController");
const requireLogin = require("../middleware/requireLogin");

const router = express.Router();

router.get("/", requireLogin, controller.list);
router.get("/:id", requireLogin, controller.getOne);
router.post("/", requireLogin, controller.create);
router.patch("/:id", requireLogin, controller.patch);
router.delete("/:id", requireLogin, controller.remove);

module.exports = router;