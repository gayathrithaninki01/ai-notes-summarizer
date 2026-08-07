const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const chatRoutes = require("./routes/chatRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const authRoutes = require("./routes/authRoutes");
const summaryRoutes = require("./routes/summaryRoutes");

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("AI Notes Summarizer Backend is Running 🚀");
});

// Routes
app.use("/upload", uploadRoutes);
app.use("/auth", authRoutes);
app.use("/summary", summaryRoutes);
app.use("/chat", chatRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
console.log(`🚀 Server running on http://localhost:${PORT}`);
});