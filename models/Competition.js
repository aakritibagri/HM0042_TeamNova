const mongoose = require("mongoose");

const competitionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  description: { type: String },
  prize: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Competition", competitionSchema);
