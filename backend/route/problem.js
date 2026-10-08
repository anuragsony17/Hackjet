const express = require("express");
const { getProblems, getProblemById } = require("../controller/Problem");
const { seedDynamicProblem } = require("../controller/seedDynamic");

const router = express.Router();

router.post("/seed", seedDynamicProblem);
router.get("/problems", getProblems);
router.get("/problems/:id", getProblemById);

// ✅ Export the router directly
module.exports = router;
