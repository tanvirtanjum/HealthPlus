const loginsController = require("../controllers/logins.controller");
const auth = require("../middleware/authenticate.middleware");

var express = require("express");

var router = express.Router();

router.post("/get-user-authentication", loginsController.getUser);
router.post("/get-user-authentication-password", loginsController.getUserPassword);
router.post("/send-user-authentication-password", loginsController.sendUserPassword);
router.put("/update-user-authentication-password", auth.authLogin, loginsController.updateUserPassword);
router.post("/insert-user", auth.authAdmin, loginsController.postUser);
router.get("/authenticated-user/logout", loginsController.getUserLogout);
router.get("/checkemail/:email", auth.authAdmin, loginsController.getEmail);
router.get("/get-login/id/:id", auth.authAdmin, loginsController.getLogin);
router.put("/update-user-authentication-email", auth.authAdmin, loginsController.updateUserEmail);
router.put("/update-user-authentication-role", auth.authAdmin, loginsController.updateUserRole);

module.exports = router;