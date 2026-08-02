const express = require("express");
const multer = require("multer");
const extractPdfText = require("../utils/pdfExtractor");
const summarize = require("../utils/groqSummary");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("file"), async (req, res) => {
  console.log("Upload route hit!");
  console.log(req.file);

  try {
    const text = await extractPdfText(req.file.path);

    // Get study mode from frontend
    const mode = req.body.mode || "summary";

    // Split the PDF into chunks
    const chunkSize = 3000;
    const chunks = [];

    for (let i = 0; i < text.length; i += chunkSize) {
      chunks.push(text.substring(i, i + chunkSize));
    }

    let finalSummary = "";

    // Summarize each chunk
    for (let i = 0; i < chunks.length; i++) {

  console.log(`Summarizing Part ${i + 1} of ${chunks.length}`);

  const partSummary = await summarize(chunks[i], mode);

  finalSummary += `\n\n========== Part ${i + 1} ==========\n\n`;
  finalSummary += partSummary;

  // Wait 15 seconds before processing the next chunk
  if (i < chunks.length - 1) {
    console.log("Waiting 15 seconds...");
    await new Promise(resolve => setTimeout(resolve, 15000));
  }

}

    res.json({
      message: "Summary Generated",
      summary: finalSummary,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;