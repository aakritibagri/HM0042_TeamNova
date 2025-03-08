require("dotenv").config();  // ✅ Load environment variables at the top
const mongoose = require('mongoose');
const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");
const User = require("./models/User");
const Competition = require("./models/Competition");

const competitionRoutes = require("./routes/competitionRoutes");
const registrationRoutes = require("./routes/registrationRoutes");
const userRoutes = require("./routes/userRoutes");
const submissionRoutes = require("./routes/submissionRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB (Only Once)
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

// ✅ API Routes
app.use("/api/users", userRoutes);
app.use("/api/competitions", competitionRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api", registrationRoutes);

// ✅ Root Route
app.get('/', (req, res) => {
    res.send("Backend is running...");
});

// ✅ Get Competition by ID
app.get("/api/competitions/:id", async (req, res) => {
    try {
        const competition = await Competition.findById(req.params.id);
        if (!competition) {
            return res.status(404).json({ message: "Competition not found" });
        }
        res.json(competition);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Signup Route (Without Password Hashing)
app.post("/api/signup", async (req, res) => {
    try {
        const { name, email, password, role, skills, location, experience } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Create new user with plain text password (⚠ Not recommended for production)
        const newUser = new User({
            name,
            email,
            password,  // ⚠ Password is stored as plain text
            role,
            skills, 
            location,
            experience
        });

        // Save user to DB
        await newUser.save();

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// ✅ Start the Server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
