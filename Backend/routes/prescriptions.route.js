const prescriptionsController = require("../controllers/prescriptions.controller");
const auth = require("../middleware/authenticate.middleware");

var express = require("express");

var router = express.Router();

router.get("/get-record/:id", prescriptionsController.getAllRecords);
router.get("/get-record/appointment/:id", prescriptionsController.getRecordByAppointment);
router.post("/post-record", auth.authPhysician, prescriptionsController.postRecord);
router.put("/update-record/:id", auth.authPhysician, prescriptionsController.updateRecord);

module.exports = router;