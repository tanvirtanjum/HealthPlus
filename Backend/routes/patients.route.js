const physiciansController = require("../controllers/physicians.controller");
const auth = require("../middleware/authenticate.middleware");

var express = require("express");

var router = express.Router();

router.get("/get-all-physicians", physiciansController.getAllPhysicians);
router.get("/get-physician/:id", physiciansController.getPhysician);
router.get("/name/:param1/essn/:param2", physiciansController.getPhysiciansByNameOrEssn)
router.post("/post-physician", auth.authAdmin, physiciansController.postPhysician);
router.put("/update-physician/:id", auth.authAdmin, physiciansController.updatePhysician);

module.exports = router;