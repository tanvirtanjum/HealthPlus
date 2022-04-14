const section_filesController = require("../controllers/section_files.controller");
const auth = require("../middleware/authenticate.middleware");
const multer  = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/section files')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + "_" + file.originalname)
    }
  })
  
const upload = multer({ storage: storage });
  

var express = require("express");

var router = express.Router();

router.get("/get-all-files/section/:id", section_filesController.getAllFilesBySection);
router.get("/get-files/file_id/:id", auth.authAdmin_Teacher, section_filesController.getFileByID);
router.post("/post-files/section/:id", auth.authAdmin_Teacher, upload.single('uploaded_file'), section_filesController.postSectionFile);
router.delete("/delete/id/:id", auth.authAdmin_Teacher, section_filesController.deleteFileByID);
module.exports = router;