const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const Patient = require("./models/Patient"); // Assuming you have a Patient model defined in models/Patient.js
const app = express();


const bodyParser = require("body-parser");
// Middleware
app.use(cors());
app.use(express.json());
const port =1337;

app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.get("/viewPatients", (req, res) => {
    try {
        const patientData = JSON.parse(fs.readFileSync("patients.json"));
        res.json(patientData);
    } catch (error) {
        console.error("Error reading patient data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.post("/addPatient", (req, res) => {
    const patientData = req.body;

    // Read existing data from patients.json if it exists
    let existingPatients = [];
    try {
        existingPatients = JSON.parse(fs.readFileSync("patients.json"));
    } catch (error) {
        console.log("didn't find old data.");
    }

    // Add the new patient to the array
    existingPatients.push(patientData);

    // Save updated array back to the file
    try {
        fs.writeFileSync("patients.json", JSON.stringify(existingPatients, null, 2));
        res.json({ success: true, message: "Patient added successfully." });
    } catch (err) {
        console.error("Error writing to patients.json:", err);
        res.status(500).json({ success: false, message: "Failed to save patient data." });
    }
});
// Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.post("/updatepatient", async (req, res) => {
    const patientData = req.body;

    // Read existing data from the file (if any)
    let existingData = [];
    try {
        existingData = JSON.parse(fs.readFileSync("patients.json"));
    } catch (error) {
        // Handle file reading errors here, e.g., log the error
    }

    // Find the index of the student with the given ID
    const patientIndex = existingData.findIndex(
        (patient) => patient.id === patientData.id
    );

    if (patientIndex !== -1) {
        // Update the existing patient's data
        existingData[patientIndex] = patientData;

        // Write the updated data back to the file
        fs.writeFileSync("patient.json", JSON.stringify(existingData, null, 2));

        res.json({ success: true, message: "Patient Updated Successfully!" });
    } else {
        // Patient with the given ID not found
        res.json({ success: false, message: "Patient Not Found" });
    }
});
app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
app.delete("/deletepatient", async (req, res) => {
  try {
    await PatientModel.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Patient deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error deleting patient." });
  }
});

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/patientdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
 .then(() => console.log("Database connected successfully"))
    .catch((err) => console.error("Database connection error", err));

app.get("/viewpatients", async (req, res) => {
    try{ 
        const patients = await Patient.find({});
        res.json(patients);
    } catch (error) {
        console.error("Error reading patient data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.post("/addPatientmongo", async (req, res) => {
    const {incomingData} = req.body;
    try {
        const newPatient = new Patient(incomingData);
        await newPatient.save();
        res.status(201).json({ message: "Patient added successfully!" });
    } catch (error) {
        console.error("Error adding patient:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.get("/viewpatientsmongo", async (req, res) => {
    try {
        const patients = await Patient.find({});
        res.json(patients);
    } catch (error) {
        console.error("Error reading patient data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.post("/updatepatientmongo", async (req, res) => {
    const incomingData = req.body;

    try {
        const patient = await Patient.findById(incomingData._id);
        if (!patient) {
            return res.status(404).json({ success: false, message: "Patient not found" });
        }

        Object.assign(patient, incomingData);
        await patient.save();
        res.json({ success: true, message: "Patient updated successfully!" });
    } catch (error) {
        console.error("Error updating patient:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

