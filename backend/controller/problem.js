const Problem = require("../model/problems");

exports.getProblems = async (req, res) => {
  try {
    const problem1 = await Problem.find().populate("examples");
    console.log(problem1);
    res.json(problem1);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get single Problem by ID
exports.getProblemById = async (req, res) => {
  try {
    const problem = await Problem.findOne({ id: req.params.id }).populate(
      "examples"
    );
    if (!problem) return res.status(404).json({ error: "Problem not found" });
    res.json(problem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
