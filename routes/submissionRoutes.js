const express = require("express");
const Submission = require("../models/Submission");

const router = express.Router();

// ✅ Add a new submission
router.post("/", async (req, res) => {
  try {
    const { user, competition, fileUrl } = req.body;

    if (!user || !competition || !fileUrl) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const submission = new Submission({ user, competition, fileUrl });
    await submission.save();

    res.status(201).json(submission);
  } catch (error) {
    console.error("Error adding submission:", error);
    res.status(500).json({ error: "Error adding submission" });
  }
});

// ✅ Get all submissions
router.get("/", async (req, res) => {
  try {
    const submissions = await Submission.find()
      .populate("user", "name email") // Populate user field (name & email only)
      .populate("competition", "title"); // Populate competition field (title only)

    res.json(submissions);
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({ error: "Error fetching submissions" });
  }
});

// ✅ Get a specific submission by ID
router.get("/:id", async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id)
      .populate("user", "name email")
      .populate("competition", "title");

    if (!submission) {
      return res.status(404).json({ error: "Submission not found" });
    }

    res.json(submission);
  } catch (error) {
    console.error("Error fetching submission:", error);
    res.status(500).json({ error: "Error fetching submission" });
  }
});

module.exports = router;
