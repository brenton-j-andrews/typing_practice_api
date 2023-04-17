const router = require("express").Router();

const registrationController = require("../controllers/registrationController");

// POST - Register new user.
router.post("/", registrationController.handleRegistration);

module.exports = router;