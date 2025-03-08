const express = require("express");
const router = express.Router();
const Competition = require("../models/Competition");

// Create a new competition
router.post("/add", async (req, res) => {
    try {
        const {
            title,
            eventType,
            startDate,
            endDate,
            startTime,
            endTime,
            location,
            description,
            category,
            teamSize,
            eligibilityCriteria,
            requirements,
            organizer
        } = req.body;

        const newCompetition = new Competition({
            title,
            eventType,
            startDate,
            endDate,
            startTime,
            endTime,
            location,
            description,
            category,
            teamSize,
            eligibilityCriteria,
            requirements,
            organizer
        });

        await newCompetition.save();
        res.status(201).json({ message: "Competition created successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error creating competition" });
    }
});

// Create a new competition
router.post("/", async (req, res) => {
  try {
      const newCompetition = new Competition(req.body);
      await newCompetition.save();
      res.status(201).json({ message: "Competition created successfully!", competition: newCompetition });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Get all competitions
router.get("/", async (req, res) => {
    try {
        const competitions = await Competition.find().populate("organizer", "name email");
        res.status(200).json(competitions);
    } catch (error) {
        res.status(500).json({ error: "Error fetching competitions" });
    }
});

// Get a single competition by ID
router.get("/:id", async (req, res) => {
  try {
      const competition = await Competition.findById(req.params.id);
      if (!competition) return res.status(404).json({ message: "Competition not found" });
      res.status(200).json(competition);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Route to fetch all upcoming hackathons
router.get("/hackathons/upcoming", async (req, res) => {
  try {
      const currentDate = new Date(); // Get today's date
      const hackathons = await Competition.find({ 
          eventType: "hackathon",
          endDate: { $gte: currentDate }  // Get only future hackathons
      });

      res.json(hackathons);  // Send hackathons as JSON response
  } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a competition by ID
router.patch("/:id", async (req, res) => {
  try {
      if (!req.body || Object.keys(req.body).length === 0) {
          return res.status(400).json({ message: "Request body is empty. Please provide data to update." });
      }

      const updatedCompetition = await Competition.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true, runValidators: true }
      );

      if (!updatedCompetition) {
          return res.status(404).json({ message: "Competition not found" });
      }

      res.json({ message: "Competition updated successfully", updatedCompetition });
  } catch (error) {
      console.error("Error updating competition:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});


module.exports = router;
