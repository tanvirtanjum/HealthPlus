const academic_sessions_sectionsController = require("../controllers/academic_session_sections.controller");
const auth = require("../middleware/authenticate.middleware");

var express = require("express");

var router = express.Router();

router.get("/get-section/:id", auth.authAdmin_Teacher_Student, academic_sessions_sectionsController.getSection);
router.get("/get-sections/session/:id", auth.authAdmin, academic_sessions_sectionsController.getSectionsBySession);
router.get("/get-sections/session/:session_id/teacher/:teacher_id", auth.authTeacher, academic_sessions_sectionsController.getSectionsBySession_Teacher);
router.post("/insert-section", auth.authAdmin, academic_sessions_sectionsController.postSection);
router.put("/update-section/:id", auth.authAdmin, academic_sessions_sectionsController.updateSection);

module.exports = router;