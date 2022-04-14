const session_statusController = require("../controllers/session_status.controller");
const auth = require("../middleware/authenticate.middleware");

var express = require("express");

var router = express.Router();

router.get("/get-all-status", auth.authAdmin, session_statusController.getAllStatus);

module.exports = router;