const mongoose = require("mongoose");

const problemTableSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      index: true, // filtering ke liye useful
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
      index: true,
    },

    likes: {
      type: Number,
      default: 0,
      min: 0,
    },

    dislikes: {
      type: Number,
      default: 0,
      min: 0,
    },

    
 problemToSend: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Problem",
    required: true,
  }
],

    videoId: {
      type: String,
    },

    link: {
      type: String,
    },
  },
  { timestamps: true }
);

const ProblemTable = mongoose.model("ProblemTable", problemTableSchema);

module.exports = ProblemTable;
