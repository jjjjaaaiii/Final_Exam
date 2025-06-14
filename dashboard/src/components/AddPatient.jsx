import { useState } from "react";
import {
  Button, TextField, Select, MenuItem, FormControl, InputLabel,
  Container, Typography, Paper, Box
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddPatient() {
  const [patient, setPatient] = useState({
    name: "",
    age: "",
    gender: "",
    contact: "",
    medicalHistory: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

const handleSubmit = async e => {
  e.preventDefault();
  if (!patient.name || !patient.age || !patient.gender || !patient.contact) {
    return alert("Please fill in all required fields.");
  }

  try {
    await axios.post("http://localhost:1337/patients", patient);
    navigate("/");
  } catch (error) {
    console.error("Error adding patient:", error);
    alert("Failed to add patient.");
  }
};


  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
          Add New Patient
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            name="name"
            fullWidth
            required
            value={patient.name}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            label="Age"
            name="age"
            type="number"
            fullWidth
            required
            value={patient.age}
            onChange={handleChange}
            margin="normal"
          />
          <FormControl fullWidth required margin="normal">
            <InputLabel>Gender</InputLabel>
            <Select
              name="gender"
              value={patient.gender}
              onChange={handleChange}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Contact Number"
            name="contact"
            fullWidth
            required
            value={patient.contact}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            label="Medical History"
            name="medicalHistory"
            fullWidth
            multiline
            rows={4}
            value={patient.medicalHistory}
            onChange={handleChange}
            margin="normal"
          />
          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/")}
              sx={{ textTransform: "none" }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ textTransform: "none" }}
            >
              ➕ Add Patient
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}
