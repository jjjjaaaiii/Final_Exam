const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    patientname: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      min: 0,
      max: 120,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
    },
    contactinformation: {
      type: Number,
      required: true,
      trim: true,
    },
    medicalhistory: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { collection: "patients" }
);

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
