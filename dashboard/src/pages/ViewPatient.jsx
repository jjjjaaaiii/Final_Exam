import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, Modal,
  Box, TextField, Select, MenuItem, InputLabel,
  FormControl, Typography
} from "@mui/material";
import Sidebar from "./Sidebar";
import "./Sidebar.css";
import "./ViewPatient.css";

const baseUrl = import.meta.env.VITE_API_BASE;

function ViewPatient() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [fetchError, setFetchError] = useState(null);
const baseUrl = import.meta.env.VITE_API_BASE;

function fetchPatients() {
  fetch(`${baseUrl}/viewpatients`)
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      return res.json(); // <-- ensures valid JSON
    })
    .then(setPatients)
    .catch(err => {
      console.error("Error fetching patients:", err);
      setFetchError(`Failed to fetch: ${err.message}`);
    });
}

  const handleEditClick = (patient) => {
    setSelectedPatient(patient);
    setModalOpen(true);
  };

  const handleDeletePatient = (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      fetch(`${baseUrl}/deletepatient/${id}`, { method: "DELETE" })
        .then((res) => res.json())
        .then(() => {
          alert("Patient deleted successfully!");
          setPatients((prev) => prev.filter((p) => p._id !== id));
        })
        .catch((err) => {
          console.error("Error deleting patient:", err);
          alert("Failed to delete patient.");
        });
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPatient(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedPatient((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdatePatient = () => {
    fetch(`${baseUrl}/updatepatientmongo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedPatient),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Patient updated successfully!");
        setModalOpen(false);
        setSelectedPatient(null);
        fetchPatients(); // Refresh list
      })
      .catch((err) => {
        console.error("Error updating patient:", err);
        alert("Failed to update patient.");
      });
  };

  return (
    <div className="patient-container">
      <Sidebar />
      <div className="patient-content">
        <Typography className="patient-header" variant="h4" gutterBottom>
          Patient List
        </Typography>

        <TableContainer component={Paper} className="patient-table-container">
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Patient Name</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Contact Number</TableCell>
                <TableCell>Medical History</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.length > 0 ? (
                patients.map((patient) => (
                  <TableRow key={patient._id}>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.age}</TableCell>
                    <TableCell>{patient.gender}</TableCell>
                    <TableCell>{patient.contact}</TableCell>
                    <TableCell>{patient.medicalHistory}</TableCell>
                    <TableCell align="center">
                      <Button variant="outlined" size="small" onClick={() => handleEditClick(patient)}>
                        Edit
                      </Button>
                      <Button variant="outlined" size="small" color="error" onClick={() => handleDeletePatient(patient._id)} sx={{ ml: 1 }}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No patients found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Modal open={modalOpen} onClose={handleCloseModal}>
          <Box className="edit-modal">
            <Typography variant="h6">Edit Patient</Typography>
            <TextField fullWidth margin="normal" label="Patient Name" name="name" value={selectedPatient?.name || ""} onChange={handleInputChange} />
            <TextField fullWidth margin="normal" label="Age" name="age" type="number" value={selectedPatient?.age || ""} onChange={handleInputChange} />
            <FormControl fullWidth margin="normal">
              <InputLabel>Gender</InputLabel>
              <Select name="gender" value={selectedPatient?.gender || ""} onChange={handleInputChange}>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
            <TextField fullWidth margin="normal" label="Contact Information" name="contact" value={selectedPatient?.contact || ""} onChange={handleInputChange} />
            <TextField fullWidth margin="normal" label="Medical History" name="medicalHistory" value={selectedPatient?.medicalHistory || ""} onChange={handleInputChange} multiline rows={3} />
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button onClick={handleUpdatePatient} variant="contained">Update</Button>
            </Box>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default ViewPatient;
