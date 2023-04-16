const router = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../models/User");

const registrationController = require("../controllers/registrationController");

// POST - Register new user.
router.post("/register", registrationController.handleRegistration);

module.exports = router;