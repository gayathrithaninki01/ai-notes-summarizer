const express = require("express");

const {
  saveSummary,
  getAllSummaries,
  deleteSummary,
} = require("../controllers/summaryController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, saveSummary);

router.get("/", protect, getAllSummaries);

router.delete("/:id", protect, deleteSummary);

module.exports = router;