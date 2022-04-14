const rolesController = require("../controllers/roles.controller");

var express = require("express");

var router = express.Router();

router.get("/get-all-roles", rolesController.getAllRoles);

module.exports = router;