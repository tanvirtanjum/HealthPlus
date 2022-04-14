const my_academic_sessionsController = require("../controllers/my_academic_sessions.controller");
const auth = require("../middleware/authenticate.middleware");

var express = require("express");

var router = express.Router();

router.get("/get-session/student/:student_id/session/:session_id", auth.authAdmin_Teacher_Student, my_academic_sessionsController.getStudents);
router.get("/get-session/student/:student_id", auth.authAdmin_Teacher_Student, my_academic_sessionsController.getMyStudentSession);
router.post("/insert-session", auth.authTeacher, my_academic_sessionsController.postStudent);
router.delete("/delete-session/session/:session_id/student/:student_id/section/:section_id", auth.authAdmin_Teacher, my_academic_sessionsController.deleteSession);

module.exports = router;