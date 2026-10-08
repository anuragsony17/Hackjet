const ProblemTable = require("../../model/prolemTable");

/* ================= CREATE ================= */
exports.createProblemTable = async (req, res) => {
  try {
    const problem = await ProblemTable.create(req.body);
    res.status(201).json({
      success: true,
      data: problem,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }


};

/* ================= READ ALL ================= */
exports.getAllProblemTables = async (req, res) => {
  try {
    const problems = await ProblemTable.find()
      .populate("problemToSend")
      .sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      count: problems.length,
      data: problems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= READ ONE ================= */
exports.getProblemTableById = async (req, res) => {
  try {
    const problem = await ProblemTable.findById(req.params.id).populate({
      path: "problemToSend",
      populate: {
        path: "examples", // 👈 nested populate
        model: "Example",
      },
    });

    console.log("Fetched problem:", problem);

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    res.status(200).json({
      success: true,
      data: problem,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= UPDATE ================= */
exports.updateProblemTable = async (req, res) => {
  try {
    const updated = await ProblemTable.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};





/* ================= DELETE ================= */
exports.deleteProblemTable = async (req, res) => {
  try {
    const deleted = await ProblemTable.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Problem deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};



exports.getProblemIds = async (req, res) => {
  try {
    // Fetch all problems, sorted by creation date
    const problems = await ProblemTable.find({}, "_id").sort({ createdAt: 1 });
    const ids = problems.map((p) => p._id.toString());
    res.json(ids);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}