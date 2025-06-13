import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, Modal, Box, Typography, Paper, TextField, FormControl,
  InputLabel, Select, MenuItem
} from "@mui/material";
import Sidebar from "./Sidebar";
import "./ViewPatient.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
  width: "25%",
};

function ViewPatient() {
  const [patients, setPatients] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [refreshData, setRefreshData] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:1337/viewpatients")
      .then((response) => setPatients(response.data))
      .catch((error) => console.error("Error fetching patients:", error));
  }, [refreshData]);

  const handleClose = () => setOpen(false);

const handleEditPatient = (patient) => {
  console.log("Editing patient:", patient);
  setSelectedPatient(patient);
  setOpen(true);
};

const handleChange = (e) => {
  const key = e.target.id || e.target.name;
  const value = e.target.value;

  if (key === "age" && (isNaN(value) || value <= 0 || value > 120)) return;
  if (key === "patientname" && value && !/^[A-Za-z .-]+$/.test(value)) return;
  if (key === "contactinformation" && (!/^\d*$/.test(value) || value.length > 15)) return;
  if (key === "medicalhistory" && value.length > 500) return;

  setSelectedPatient((prev) => ({
    ...prev,
    [key]: value,
  }));
};
const handleUpdatePatient = async () => {
  try {
    const response = await fetch("http://localhost:1337/updatepatientmongo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedPatient), // ✅ make sure this contains _id
    });

    const result = await response.json();

    if (result.success) {
      setRefreshData(!refreshData);
      handleClose();
      alert(result.message);
    } else {
      alert("Failed to update patient. Please try again.");
    }
  } catch (error) {
    console.error("Error updating patient:", error);
    alert("An error occurred. Please try again.");
  }
};


  const handleDeletePatient = async (patient) => {
    if (!window.confirm(`Are you sure you want to delete ${patient.patientname}?`)) return;

    try {
      const response = await fetch(`http://localhost:1337/deletepatient`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: patient._id }),
      });

      const result = await response.json();

      if (result.success) {
        alert(result.message);
        setRefreshData(!refreshData);
      } else {
        alert("Failed to delete patient. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting patient:", error);
      alert("An error occurred while deleting the patient.");
    }
  };

  return (
    <div className="view-patient" style={{ display: "flex" }}>
      <Sidebar />
      <div className="content" style={{ marginLeft: "220px", padding: "20px", width: "100%" }}>
        <Typography variant="h4" gutterBottom>View Patients</Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Patient Name</strong></TableCell>
                <TableCell><strong>Age</strong></TableCell>
                <TableCell><strong>Gender</strong></TableCell>
                <TableCell><strong>Contact Info</strong></TableCell>
                <TableCell><strong>Medical History</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient._id}>
                  <TableCell>{patient.patientname}</TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>{patient.gender}</TableCell>
                  <TableCell>{patient.contactinformation}</TableCell>
                  <TableCell>{patient.medicalhistory}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => handleEditPatient(patient)}
                      style={{ marginRight: "8px" }}
                    >
                      EDIT
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeletePatient(patient)}
                    >
                      DELETE
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            {selectedPatient && (
              <>
                <Typography variant="h6">Edit Patient Information</Typography>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdatePatient();
                  }}
                >
                <TextField
  required
  id="patientname"
  name="patientname"
  label="Patient Name"
  fullWidth
  variant="outlined"
  value={selectedPatient?.patientname || ""}
  onChange={handleChange}
  inputProps={{
    pattern: "^[A-Za-z .-]+$",
    maxLength: 50,
  }}
  margin="dense"
/>

                  <TextField
                    required
                    id="age"
                    label="Age"
                    type="number"
                    fullWidth
                    variant="outlined"
                    value={selectedPatient.age || ""}
                    onChange={handleChange}
                    inputProps={{ min: 0, max: 120 }}
                    margin="dense"
                  />

                  <FormControl fullWidth margin="dense">
                    <InputLabel id="gender-label">Gender</InputLabel>
                    <Select
                      labelId="gender-label"
                      id="gender"
                      value={selectedPatient.gender || ""}
                      onChange={(e) => setSelectedPatient({
                        ...selectedPatient,
                        gender: e.target.value,
                      })}
                      label="Gender"
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
  required
  id="contactinformation"
  name="contactinformation"
  label="Contact Info"
  fullWidth
  variant="outlined"
  value={selectedPatient?.contactinformation || ""}
  onChange={handleChange}
  inputProps={{
    inputMode: "numeric",
    pattern: "[0-9]*",
    minLength: 10,
    maxLength: 15,
  }}
  helperText="Enter 10 to 15 digit contact number"
  margin="dense"
/>
                  <TextField
                    id="medicalhistory"
                    label="Medical History"
                    fullWidth
                    multiline
                    rows={3}
                    variant="outlined"
                    value={selectedPatient.medicalhistory || ""}
                    onChange={handleChange}
                    inputProps={{ maxLength: 500 }}
                    margin="dense"
                  />

                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px" }}>
                    <Button variant="contained" onClick={handleClose}>Close</Button>
                    <Button variant="contained" type="submit">UPDATE PATIENT</Button>
                  </div>
                </form>
              </>
            )}
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default ViewPatient;
