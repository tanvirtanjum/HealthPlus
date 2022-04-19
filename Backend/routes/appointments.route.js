const appointmentsController = require("../controllers/appointments.controller");
const auth = require("../middleware/authenticate.middleware");

var express = require("express");

var router = express.Router();

router.get("/get-records", appointmentsController.getAllRecords);
router.get("/get-record/:id", appointmentsController.getRecord);
router.post("/post-record", auth.authAdmin, appointmentsController.postRecord);
router.put("/update-record/:id", auth.authAdmin, appointmentsController.updateRecord);
router.put("/delete-record/:id", auth.authAdmin, appointmentsController.deleteRecord);

module.exports = router;