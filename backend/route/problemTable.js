const express = require("express");

const {
  createProblemTable,
  deleteProblemTable,
  getAllProblemTables,
  getProblemTableById,
  updateProblemTable,
  getProblemIds,
} = require("../controller/problemShow/problemShow.js");


const router = express.Router();

/* ================= CRUD ROUTES ================= */

// CREATE (Admin)
router.post("/", createProblemTable);

router.put("/:id", updateProblemTable);

// // DELETE (Admin)
router.delete("/:id", deleteProblemTable);

// READ ALL (Public / Listing)
router.get("/", getAllProblemTables);

// READ ONE (Single problem table entry)
router.get("/:id", getProblemTableById);  


router.get("/problems/ids", getProblemIds);

module.exports = router;
