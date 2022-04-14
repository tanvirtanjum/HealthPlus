const designationsController = require("../controllers/designations.controller");
const auth = require("../middleware/authenticate.middleware");

var express = require("express");

var router = express.Router();

router.get("/get-all-designations", designationsController.getAllDesignation);
router.get("/get-designation/:id", auth.authAdmin, designationsController.getDesignation);
router.post("/post-designation", auth.authAdmin, designationsController.postDesignation);
router.put("/update-designation/:id", auth.authAdmin, designationsController.updateDesignation);

module.exports = router;