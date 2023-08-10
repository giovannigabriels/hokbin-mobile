const express = require("express");
const Controller = require("../controllers/categoryController");
const router = express.Router();

router.get("/", Controller.getCategory);
router.post("/", Controller.addCategory);
router.delete("/:id", Controller.deleteCategory);
router.get("/:id", Controller.getOneCategory);
router.put("/:id", Controller.updateCategory);

module.exports = router;
