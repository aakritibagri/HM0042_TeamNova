const mongoose = require("mongoose");

const competitionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    eventType: { type: String, required: true, enum: ["hackathon", "coding-contest", "workshop"] },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String },
    teamSize: { type: Number },
    eligibilityCriteria: { type: String },
    requirements: { type: [String] }, // List of selected requirements
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to host
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Competition", competitionSchema);
