const remarksController = require("../controllers/remarks.controller");

var express = require("express");

var router = express.Router();

router.get("/get-all-remarks", remarksController.getAllRemarks);

module.exports = router;