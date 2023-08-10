const express = require("express");
const router = express.Router();

const itemRouter = require("./itemRouter");
const categoryRouter = require("./categoryRouter");

router.use("/pub/items", itemRouter);

router.use("/items", itemRouter);
router.use("/categories", categoryRouter);

module.exports = router;
