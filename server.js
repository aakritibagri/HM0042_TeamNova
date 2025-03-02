const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path"); // Import path module
require("dotenv").config();

const app = express();

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request body

// ✅ Serve Static Files (Frontend)
app.use(express.static(path.join(__dirname, "../frontend"))); // Add this line

// ✅ Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/competitions", require("./routes/competitionRoutes"));
app.use("/api/submissions", require("./routes/submissionRoutes")); // Added submission routes

// ✅ Basic API Route to check server status
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
