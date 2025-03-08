const Competition = require("../models/Competition");

const createCompetition = async (req, res) => {
  const { name, description, start_date, end_date, prize } = req.body;

  if (!name || !start_date || !end_date) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const competition = new Competition({ name, description, start_date, end_date, prize });
    await competition.save();
    res.status(201).json(competition);
  } catch (error) {
    console.error("Error creating competition:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getCompetitions = async (req, res) => {
  try {
    const competitions = await Competition.find();
    res.json(competitions);
  } catch (error) {
    console.error("Error fetching competitions:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { createCompetition, getCompetitions };
