const wingsController = require("../controllers/wings.controller");

var express = require("express");

var router = express.Router();

router.get("/get-all-wings", wingsController.getAllWings);

module.exports = router;