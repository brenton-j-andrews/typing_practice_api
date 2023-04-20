const router = require("express").Router();

const authController = require("../controllers/authController");
const refreshTokenController = require("../controllers/refreshTokenController");

// POST - Authenticate existing user.
router.post("/", authController.handleLogin);

// GET - Fetch new JWT access token via the refresh token.
router.get("/refresh", refreshTokenController.handleRefreshToken);

// GET - User logout.
router.get("/logout", authController.handleLogout);

module.exports = router;