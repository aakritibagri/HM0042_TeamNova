const mongoose = require('mongoose');
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch(err => console.error("❌ MongoDB connection error:", err));

app.use(express.static(path.join(__dirname, "../frontend")));


app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/competitions", require("./routes/competitionRoutes"));
app.use("/api/submissions", require("./routes/submissionRoutes"));

app.get('/', (req, res) => {
  res.send("Backend is running...");
});

app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});


app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
