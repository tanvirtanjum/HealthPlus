const classesController = require("../controllers/classes.controller");
const auth = require("../middleware/authenticate.middleware");

var express = require("express");

var router = express.Router();

router.get("/get-all-classes", classesController.getAllClasses);
router.get("/get-class/:id", auth.authAdmin, classesController.getClass);
router.post("/insert-class", auth.authAdmin, classesController.postClass);
router.put("/update-class/:id", auth.authAdmin, classesController.updateClass);

module.exports = router;