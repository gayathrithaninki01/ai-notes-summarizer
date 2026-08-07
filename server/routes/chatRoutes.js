const express = require("express");
const { chatWithNotes } = require("../controllers/chatController");

const router = express.Router();

// Chat with uploaded notes
router.post("/", chatWithNotes);

module.exports = router;