const express = require("express");
const router = express.Router();
const  categoryController  = require("../controller/category");
const { authenticatateJWT } = require("../middleware/authenticator");

router.post("/",authenticatateJWT, categoryController.create);

module.exports = router;
