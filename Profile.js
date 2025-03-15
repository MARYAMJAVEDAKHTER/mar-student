import React from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';
import { FiLogOut } from "react-icons/fi"; // Import logout icon


const StudentProfile = () => {
  const navigate = useNavigate();

  // Dummy Data - Replace with API Call if needed
  const student = {
    name: "Maria",
    rollNumber: "12345",
    email: "maria@example.com",
    course: "Computer Science"
  };

  // Logout Function
   // Logout function
   const logout = () => {
    alert("You have been logged out!");
    navigate("/login");
  };

  return (
    <div className="profile-container">
      {/* Navbar */}
      <nav className="navbar">
        <ul className="nav-links">
          <li><a href="/student">Home</a></li>
          <li><a href="/profile">Profile</a></li>
 {/* Logout Icon on Leftmost Side */}
             <li className="logout-icon" onClick={logout}>
              <FiLogOut size={24} color="#ff4d4d" style={{ cursor: "pointer" }} />
            </li>
        </ul>
      </nav>

      {/* Profile Info */}
      <div className="profile-info">
        <h1>Student Profile</h1>
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Roll Number:</strong> {student.rollNumber}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Course:</strong> {student.course}</p>
      </div>

     <Footer/>
    </div>
  );
};

export default StudentProfile;
