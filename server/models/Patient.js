const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Patient name is required"],
      maxlength: [50, "Name cannot exceed 50 characters"],
      trim: true,
    },
    age: {
      type: Number,
      min: [0, "Age cannot be negative"],
      max: [120, "Age cannot exceed 120"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      trim: true,
    },
    contact: {
      type: String,
      required: [true, "Contact number is required"],
      match: [/^\d{11}$/, "Contact must be exactly 11 digits"],
      trim: true,
    },
    medicalHistory: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields automatically
  }
);

const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;
