const admission_noticesController = require("../controllers/admission_notices.controller");
const auth = require("../middleware/authenticate.middleware");

var express = require("express");

var router = express.Router();

router.get("/get-all-notices", admission_noticesController.getAllNotices);
router.get("/get-notice/:id", admission_noticesController.getNotice);
router.post("/post-notice", auth.authAdmin, admission_noticesController.postNotice);
router.delete("/delete-notice/:id", auth.authAdmin, admission_noticesController.deleteNotice);
router.put("/update-notice/:id", auth.authAdmin, admission_noticesController.updateNotice);

module.exports = router;