import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import AddPatient from "./pages/AddPatient";
import ViewPatient from "./pages/ViewPatient";
import Dashboard from "./pages/Dashboard"; // ✅ Required import
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/addpatient" element={<AddPatient />} />
        <Route path="/viewpatient" element={<ViewPatient />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
