const express = require("express");
const router = express.Router();
const Registration = require("../models/Registration");
// Import the model

// POST Route to register a participant
router.post("/register", async (req, res) => {
    try {
        const { name, email, college, competitionId } = req.body;

        // Validate competitionId is a valid ObjectId
        if (!competitionId || !competitionId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: "Invalid competition ID format." });
        }

        // Check if the participant is already registered
        const existingRegistration = await Registration.findOne({ email, competition: competitionId });
        if (existingRegistration) {
            return res.status(400).json({ message: "You are already registered for this event." });
        }

        // Save new registration
        const newRegistration = new Registration({
            name,
            email,
            college,
            competition: competitionId
        });

        await newRegistration.save();

        res.status(201).json({ message: "Registration successful!", registration: newRegistration });
    } catch (error) {
        console.error("❌ Registration Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
