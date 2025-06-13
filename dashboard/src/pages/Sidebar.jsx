import React from 'react';
import { Link } from 'react-router-dom';
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="conSidebar"> 
        {/* <Link to="/">
          <div className="item">
            <p>Home</p>
          </div>
        </Link> */}

        <Link to="/addpatient">
          <div className="item">
            <p>Add Patient</p>
          </div>
        </Link>

        <Link to="/viewpatient">
          <div className="item">
            <p>View Patients</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
