const employeesController = require("../controllers/employees.controller");
const auth = require("../middleware/authenticate.middleware");
const multer  = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/employee images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + "-" + file.originalname)
    }
  })
  
const upload = multer({ storage: storage });

var express = require("express");

var router = express.Router();

router.get("/get-all-employees", employeesController.getAllEmployees);
router.get("/get-count", employeesController.getCount);
router.get("/get-employee/:id", employeesController.getEmployee);
router.get("/get-employee/current-principal", employeesController.getPrincipal);
router.get("/get-employee/login/:id", auth.authAdmin, employeesController.getEmployeeByLogin);
router.get("/name/:name", employeesController.getEmployeeByName);
router.post("/insert-employee", auth.authAdmin, employeesController.postEmployee);
router.put("/update-employee/:id", auth.authAdmin, employeesController.updateEmployee);
router.put("/update-employee-image/:id", auth.authAdmin, upload.single('uploaded_update_file'), employeesController.updateEmployeeImage);
router.put("/insert-employee-image/:id", auth.authAdmin, upload.single('uploaded_file'), employeesController.insertEmployeeImage);
router.get("/checkcontact/:contact", auth.authAdmin, employeesController.getContact);
router.get("/checkfileno/:fileno", auth.authAdmin, employeesController.getFileNo);

module.exports = router;