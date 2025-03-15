import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi"; // Import logout icon
import "../App.css"; // Import CSS file
import "../Footer.css";
import Footer from "../Footer";
import Navbar from "./Navbar";

const StudentDashboard = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const navigate = useNavigate();

  // Function to mark attendance
  const markAttendance = () => {
    let today = new Date().toISOString().split("T")[0];
    let subjects = ["Math", "Science", "English", "History"];
    let randomSubject = subjects[Math.floor(Math.random() * subjects.length)];
    let status = "Present";

    let newRecord = {
      date: today,
      subject: randomSubject,
      className: "10-A",
      section: "A",
      status: status,
    };

    setAttendanceRecords([...attendanceRecords, newRecord]);
    alert("Attendance Marked Successfully!");
  };

  // Logout function
  const logout = () => {
    alert("You have been logged out!");
    navigate("/login");
  };

  return (

    <div>
      <header className="navbar">
        <nav>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/profile">Profile</Link></li>
             {/* Logout Icon on Leftmost Side */}
             <li className="logout-icon" onClick={logout}>
              <FiLogOut size={24} color="#ff4d4d" style={{ cursor: "pointer" }} />
            </li>
          </ul>
        </nav>
      </header>

      {/* Student Dashboard */}
      <div className="container">
        <h2>Attendance History</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Subject</th>
              <th>Class</th>
              <th>Section</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.map((record, index) => (
              <tr key={index}>
                <td>{record.date}</td>
                <td>{record.subject}</td>
                <td>{record.className}</td>
                <td>{record.section}</td>
                <td>{record.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default StudentDashboard;
