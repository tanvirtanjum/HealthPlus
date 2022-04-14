const groupsController = require("../controllers/groups.controller");
const auth = require("../middleware/authenticate.middleware");

var express = require("express");

var router = express.Router();

router.get("/get-all-groups", auth.authAdmin_Teacher, groupsController.getAllGroups);

module.exports = router;