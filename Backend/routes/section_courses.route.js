const section_coursesController = require("../controllers/section_courses.controller");
const auth = require("../middleware/authenticate.middleware");

var express = require("express");

var router = express.Router();

router.get("/get-courses/:id", auth.authAdmin_Teacher, section_coursesController.getCourse);
router.get("/get-courses/section/:id", auth.authAdmin_Teacher_Student, section_coursesController.getCoursesBySection);
router.get("/get-courses/session/:session_id/teacher/:teacher_id", auth.authTeacher, section_coursesController.getCourseBySession_Teacher);
router.post("/insert-course", auth.authAdmin, section_coursesController.postCourse);
router.put("/update-course/:id", auth.authAdmin, section_coursesController.updateCourse);
router.delete("/delete-course/:id", auth.authAdmin, section_coursesController.deleteCourse);

module.exports = router;