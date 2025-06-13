import React, { useState } from "react";
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import Sidebar from "./Sidebar";
import "./AddPatient.css";

function AddPatient() {
    const [patient, setPatient] = useState({
        name: "",
        age: "",
        gender: "",
        contact: "",
        medicalHistory: "",
    });


async function handleAddPatient(e) {
    try {
        const res = await fetch("http://localhost:1337/addPatient", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(patient),
        });

    const result = await res.json();
    alert(result.message);
        if (result.success) {
            // Reset the form after successful submission
            setPatient({
                patientname: "",
                age: "",
                gender: "",
                contact: "",
                medicalHistory: "",
            });
        }
    } catch (error) {
        console.error("Error adding patient:", error);
        alert("Error: " + (error.message || "Unknown error occurred"));
    }
};

const handleChange = (e) => {
  const { id, value, name } = e.target;

  // Allow only letters, spaces, dots, and hyphens for names
  if (id === "patientname" && value !== "" && !/^[A-Za-z .-]+$/.test(value)) {
    return;
  }

  // Age must be a valid number and within a reasonable range (0-120)
  if (id === "age") {
    const ageNum = Number(value);
    if (isNaN(ageNum) || ageNum < 0 || ageNum > 120) {
      return;
    }
  }

  // Allow only specific values for gender if needed (optional)
  if (id === "gender" && value !== "" && !/^[A-Za-z ]+$/.test(value)) {
    return;
  }

  // Optional: validate contact information to allow only numbers, +, -, spaces
  if (id === "contactinformation" && value !== "" && !/^[0-9+()\-\s]+$/.test(value)) {
    return;
  }

  setPatient({
    ...patient,
    [name]: value,
    [id]: value,
  });
};
    return (
        <div className="addpatient" style={{ display: "flex" }}>
            <Sidebar />
            <div className="content" style={{ marginLeft: "220px" }}>
                <h1>ADD PATIENT</h1>
                <form className="textbox" onSubmit={handleAddPatient}>
                    <TextField
                        required
                        id="name"
                        label="Patient Name"
                        variant="outlined"
                        value={patient.name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        required
                        id="age"
                        label="Age"
                        variant="outlined"
                        value={patient.age}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />

                    <FormControl required fullWidth margin="normal">
                        <InputLabel id="gender-label">Gender</InputLabel>
                        <Select
                            labelId="gender-label"
                            name="gender"
                            value={patient.gender}
                            onChange={handleChange}
                            label="Gender"
                        >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        required
                        id="contact"
                        type="text"
                        label="Contact Information"
                        variant="outlined"
                        value={patient.contact}
                        onChange={handleChange}
                        inputProps={{ maxLength: 11 }}
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        id="medicalHistory"
                        label="Medical History"
                        variant="outlined"
                        multiline
                        rows={4}
                        value={patient.medicalHistory}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        style={{ marginTop: "20px" }}
                    >
                        ADD PATIENT
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default AddPatient;
