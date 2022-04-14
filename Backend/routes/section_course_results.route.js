const section_course_resultsController = require("../controllers/section_course_results.controller");
const auth = require("../middleware/authenticate.middleware");

var express = require("express");

var router = express.Router();

router.get("/get-result/:id", auth.authAdmin_Teacher, section_course_resultsController.getResult);
router.get("/get-result/course/:course_id/term/:term_id/section/:section_id", auth.authAdmin_Teacher, section_course_resultsController.getResultsBySectionCourse);
router.get("/get-result/course/:course_id/term/:term_id/student/:student_id/section/:section_id", auth.authAdmin_Teacher, section_course_resultsController.getVerification);
router.get("/get-result/student/:student_id/session/:session_id", auth.authAdmin_Teacher_Student, section_course_resultsController.getStudentResult);
router.get("/get-result/student/:student_id/session/:session_id/term/:term_id", auth.authAdmin_Teacher_Student, section_course_resultsController.getStudentResultTerm);
router.post("/insert-result", auth.authTeacher, section_course_resultsController.postResult);
router.put("/update-result/:id", auth.authTeacher, section_course_resultsController.updateResult);

module.exports = router;