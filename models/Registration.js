const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    college: { type: String, required: true },
    competition: { type: mongoose.Schema.Types.ObjectId, ref: "Competition", required: true },
    registeredAt: { type: Date, default: Date.now }
}, { collection: "registrations" });

module.exports = mongoose.model("Registration", registrationSchema);
