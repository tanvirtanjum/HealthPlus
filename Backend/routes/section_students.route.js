const section_studentsController = require("../controllers/section_students.controller");
const auth = require("../middleware/authenticate.middleware");

var express = require("express");

var router = express.Router();

router.get("/get-students/section/:id", auth.authAdmin_Teacher_Student, section_studentsController.getStudents);
router.post("/insert-student", auth.authTeacher, section_studentsController.postStudent);
router.delete("/delete-student/section/:section_id/student/:student_id", auth.authAdmin_Teacher, section_studentsController.deleteStudent);

module.exports = router;