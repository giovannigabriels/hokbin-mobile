const express = require("express");
const Controller = require("../controllers/itemController");
const router = express.Router();

router.get("/", Controller.getItem);
router.get("/:id", Controller.getOneItem);
router.delete("/:id", Controller.deleteItem);
router.post("/", Controller.addItem);
router.put("/:id", Controller.updateItem);

module.exports = router;
