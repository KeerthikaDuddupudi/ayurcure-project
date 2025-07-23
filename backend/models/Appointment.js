const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number },
    gender: { type: String },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: Date, required: true },
    concern: { type: String },
    
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "rejected"],
      default: "pending",
    },
    timeOfDay: {
      type: String,
      enum: ["Morning", "Afternoon", "Evening", "Night"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
