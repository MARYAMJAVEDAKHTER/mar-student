import React, { useState } from 'react';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi'; // Import logout icon
import Footer from '../Footer';
const FacultyPortal = () => {
      const navigate = useNavigate();
    const [queries, setQueries] = useState([
        { parent: "Mr. Javed", student: "Maria", query: "Why was my child marked absent on 2025-02-21?" },
        { parent: "Mr. Younus", student: "Tayyaba", query: "Can you verify the attendance for 2025-02-22?" }
    ]);

    const [selectedStudent, setSelectedStudent] = useState("Maria");
    const [attendanceStatus, setAttendanceStatus] = useState("Present");

    const markAttendance = () => {
        alert(`${selectedStudent} marked as ${attendanceStatus}`);
    };

    const respondToQuery = (index) => {
        const response = prompt("Enter your response:");
        if (response) {
            alert("Response sent successfully!");
       
        }
    };
    // Logout function
  const logout = () => {
    alert('You have been logged out!');
    navigate('/login');
  };

    return (
        <div>
            <header className="navbar">
        <nav>
          <ul className="nav-links">
            <li><Link to="/student">Home</Link></li>
            {/* Logout Icon on Leftmost Side */}
            <li className="logout-icon" onClick={logout}>
              <FiLogOut size={24} color="#ff4d4d" style={{ cursor: 'pointer' }} />
            </li>
          </ul>
        </nav>
      </header>

            {/* Faculty Dashboard */}
            <div class="con">
                <h4>Welcome Faculty</h4>
                
                {/* Manage Attendance */}
                <h5>Mark Attendance</h5>
                <div class="attendance-form">
                    <label for="student">Select Student: </label>
                    <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
                        <option value="Maria">Maria</option>
                        <option value="Tayyaba">Tayyaba</option>
                        <option value="Arfa">Arfa</option>
                    </select>

                    <label>Select Status: </label>
                    <select  id="status" value={attendanceStatus} onChange={(e) => setAttendanceStatus(e.target.value)}>
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                    </select>
                   <br></br>
                    <button class="attendance-btn" onClick={markAttendance}>Submit Attendance</button>
                </div>

                {/* Parent Queries */}
                <h5>Parent Queries</h5>
                <div id="query-section" class="query-section">
                    {queries.map((q, index) => (
                        <div key={index}>
                            <p className='p'><strong>Parent:</strong> {q.parent}</p>
                            <p className='p'><strong>Student:</strong> {q.student}</p>
                            <p className='p'><strong>Query:</strong> {q.query}</p>
                            <button class="attendance-btn" onClick={() => respondToQuery(index)}>Respond</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FacultyPortal;
