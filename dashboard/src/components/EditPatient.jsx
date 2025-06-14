import { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Container,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPatient() {
  const [patient, setPatient] = useState({
    name: "",
    age: "",
    gender: "",
    contact: "",
    medicalHistory: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch patient data by ID
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await axios.get(`http://localhost:1337/patients`);
        const foundPatient = res.data.find((p) => p._id === id);
        if (foundPatient) setPatient(foundPatient);
        else alert("Patient not found.");
      } catch (error) {
        console.error("Error fetching patient:", error);
      }
    };
    fetchPatient();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  // Handle update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:1337/patients/${id}`, patient);
      navigate("/");
    } catch (error) {
      console.error("Error updating patient:", error);
      alert("Failed to update patient.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold" align="center">
          Edit Patient
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
          <FormControl fullWidth margin="normal">
            <InputLabel>Gender</InputLabel>
            <Select
              name="gender"
              value={patient.gender}
              onChange={handleChange}
              required
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
              💾 Save Changes
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}
