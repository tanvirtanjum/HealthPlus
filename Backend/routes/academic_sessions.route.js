const academic_sessionsController = require("../controllers/academic_sessions.controller");
const auth = require("../middleware/authenticate.middleware");

var express = require("express");

var router = express.Router();

router.get("/get-all-session", academic_sessionsController.getAllSessions);
router.get("/get-all-session/:name", academic_sessionsController.getAllSessionsByName);
router.get("/get-session/:id", auth.authAdmin_Teacher, academic_sessionsController.getSession);
router.post("/insert-session", auth.authAdmin, academic_sessionsController.postSession);
router.put("/update-session/:id", auth.authAdmin, academic_sessionsController.updateSession);

module.exports = router;