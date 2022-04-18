const employeesController = require("../controllers/employees.controller");
const auth = require("../middleware/authenticate.middleware");

var express = require("express");

var router = express.Router();

router.get("/get-all-employees", employeesController.getAllEmployees);
router.get("/get-employee/:id", employeesController.getEmployee);
router.get("/name/:param1/essn/:param2", employeesController.getEmployeeByNameOrEssn)
router.post("/post-employee", auth.authAdmin, employeesController.postEmployee);
router.put("/update-employee/:id", auth.authAdmin, employeesController.updateEmployee);
router.put("/update-user-authentication-role", auth.authAdmin, employeesController.updateUserRole);

module.exports = router;