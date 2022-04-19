const medicationsController = require("../controllers/medications.controller");
const auth = require("../middleware/authenticate.middleware");

var express = require("express");

var router = express.Router();

router.get("/get-records", medicationsController.getRecords);
router.get("/get-record/:id", medicationsController.getRecord);
router.post("/post-record", auth.authPhysician, medicationsController.postRecord);
router.put("/update-record/:id", auth.authPhysician, medicationsController.updateRecord);

module.exports = router;