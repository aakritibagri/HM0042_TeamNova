const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  competition: { type: mongoose.Schema.Types.ObjectId, ref: "Competition", required: true },
  fileUrl: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Submission", submissionSchema);
