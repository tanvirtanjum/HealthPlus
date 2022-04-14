const login_statusController = require("../controllers/login_status.controller");

var express = require("express");

var router = express.Router();

router.get("/get-all-status", login_statusController.getAllStatus);

module.exports = router;