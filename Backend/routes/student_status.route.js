const student_statusController = require("../controllers/student_status.controller");

var express = require("express");

var router = express.Router();

router.get("/get-all-status", student_statusController.getAllStatus);

module.exports = router;