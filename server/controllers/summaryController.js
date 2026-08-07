const Summary = require("../models/Summary");

// Save a summary
const saveSummary = async (req, res) => {
  try {
    console.log("User:", req.user);
    console.log("Body:", req.body);
console.log("Saving for user:", req.user);
    const { fileName, mode, summary } = req.body;

    const wordCount = summary.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);

 const newSummary = await Summary.create({
  user: req.user.id,
  fileName,
  mode,
  summary,
  wordCount,
  readingTime,
});

    res.status(201).json({
      message: "Summary Saved Successfully",
      summary: newSummary,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get all summaries
const getAllSummaries = async (req, res) => {
  try {
    console.log("Fetching for user:", req.user);
const summaries = await Summary.find({
  user: req.user.id,
}).sort({
  createdAt: -1,
});
    res.json(summaries);
  } catch (error) {
    res.status(500).json({
      message: error.message,
      
    });
  }
};

// Delete a summary
const deleteSummary = async (req, res) => {
  try {
    const summary = await Summary.findById(req.params.id);

    if (!summary) {
      return res.status(404).json({
        message: "Summary not found",
      });
    }

    if (summary.user.toString() !== req.user.id)  {
      return res.status(401).json({
        message: "Not Authorized",
      });
    }

    await Summary.findByIdAndDelete(req.params.id);

    res.json({
      message: "Summary deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  saveSummary,
  getAllSummaries,
  deleteSummary,
};