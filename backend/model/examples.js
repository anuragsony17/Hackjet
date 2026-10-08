const mongoose = require("mongoose");

const ExampleSchema = new mongoose.Schema(
  {
    id: { type: Number },
    title: { type: String },
    inputText: { type: String, required: true },
    outputText: { type: String, required: true },
    explanation: { type: String },
    img: { type: String },
  },
  { timestamps: true }
);

const Example = mongoose.model("Example", ExampleSchema);

// ✅ Proper export
module.exports = Example;
