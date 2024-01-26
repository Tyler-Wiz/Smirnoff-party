const express = require("express");
const router = express.Router();
const { read } = require("../controllers");

router.get("", read);

module.exports = router;
