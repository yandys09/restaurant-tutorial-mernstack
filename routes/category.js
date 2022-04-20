const express = require("express");
const router = express.Router();
const { categoryController } = require("../controller/category");

router.post("/", categoryController);

module.exports = router;
