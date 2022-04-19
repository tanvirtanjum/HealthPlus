const illness_statusController = require("../controllers/illness_status.controller");

var express = require("express");

var router = express.Router();

router.get("/get-all-status", illness_statusController.getAllStatus);

module.exports = router;