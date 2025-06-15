const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/patientdb");

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  contactInfo: Number,
  medicalHistory: String,
});

const Patient = mongoose.model("Patient", patientSchema);

app.post("/api/patient", async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.json({ success: true, message: "Patient added successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to add patient" });
  }
});

app.get("/api/viewpatients", async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch {
    res.status(500).json({ error: "Failed to fetch patients" });
  }
});


app.post("/api/updatepatientmongo", async (req, res) => {
  try {
    const updated = await Patient.findByIdAndUpdate(req.body._id, req.body, { new: true });
    res.json({ success: true, message: "Updated", patient: updated });
  } catch {
    res.status(500).json({ success: false, message: "Update failed" });
  }
});

app.delete("/api/deletepatient/:id", async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted" });
  } catch {
    res.status(500).json({ success: false, message: "Deletion failed" });
  }
});

app.listen(1337, () => console.log("Server running on port 1337"));
