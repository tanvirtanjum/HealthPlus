const medical_recordsController = require("../controllers/medical_records.controller");
const auth = require("../middleware/authenticate.middleware");

var express = require("express");

var router = express.Router();

router.get("/get-record/patient/:id", medical_recordsController.getRecord);
router.post("/post-record", auth.authAdmin, medical_recordsController.postRecord);
router.put("/update-record/:id", auth.authAdmin, medical_recordsController.updateRecord);

module.exports = router;