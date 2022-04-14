const noticesController = require("../controllers/notices.controller");
const auth = require("../middleware/authenticate.middleware");

var express = require("express");

var router = express.Router();

router.get("/get-all-notices", noticesController.getAllNotices);
router.get("/get-notice/:id", noticesController.getNotice);
router.post("/post-notice", auth.authAdmin, noticesController.postNotice);
router.delete("/delete-notice/:id", auth.authAdmin, noticesController.deleteNotice);
router.put("/update-notice/:id", auth.authAdmin, noticesController.updateNotice);

module.exports = router;