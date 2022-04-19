const insuranceController = require("../controllers/insurance.controller");
const auth = require("../middleware/authenticate.middleware");

var express = require("express");

var router = express.Router();

router.post("/post-insurance", auth.authAdmin, insuranceController.postInsurance);
router.put("/update-record/:id", auth.authAdmin, insuranceController.updateRecord);

module.exports = router;