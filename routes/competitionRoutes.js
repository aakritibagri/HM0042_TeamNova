const express = require("express");
const Competition = require("../models/Competition");

const router = express.Router();

// ✅ Add a new competition
router.post("/", async (req, res) => {
  try {
    const { name, start_date, end_date, description, prize } = req.body;

    // Validate request body
    if (!name || !start_date || !end_date || !description || !prize) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const competition = new Competition({ name, start_date, end_date, description, prize });
    await competition.save();

    res.status(201).json({ message: "Competition added successfully", competition });
  } catch (error) {
    console.error("Error adding competition:", error);
    res.status(500).json({ error: "Error adding competition" });
  }
});

// ✅ Get all competitions
router.get("/", async (req, res) => {
  try {
    const competitions = await Competition.find();
    res.json(competitions);
  } catch (error) {
    console.error("Error fetching competitions:", error);
    res.status(500).json({ error: "Error fetching competitions" });
  }
});

module.exports = router;
