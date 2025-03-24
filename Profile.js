import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import Footer from '../Footer';
import "../App.css"


const StudentProfile = () => {
  const navigate = useNavigate(); // Import the hook and initialize it

  const student = {
    name: "Maria",
    rollNumber: "12345",
    email: "maria@example.com",
    course: "Computer Science",
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
                <li><Link to="/student">StudentDashboard</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                 {/* Logout Icon on Leftmost Side */}
                 <li className="logout-icon" onClick={logout}>
                  <FiLogOut size={24} color="#ff4d4d" style={{ cursor: "pointer" }} />
                </li>
              </ul>
            </nav>
          </header>
             /* Profile Information */
      <div className="profile" style={{ maxWidth: '500px' }}>
      <div className="info">
        <h1>Student Profile</h1>
        <p><strong>Name:</strong>Maria</p>
        <p><strong>Roll Number:</strong> 12345</p>
        <p><strong>Email:</strong> maria@example.com</p>
        <p><strong>Course:</strong> Computer Science</p>
      </div>
    </div>
    <Footer/>
    </div> 
      
  );
};  


export default StudentProfile;
