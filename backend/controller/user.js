const mongoose = require("mongoose");
const User = require("../model/user.js");
const Problem = require("../model/problems.js");
const ProblemTable = require("../model/prolemTable.js");

const { VM } = require("vm2"); // <- yahi VM2 import karo



exports.toggleLike = async (req, res) => {
  try {
    const userId = req.user.id;
    const { problemId } = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(problemId)
    ) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const user = await User.findById(userId);
    const problem = await ProblemTable.findById(problemId);

    if (!user || !problem)
      return res.status(404).json({ message: "User or Problem not found" });

    // ObjectId safe
    const pid = problem._id;

    // Check current state using .some + equals
    const liked = user.likedProblems.some((id) => id.equals(pid));
    const disliked = user.dislikedProblems.some((id) => id.equals(pid));

    if (liked) {
      // Undo like
      user.likedProblems.pull(pid);
      problem.likes = Math.max(0, problem.likes - 1);
    } else if (disliked) {
      // Switch from dislike → like
      user.dislikedProblems.pull(pid);
      problem.dislikes = Math.max(0, problem.dislikes - 1);

      user.likedProblems.addToSet(pid);
      problem.likes += 1;
    } else {
      // Fresh like
      user.likedProblems.addToSet(pid);
      problem.likes += 1;
    }

    await user.save();
    await problem.save();

    res.json({
      likes: problem.likes,
      dislikes: problem.dislikes,
      liked: user.likedProblems.some((id) => id.equals(pid)),
      disliked: user.dislikedProblems.some((id) => id.equals(pid)),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.toggleDislike = async (req, res) => {
  try {
    const userId = req.user.id;
    const { problemId } = req.body;

    // 1️⃣ Validate IDs
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(problemId)
    ) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    // 2️⃣ Fetch user & problem
    const user = await User.findById(userId);
    const problem = await ProblemTable.findById(problemId);

    if (!user || !problem) {
      return res.status(404).json({ message: "User or Problem not found" });
    }

    const pid = problem._id; // ObjectId safe

    // 3️⃣ Check current state using ObjectId equality
    const liked = user.likedProblems.some((id) => id.equals(pid));
    const disliked = user.dislikedProblems.some((id) => id.equals(pid));

    // 4️⃣ Toggle logic
    if (disliked) {
      // Undo dislike
      user.dislikedProblems.pull(pid);
      problem.dislikes = Math.max(0, problem.dislikes - 1);
    } else if (liked) {
      // Switch from like → dislike
      user.likedProblems.pull(pid); // Remove like
      problem.likes = Math.max(0, problem.likes - 1);

      user.dislikedProblems.addToSet(pid); // Add dislike
      problem.dislikes += 1; // Increment dislike
    } else {
      // Fresh dislike
      user.dislikedProblems.addToSet(pid);
      problem.dislikes += 1;
    }

    // 5️⃣ Save changes
    await user.save();
    await problem.save();

    // 6️⃣ Send response
    res.json({
      likes: problem.likes,
      dislikes: problem.dislikes,
      liked: user.likedProblems.some((id) => id.equals(pid)),
      disliked: user.dislikedProblems.some((id) => id.equals(pid)),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.toggleStar = async (req, res) => {
  try {
    const userId = req.user.id;
    const { problemId } = req.body;

    // 1️⃣ Validate IDs
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(problemId)
    ) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    // 2️⃣ Fetch user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 3️⃣ Check starred state
    const starred = user.starredProblems.includes(problemId);

    // 4️⃣ Toggle logic
    if (starred) {
      user.starredProblems.pull(problemId);
    } else {
      user.starredProblems.push(problemId);
    }

    // 5️⃣ Save
    await user.save();

    // 6️⃣ Response
    res.json({
      starred: user.starredProblems.includes(problemId),
      totalStarred: user.starredProblems.length,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.getUserReaction = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




// ✅ Get logged-in user's profile
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // middleware se user id mil raha hai
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      displayName: user.displayName,
      email: user.email,
      role: user.role,
      bio: user.bio,
      location: user.location,
      skills: user.skills,
      socialLinks: user.socialLinks,
      solvedProblems: user.solvedProblems
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Update logged-in user's profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const { displayName, bio, location, skills, socialLinks } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔹 BASIC FIELDS
    if (displayName !== undefined) user.displayName = displayName;
    if (bio !== undefined) user.bio = bio;
    if (location !== undefined) user.location = location;

    if (skills !== undefined && Array.isArray(skills)) {
      user.skills = skills;
    }

    // 🔹 SOCIAL LINKS SAFE UPDATE
    if (socialLinks) {
      user.socialLinks = {
        github:
          socialLinks.github !== undefined
            ? socialLinks.github
            : user.socialLinks?.github || "",

        linkedin:
          socialLinks.linkedin !== undefined
            ? socialLinks.linkedin
            : user.socialLinks?.linkedin || "",

        twitter:
          socialLinks.twitter !== undefined
            ? socialLinks.twitter
            : user.socialLinks?.twitter || "",
      };
    }

    await user.save();

    res.json({
      message: "Profile updated successfully",
      profile: {
        displayName: user.displayName,
        email: user.email,
        bio: user.bio,
        location: user.location,
        skills: user.skills,
        socialLinks: user.socialLinks,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};





exports.uploadUserImage = async (req, res) => {



  try {
    const userId = req.user.id; // auth middleware se

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




exports.submitCode = async (req, res) => {
  const { problemId, userCode } = req.body;

  try {
    // 1️⃣ Fetch problem
    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.json({ success: false, error: "Problem not found" });
    }

    // 🔥 Remove comments from user code
    const cleanCode = userCode
      .replace(/\/\/.*$/gm, "")
      .replace(/\/\*[\s\S]*?\*\//g, "");

    // 2️⃣ Extract handler function name
    const handlerMatch = problem.handlerFunction.match(
      /function\s+([a-zA-Z0-9_]+)/
    );
    if (!handlerMatch) {
      return res.json({ success: false, error: "Invalid handler function" });
    }
    const handlerName = handlerMatch[1];

    // 3️⃣ Extract user function name
    const userMatch = cleanCode.match(/function\s+([a-zA-Z0-9_]+)/);
    if (!userMatch) {
      return res.json({
        success: false,
        error: "Function not found in your code",
      });
    }
    const userFuncName = userMatch[1];

    // 4️⃣ Combine final code
    const finalCode = `
      ${cleanCode}

      ${problem.handlerFunction}

      ${handlerName}(${userFuncName}, require("assert"));
    `;

    // 5️⃣ Run code safely
    const vm = require("vm");

    const context = {
      require,
      console: { log: () => {} }, // 🚫 block console.log
    };

    vm.createContext(context);

    const script = new vm.Script(finalCode, { timeout: 2000 });
    script.runInContext(context);

    // 6️⃣ Update solved problems
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.json({ success: false, error: "User not found" });
    }

    if (!user.solvedProblems.includes(problemId)) {
      user.solvedProblems.push(problemId);
      await user.save();
    }

    // 7️⃣ Success
    res.json({
      success: true,
      message: "Problem solved successfully 🎉",
    });
  } catch (err) {
    res.json({
      success: false,
      error: err.message,
    });
  }
};



