import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi"; // Import logout icon
import "../App.css"; // Import CSS file
import Footer from '../Footer';

const ParentPortal = () => {
  const navigate = useNavigate();
  const [attendanceData, setAttendanceData] = useState([
    {Studentid:'1011', date: '2025-02-20', subject: 'Math', Class: 'BSCS', Section: 'A', status: 'Present' },
    {Studentid:'1012', date: '2025-02-21', subject: 'Science', Class: 'BSCS', Section: 'A', status: 'Present' },
    { Studentid:'1013',date: '2025-02-22', subject: 'English', Class: 'BSCS', Section: 'A', status: 'Present' },
  ]);

  const [query, setQuery] = useState('');
  const [chatVisible, setChatVisible] = useState(false);

  const submitQuery = () => {
    if (query.trim() === '') {
      alert('Please enter a query before submitting.');
      return;
    }
    alert('Query Submitted Successfully!');
    setQuery('');
  };

  const handleChatInput = (e) => {
    if (e.key === 'Enter') {
      const message = e.target.value;
      if (message.trim()) {
        const chatbox = document.getElementById('chatbot-messages');
        chatbox.innerHTML += `<div class="message">${message}</div>`;
        e.target.value = '';
      }
    }
  };

  // Logout function
  const logout = () => {
    alert("You have been logged out!");
    navigate("/login");
  };

  return (
    <div className="parent-portal">
      <header className="navbar">
        <nav>
          <ul className="nav-links">
            <li><Link to="/student">Home</Link></li>
            {/* Logout Icon on Leftmost Side */}
            <li className="logout-icon" onClick={logout}>
              <FiLogOut size={24} color="#ff4d4d" style={{ cursor: "pointer" }} />
            </li>
          </ul>
        </nav>
      </header>

      {/* Parent Dashboard */}
      <div className="contain">
        <h2>Welcome Parent</h2>
        <p>Monitor your child's attendance below</p>
        <h4>Student Attendance History</h4>
        <table>
          <thead>
            <tr>
            <th>Studentid</th>
              <th>Date</th>
              <th>Subject</th>
              <th>Class</th>
              <th>Section</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((record, index) => (
              <tr key={index}>
                 <td>{record.Studentid}</td>
                <td>{record.date}</td>
                <td>{record.subject}</td>
                <td>{record.Class}</td>
                <td>{record.Section}</td>
                <td>{record.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Query Form */}
        <div className="query-form">
          <label htmlFor="query">Write your query:</label>
          <textarea
            id="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Write your concern here..."
          ></textarea>
          <br></br>
          <button className="query-btn" onClick={submitQuery}>Submit Query</button>
        </div>
      </div>
    </div>
  );
};

export default ParentPortal;
