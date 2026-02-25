const express = require("express");
const controller = require("../controllers/listsController");

const router = express.Router();

router.get("/", controller.list);
router.get("/:id", controller.getOne);

router.post("/", controller.create);
router.patch("/:id", controller.patch);
router.delete("/:id", controller.remove);

module.exports = router;