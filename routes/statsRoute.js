/**
 * The stats route contains routes pertaining to user typing stats and level highscores. 
 */

const router = require("express").Router();
const statsController = require("../controllers/statsController");

// POST - Add session to user document.
router.post("/:username/addSession", statsController.handleUserSession);

module.exports = router;