const User = require("../model/user.js");



exports.uploadUserImage = async (req, res) => {
  try {
    const userId = req.user.id; // auth middleware se
    console.log(userId);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 🔥 Update image in user
    user.imageUrl = req.file.path;
    user.publicId = req.file.filename;

    await user.save();

    res.json({
      success: true,
      message: "Profile image updated",
      imageUrl: user.imageUrl,
      publicId: user.publicId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.getUserImage = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("imageUrl publicId");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      imageUrl: user.imageUrl,
      publicId: user.publicId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};
