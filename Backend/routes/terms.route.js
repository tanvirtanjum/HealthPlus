const termsController = require("../controllers/terms.controller");

var express = require("express");

var router = express.Router();

router.get("/get-all-terms", termsController.getAllTerms);

module.exports = router;