const mongoose = require("mongoose");

const ProblemSchema = new mongoose.Schema(
  {
    // Custom numeric id (1, 2, 3...)
    id: {
      type: Number,
      required: true,
      unique: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    problemStatement: {
      type: String, // HTML / JSX string
      required: true,
    },

    examples: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Example",
        required: true,
      },
    ],

    constraints: {
      type: String, // HTML string
    },

    handlerFunction: {
      type: String, // JS function as string
      required: true,
    },

    starterCode: {
      type: String,
      required: true,
    },

    order: {
      type: Number,
      required: true,
      unique: true,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Problem = mongoose.model("Problem", ProblemSchema);
module.exports = Problem;
