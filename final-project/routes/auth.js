const express = require("express");
const controller = require("../controllers/authController");
const requireLogin = require("../middleware/requireLogin");

const router = express.Router();

router.post("/login", controller.login);
router.post("/logout", requireLogin, controller.logout);
router.get("/me", requireLogin, controller.me);

module.exports = router;