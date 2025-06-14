// server.js or routes/patient.js
const express = require("express");
const router = express.Router();
const Patient = require("./models/Patient"); // Adjust path if needed

router.post("/addPatient", async (req, res) => {
  try {
    const { name, age, gender, contact, medicalHistory } = req.body;

    const newPatient = new Patient({
      name,
      age,
      gender,
      contact,
      medicalHistory,
    });

    await newPatient.save();

    res.json({ success: true, message: "Patient added successfully" });
  } catch (error) {
    console.error("Error saving patient:", error);
    res.status(500).json({ success: false, message: "Failed to save patient" });
  }
});

module.exports = router;
