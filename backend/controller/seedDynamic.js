const fs = require("fs");
const path = require("path");
const Problem = require("../model/problems");
const Example = require("../model/examples");

exports.seedDynamicProblem = async (req, res) => {
  try {
    const problemName = req.query.name; // e.g. twoSum

    if (!problemName) {
      return res.status(400).json({
        error:
          "Please provide a problem name, e.g. /api/problems/seed?name=twoSum",
      });
    }

    const basePath = path.resolve("controller/problemData", problemName);

    if (!fs.existsSync(basePath)) {
      return res.status(404).json({
        error: `No folder found for problem '${problemName}'`,
      });
    }

    // ✅ STEP 1: Dynamic import
    const { default: problems } = await import(
      `./problemData/${problemName}/${problemName}Prob.js`
    );
    const { default: examples } = await import(
      `./problemData/${problemName}/${problemName}Examp.js`
    );

    const problemId = problems[0].id;

    // ✅ STEP 2: Clean old problem + old examples
    await Problem.deleteMany({ id: problemId });
    await Example.deleteMany({ problemId });

    // ✅ STEP 3: Attach problemId to each example
    const examplesWithProblemId = examples.map((ex) => ({
      ...ex,
      problemId,
    }));

    // ✅ STEP 4: Insert Examples
    const savedExamples = await Example.insertMany(examplesWithProblemId);

    // ✅ STEP 5: Extract ObjectIds to link in problem
    const exampleIds = savedExamples.map((ex) => ex._id);

    // ✅ STEP 6: Insert Problem with exampleIds
    problems[0].examples = exampleIds;

    const savedProblems = await Problem.insertMany(problems);

    res.status(201).json({
      message: `✅ Problem '${problemName}' inserted successfully!`,
      problem: savedProblems,
      examples: savedExamples,
    });
  } catch (error) {
    console.error("❌ Error in seeding problem:", error.message);
    res.status(500).json({ error: error.message });
  }

 
};
