const mongoose = require("mongoose");

const savedRemedySchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    remedy: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SavedRemedy", savedRemedySchema);
