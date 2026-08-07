const mongoose = require("mongoose");

const summarySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fileName: {
      type: String,
      required: true,
    },

    summary: {
      type: String,
      required: true,
    },

    mode: {
      type: String,
      enum: [
        "summary",
        "exam",
        "viva",
        "mcq",
        "flashcards",
      ],
      default: "summary",
    },

    wordCount: {
      type: Number,
      default: 0,
    },

    readingTime: {
      type: Number,
      default: 0,
    },

    bookmarked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Summary", summarySchema);