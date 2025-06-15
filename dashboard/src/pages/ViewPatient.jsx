import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar"; // adjust path if needed

const baseUrl = "http://localhost:1337";

export default function ViewPatient() {
  const [patients, setPatients] = useState([]);
  const [editingPatient, setEditingPatient] = useState(null);

  const fetchPatients = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/viewpatients`);
      const data = await res.json();
      setPatients(data);
    } catch (err) {
      console.error("Failed to fetch patients:", err);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleUpdatePatient = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/updatepatientmongo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingPatient),
      });

      if (!res.ok) throw new Error("Failed to update patient");

      setEditingPatient(null);
      fetchPatients();
    } catch (err) {
      console.error("Error updating patient:", err);
    }
  };

  const handleDeletePatient = async (id) => {
    try {
      const res = await fetch(`${baseUrl}/api/deletepatient/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete patient");

      fetchPatients();
    } catch (err) {
      console.error("Error deleting patient:", err);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar - fixed width */}
      <div style={{ width: "250px", borderRight: "1px solid #ccc" }}>
        <Sidebar />
      </div>

      {/* Main content fills the rest */}
      <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
        <h2>Patient List</h2>

        {patients.map((patient) => (
          <div
            key={patient._id}
            style={{
              border: "1px solid #ccc",
              margin: "10px 0",
              padding: "10px",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
            }}
          >
            {editingPatient && editingPatient._id === patient._id ? (
              <>
                <input
                  value={editingPatient.name}
                  onChange={(e) =>
                    setEditingPatient({ ...editingPatient, name: e.target.value })
                  }
                  placeholder="Name"
                />
                <input
                  value={editingPatient.age}
                  onChange={(e) =>
                    setEditingPatient({ ...editingPatient, age: e.target.value })
                  }
                  placeholder="Age"
                />
                <input
                  value={editingPatient.gender}
                  onChange={(e) =>
                    setEditingPatient({ ...editingPatient, gender: e.target.value })
                  }
                  placeholder="Gender"
                />
                <input
                  value={editingPatient.contactInfo}
                  onChange={(e) =>
                    setEditingPatient({ ...editingPatient, contactInfo: e.target.value })
                  }
                  placeholder="Contact Info"
                />
                <input
                  value={editingPatient.medicalHistory}
                  onChange={(e) =>
                    setEditingPatient({
                      ...editingPatient,
                      medicalHistory: e.target.value,
                    })
                  }
                  placeholder="Medical History"
                />
                <button onClick={handleUpdatePatient}>Save</button>
                <button onClick={() => setEditingPatient(null)}>Cancel</button>
              </>
            ) : (
              <>
                <p><strong>Name:</strong> {patient.name}</p>
                <p><strong>Age:</strong> {patient.age}</p>
                <p><strong>Gender:</strong> {patient.gender}</p>
                <p><strong>Contact:</strong> {patient.contactInfo}</p>
                <p><strong>History:</strong> {patient.medicalHistory}</p>
                <button onClick={() => setEditingPatient(patient)}>Edit</button>
                <button onClick={() => handleDeletePatient(patient._id)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
