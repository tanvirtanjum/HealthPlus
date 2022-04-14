const admission_notice_filesController = require("../controllers/admission_notice_files.controller");
const auth = require("../middleware/authenticate.middleware");
const multer  = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/admission circular files')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + "-" + file.originalname)
    }
  })
  
const upload = multer({ storage: storage });
  

var express = require("express");

var router = express.Router();

router.get("/get-all-files/notice/:id", admission_notice_filesController.getAllFilesByNotice);
router.get("/get-files/file_id/:id", auth.authAdmin, admission_notice_filesController.getFileByID);
router.post("/post-files/notice/:id", auth.authAdmin, upload.single('uploaded_file'), admission_notice_filesController.postNoticeFile);
router.delete("/delete/id/:id", auth.authAdmin, admission_notice_filesController.deleteNoticeFileByID);
module.exports = router;