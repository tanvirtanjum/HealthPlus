const admin_statusController = require("../controllers/admin_status.controller");

var express = require("express");

var router = express.Router();

router.get("/get-all-status", admin_statusController.getAllStatus);

module.exports = router;