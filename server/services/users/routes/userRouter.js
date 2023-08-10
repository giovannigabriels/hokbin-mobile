const express = require("express");
const Controller = require("../controllers/userController");

const router = express.Router();

router.get("/", Controller.findAll);
router.post("/", Controller.addUser);
router.get("/:id", Controller.findOne);
router.delete("/:id", Controller.delete);

module.exports = router;
