const employment_statusController = require("../controllers/employment_status.controller");
const auth = require("../middleware/authenticate.middleware");

var express = require("express");

var router = express.Router();

router.get("/get-all-status", auth.authAdmin, employment_statusController.getAllStatus);

module.exports = router;