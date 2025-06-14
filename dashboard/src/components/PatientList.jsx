import { useEffect, useState } from "react";
import {
  Table, TableRow, TableCell, TableHead, TableBody,
  Button, Container, Typography, Paper, Box
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function PatientList() {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  const fetchPatients = async () => {
  try {
    const res = await axios.get("http://localhost:1337/patients");
    setPatients(res.data);
  } catch (error) {
    console.error("Failed to fetch patients:", error);
  }
};


  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      try {
        await axios.delete(`http://localhost:1337/patients/${id}`);
        fetchPatients();
      } catch (error) {
        console.error("Failed to delete patient:", error);
      }
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">Patient List</Typography>
        <Button variant="contained" onClick={() => navigate("/add")} sx={{ textTransform: "none" }}>
          ➕ Add Patient
        </Button>
      </Box>

      <Paper elevation={3} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Age</strong></TableCell>
              <TableCell><strong>Gender</strong></TableCell>
              <TableCell><strong>Contact</strong></TableCell>
              <TableCell><strong>Medical History</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((p) => (
              <TableRow key={p._id} hover>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.age}</TableCell>
                <TableCell>{p.gender}</TableCell>
                <TableCell>{p.contact}</TableCell>
                <TableCell>{p.medicalHistory || "N/A"}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => navigate(`/edit/${p._id}`)}
                    size="small"
                    sx={{ mr: 1, textTransform: "none" }}
                  >
                    ✏️ Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(p._id)}
                    size="small"
                    sx={{ textTransform: "none" }}
                  >
                    🗑️ Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}