const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, required: true }, // Example: "Developer", "Designer"
        skills: { type: [String], default: [] }, // Array of skills
        location: { type: String, required: true },
        experienceLevel: { type: String } // Example: "Beginner", "Intermediate", "Expert"
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
