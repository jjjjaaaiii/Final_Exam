const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");

// POST /patients
router.post("/", async (req, res) => {
    try {
        const newPatient = new Patient(req.body);
        await newPatient.save();
        res.status(201).json({ message: "Patient added successfully!" });
    } catch (err) {
        console.error("❌ Error saving patient:", err);
        res.status(500).json({ message: "Server error" });
    }
});
// backend/routes/patients.js or similar
router.get('/api/viewpatients', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch patients" });
  }
});


module.exports = router;
