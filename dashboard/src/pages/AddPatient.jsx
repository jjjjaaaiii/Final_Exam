import React, { useState } from "react";
import {
  Button, FormControl, InputLabel, MenuItem, Select, TextField,
} from "@mui/material";
import Sidebar from "./Sidebar";
import "./AddPatient.css";

const baseUrl = import.meta.env.VITE_API_BASE;

function AddPatient() {
  const [patient, setPatient] = useState({
    name: "",
    age: "",
    gender: "",
    contact: "",
    medicalHistory: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name" && value && !/^[A-Za-z .-]+$/.test(value)) return;
    if (name === "age") {
      const ageNum = Number(value);
      if (isNaN(ageNum) || ageNum < 0 || ageNum > 120) return;
    }
    if (name === "gender" && value && !/^[A-Za-z ]+$/.test(value)) return;
    if (name === "contact" && value && !/^[0-9+()\-\s]+$/.test(value)) return;

    setPatient({ ...patient, [name]: value });
  };

  const handleAddPatient = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch(`${baseUrl}/patients`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(patient),
});


    // ✅ Check if response has body
    const text = await res.text();
    const result = text ? JSON.parse(text) : {};

    if (res.ok) {
      alert(result.message || "Patient added successfully!");
      setPatient({
        name: "", age: "", gender: "", contact: "", medicalHistory: "",
      });
    } else {
      
    }
  } catch (error) {
    console.error("Error adding patient:", error);
    alert("Error: " + (error.message || "Unknown error occurred"));
  }
};


  return (
    <div className="addpatient" style={{ display: "flex" }}>
      <Sidebar />
      <div className="content" style={{ marginLeft: "220px" }}>
        <h1>ADD PATIENT</h1>
        <form className="textbox" onSubmit={handleAddPatient}>
          <TextField 
          required name="name" 
          label="Patient Name" 
          value={patient.name} 
          onChange={handleChange} 
          fullWidth margin="normal" />
          <TextField 
          required name="age" 
          label="Age" 
          value={patient.age} 
          onChange={handleChange} 
          fullWidth margin="normal" />
          <FormControl required fullWidth margin="normal">
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select labelId="gender-label" name="gender" value={patient.gender} onChange={handleChange} label="Gender">
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField required name="contact" label="Contact Information" value={patient.contact} onChange={handleChange} inputProps={{ maxLength: 11 }} fullWidth margin="normal" />
          <TextField name="medicalHistory" label="Medical History" value={patient.medicalHistory} onChange={handleChange} multiline rows={4} fullWidth margin="normal" />
          <Button variant="contained" color="primary" type="submit" style={{ marginTop: "20px" }}>
            ADD PATIENT
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddPatient;
