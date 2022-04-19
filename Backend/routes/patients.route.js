const patientsController = require("../controllers/patients.controller");
const auth = require("../middleware/authenticate.middleware");

var express = require("express");

var router = express.Router();

router.get("/get-all-patients", patientsController.getAllPatients);
router.get("/get-patient/:id", patientsController.getPatient);
router.get("/name/:param1/essn/:param2", patientsController.getPatientByNameOrSsn)
router.post("/post-patients", auth.authAdmin, patientsController.postPatient);
router.put("/update-patient/:id", auth.authAdmin, patientsController.updatePatient);

module.exports = router;