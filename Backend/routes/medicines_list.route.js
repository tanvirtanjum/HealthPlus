const medicines_listController = require("../controllers/medicines_list.controller");
const auth = require("../middleware/authenticate.middleware");

var express = require("express");

var router = express.Router();

router.get("/get-records/prescription/:id", medicines_listController.getAllRecords);
router.post("/post-record", auth.authPhysician, medicines_listController.postRecord);
router.delete("/delete-record/:id", auth.authPhysician, medicines_listController.deleteRecord);

module.exports = router;