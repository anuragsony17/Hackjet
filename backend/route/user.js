const express = require("express");
const router = express.Router();
const {
  toggleLike,
  toggleDislike,
  toggleStar,
 
  getUserReaction,
  getProfile,
  updateProfile,
  uploadUserImage,
  getUserImage,
  submitCode,
} = require("../controller/user.js");
const upload = require("../services/uploads.js");


router.post("/like",  toggleLike);
router.post("/dislike",  toggleDislike);
router.post("/star",  toggleStar);
router.get("/reaction", getUserReaction);
router.get("/profile",  getProfile);
router.put("/profile",  updateProfile);
router.post("/submit", submitCode);



module.exports = router;
