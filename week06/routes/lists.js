const express = require("express");
const router = express.Router();

const listsController = require("../controllers/listsController");

// GET /lists (list)
router.get("/", listsController.listLists);

// GET /lists/:id
router.get("/:id", listsController.getListById);

// POST /lists
router.post("/", listsController.createList);

// PATCH /lists/:id
router.patch("/:id", listsController.updateList);

// DELETE /lists/:id
router.delete("/:id", listsController.deleteList);

module.exports = router;
