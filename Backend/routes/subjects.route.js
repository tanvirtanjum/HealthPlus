const subjectsController = require("../controllers/subjects.controller");
const auth = require("../middleware/authenticate.middleware");

var express = require("express");

var router = express.Router();

router.get("/get-all-subjects", subjectsController.getAllSubjects);
router.get("/get-all-subjects/:name", subjectsController.getAllSubjectsByName);
router.get("/get-subject/:id", subjectsController.getSubject);
router.post("/insert-subject", auth.authAdmin, subjectsController.postSubject);
router.put("/update-subject/:id", auth.authAdmin, subjectsController.updateSubject);

module.exports = router;