const express = require("express");
const router = express.Router();
const upload = require("../services/uploads.js");
const { uploadUserImage, getUserImage } = require("../controller/upload.js");


router.post("/image", upload.single("image"), uploadUserImage);
router.get("/images", getUserImage);

module.exports = router;
