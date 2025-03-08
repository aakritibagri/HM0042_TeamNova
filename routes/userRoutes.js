const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Register User (No Password Hashing)
router.post("/register", async (req, res) => {
    try {
        console.log("Received Data:", req.body); // Debugging

        const { name, email, password, role, skills, location, experienceLevel } = req.body;

        // ✅ Check for required fields
        if (!name || !email || !password || !role || !location) {
            return res.status(400).json({ error: "Name, email, password, role, and location are required" });
        }

        // ✅ Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // ✅ Create new user
        const newUser = new User({
            name,
            email,
            password, // ⚠️ Password should be hashed before saving (not included here)
            role,
            skills: skills || [], // Default to empty array if not provided
            location,
            experienceLevel: experienceLevel || "Beginner" // Default to "Beginner" if not provided
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error("❌ Registration error:", error);
        res.status(500).json({ error: "Server Error", details: error.message });
    }
});

// ✅ Get All Users (Test Endpoint)
router.get("/", async (req, res) => {
    try {
        const users = await User.find().select("-password"); // Exclude passwords

        if (users.length === 0) {
            return res.status(404).json({ message: "No registered users found" });
        }

        res.status(200).json({ message: "Registered users retrieved successfully", users });
    } catch (error) {
        console.error("❌ Fetch users error:", error);
        res.status(500).json({ error: "Server Error", details: error.message });
    }
})

router.get("/form-teams", async (req, res) => {
    try {
        const users = await User.find().select("-password");

        if (users.length < 3) {
            return res.status(400).json({ message: "Not enough users to form teams" });
        }

        // ✅ Shuffle users to randomize team formation
        users.sort(() => Math.random() - 0.5);

        let teams = [];
        let teamSize = 3;
        let currentTeam = [];

        for (let user of users) {
            currentTeam.push(user);
            if (currentTeam.length === teamSize) {
                teams.push([...currentTeam]); // Push a copy of the team
                currentTeam = [];
            }
        }

        // ✅ Handle remaining users (if not divisible by 3)
        if (currentTeam.length > 0) {
            teams[teams.length - 1].push(...currentTeam);
        }

        res.status(200).json({ message: "Teams formed successfully", teams });
    } catch (error) {
        console.error("❌ Team formation error:", error);
        res.status(500).json({ error: "Server Error", details: error.message });
    }
});

router.delete("/delete-by-email/:email", async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ email: req.params.email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: `User with email ${req.params.email} deleted successfully` });
    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ error: "Server Error" });
    }
});

module.exports = router;
