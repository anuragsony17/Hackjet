// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     displayName: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     likedProblems: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Problem",
//       },
//     ],
//     dislikedProblems: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Problem",
//       },
//     ],
//     starredProblems: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Problem",
//       },
//     ],
//     solvedProblems: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Problem",
//       },
//     ],
//   },
//   { timestamps: true }
// );

// const User  = mongoose.model("User", userSchema);
// exports.User;

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    displayName: {
      type: String,
      required: true,
    },

    password: { type: Buffer, required: true },
    resetPasswordToken: { type: String, default: "" },
    salt: Buffer,
    role: { type: String, required: true, default: "user" },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    lastOrderId: String,
    lastPlan: String,
    plan: {
      type: String,
      enum: ["free", "pro", "premium"],
      default: "free",
    },
    planExpiry: Date,
    paymentHistory: [
      {
        plan: String,
        amount: Number,
        status: String,
        transactionId: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],

    bio: {
      type: String,
      default: "Full Stack Engineer • AI Enthusiast",
    },

    location: {
      type: String,
      default: "Odisha",
    },

    skills: {
      type: [String],
      default: [""],
    },

    socialLinks: {
      github: { type: String, default: "https://github.com/" },
      linkedin: { type: String, default: "https://linkedin.com/in/" },
      twitter: { type: String, default: "https://twitter.com/" },
    },

    likedProblems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Problem",
      },
    ],
    dislikedProblems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Problem",
      },
    ],
    starredProblems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Problem",
      },
    ],

    imageUrl: {
      type: String,
    },

    publicId: {
      type: String,
    },

    solvedProblems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Problem",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

// ✅ Export properly
module.exports = User;
