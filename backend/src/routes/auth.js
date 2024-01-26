const express = require("express");
const router = express.Router();
const { create, createAdmin } = require("../controllers");

// Create a new user in database
router.post("/register", create);

// Create an admin user in database
router.post("/admin", createAdmin);

module.exports = router;
