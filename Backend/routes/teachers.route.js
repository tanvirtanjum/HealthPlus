const teachersController = require("../controllers/teachers.controller");
const auth = require("../middleware/authenticate.middleware");
const multer  = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/teacher images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + "-" + file.originalname)
    }
  })
  
const upload = multer({ storage: storage });

var express = require("express");

var router = express.Router();

router.get("/get-all-teachers", teachersController.getAllTeachers);
router.get("/get-count", teachersController.getCount);
router.get("/get-teacher/:id", teachersController.getTeacher);
router.get("/get-teacher/login/:id", auth.authTeacher, teachersController.getTeacherByLogin);
router.get("/name/:name", teachersController.getTeachersByName);
router.post("/insert-teacher", auth.authAdmin, teachersController.postTeacher);
router.put("/update-teacher/:id", auth.authAdmin, teachersController.updateTeacher);
router.put("/update-teacher-image/:id", auth.authAdmin, upload.single('uploaded_update_file'), teachersController.updateTeacherImage);
router.put("/insert-teacher-image/:id", auth.authAdmin, upload.single('uploaded_file'), teachersController.insertTeacherImage);
router.get("/checkcontact/:contact", auth.authAdmin, teachersController.getContact);
router.get("/checkfileno/:fileno", auth.authAdmin, teachersController.getFileNo);

module.exports = router;