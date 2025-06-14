import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const PORT = 1337;
app.use("/patients", patientRoutes); 

app.use(cors());
app.use(express.json());

// Mongoose Patient schema and model
const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  contact: String,
  medicalHistory: String,
});
const Patient = mongoose.model("Patient", patientSchema);

// POST /patients route
app.post("/patients", async (req, res) => {
  try {
    const newPatient = new Patient(req.body);
    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

mongoose
  .connect("mongodb://127.0.0.1:27017/patientDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
