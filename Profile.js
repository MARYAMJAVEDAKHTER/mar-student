import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import Footer from '../Footer';
import "../App.css";
import studentPic from '../image/images.jpg';
const StudentProfile = () => {
  const navigate = useNavigate();

  const student = {
    name: "Maria",
    rollNumber: "12345",
    email: "maria@example.com",
    course: "Computer Science",
    profilePic: studentPic, // Add the profile picture to the student object
  };

  const logout = () => {
    alert("You have been logged out!");
    navigate("/login");
  };

  return (
    <div>
      <header className="navbar">
        <nav>
          <ul className="nav-links">
            <li><Link to="/student">StudentDashboard</Link></li>
            <li className="logout-icon" onClick={logout}>
              <FiLogOut size={24} color="#ff4d4d" style={{ cursor: "pointer" }} />
            </li>
          </ul>
        </nav>
      </header>
      <div className="profile" style={{ maxWidth: '500px' }}>
        <div className="profile-header">
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <img
          src={student.profilePic}
          alt="Profile Picture"
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            objectFit: 'cover',
          }}
        />
      </div>
        <div className="info">
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>Roll Number:</strong> {student.rollNumber}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Course:</strong> {student.course}</p>
        </div>
      </div>
    </div>
    <Footer />

    </div>
  );
};

export default StudentProfile;