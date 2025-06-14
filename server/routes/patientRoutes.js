// routes/patientRoutes.js
import express from "express";
import Patient from "../models/Patient.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newPatient = new Patient(req.body);
    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
