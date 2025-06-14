import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddPatient from "./components/AddPatient";
import PatientList from "./components/PatientList";
import EditPatient from "./components/EditPatient";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PatientList />} />
        <Route path="/add" element={<AddPatient />} />
        <Route path="/edit/:id" element={<EditPatient />} />
      </Routes>
    </Router>
  );
}
