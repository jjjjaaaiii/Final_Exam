import React, { useEffect } from "react";
import './Dashboard.css';
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("user")) {
            navigate("/");
        }
    }, []);

    return (
        <div className="dashboard" style={{ display: 'flex' }}>
            <Sidebar />
            <div className="con" style={{ marginLeft: '220px' }}>
                <h1>Welcome</h1>
            </div>
        </div>
    );
}

export default Dashboard;
