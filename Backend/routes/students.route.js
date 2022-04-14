const studentsController = require("../controllers/students.controller");
const auth = require("../middleware/authenticate.middleware");
const multer  = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/student images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + "-" + file.originalname)
    }
  })
  
const upload = multer({ storage: storage });

var express = require("express");

var router = express.Router();

router.get("/get-all-students", studentsController.getAllStudent);
router.get("/get-count", studentsController.getCount);
router.get("/get-student/:id", studentsController.getStudent);
router.get("/get-student/login/:id", auth.authStudent, studentsController.getStudentByLogin);
router.get("/nameid/:para", studentsController.getStudentsByNameID);
router.get("/student_id/:student_id", auth.authAdmin, studentsController.getStudentByStudentID);
router.post("/insert-student", auth.authAdmin, studentsController.postStudent);
router.put("/update-student/:id", auth.authAdmin, studentsController.updateStudent);
router.put("/update-student-class-group/:id", auth.authTeacher, studentsController.updateStudentClassGroup);
router.put("/update-student-image/:id", auth.authAdmin, upload.single('uploaded_update_file'), studentsController.updateStudentImage);
router.put("/insert-student-image/:id", auth.authAdmin, upload.single('uploaded_file'), studentsController.insertStudentImage);

module.exports = router;