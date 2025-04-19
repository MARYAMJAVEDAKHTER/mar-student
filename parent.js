// src/component/ParentDashboard.js

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'react-datepicker/dist/react-datepicker.css';
import '../App.css';
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi"; // Import logout icon
import "../App.css"; // Import CSS file

const mockData = {
  Juwad: {
    "2025-04-14": false,
    "2025-04-15": true,
    "2025-04-16": true
  },
  Aliya: {
    "2025-04-14": true,
    "2025-04-15": true,
    "2025-04-16": false
  }
};

function ParentDashboard() {
  const navigate = useNavigate();
  const [selectedChild, setSelectedChild] = useState("Juwad");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [queryText, setQueryText] = useState('');
  const [submittedQueries, setSubmittedQueries] = useState([]);

  const attendance = mockData[selectedChild];
  const formattedDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
  const isPresent = attendance[formattedDate];

  const handleQuerySubmit = () => {
    if (queryText.trim()) {
      const newQuery = `Query about ${selectedChild} on ${formattedDate}: ${queryText}`;
      setSubmittedQueries(prev => [...prev, newQuery]);
      setQueryText('');
    }
  };

  const handleDeleteQuery = (indexToRemove) => {
    setSubmittedQueries(prev => prev.filter((_, index) => index !== indexToRemove));
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
        <li><Link to="/student">Home</Link></li>
        {/* Logout Icon on Leftmost Side */}
        <li className="logout-icon" onClick={logout}>
          <FiLogOut size={24} color="#ff4d4d" style={{ cursor: "pointer" }} />
        </li>
      </ul>
    </nav>
  </header>
    <div className="cont">
      <h3 className="dashboard-title">👪 Parent Dashboard</h3>
  

      <Form.Group className="mb-3">
        <Form.Label><strong>Select Child</strong></Form.Label>
        <Form.Select
          value={selectedChild}
          onChange={(e) => setSelectedChild(e.target.value)}
        >
          <option value="Juwad">Juwad</option>
          <option value="Aliya">Aliya</option>
        </Form.Select>
      </Form.Group>

      <Card className=" attendance-card">
        <Card.Body>
          <h5 className="mb-3">Attendance on {formattedDate}</h5>
          {isPresent === undefined ? (
            <p className="text-muted">No record available</p>
          ) : isPresent ? (
            <p className="text-success fw-bold">Present</p>
          ) : (
            <p className="text-danger fw-bold">Absent</p>
          )}
          <DatePicker
            selected={selectedDate}
            onChange={date => setSelectedDate(date)}
            className="form-control"
          />
        </Card.Body>
      </Card>

      <Card className=" query-card">
        <Card.Body>
          <h5 className="mb-3">Write a Query</h5>
          <Form.Control
            type="text"
            value={queryText}
            onChange={(e) => setQueryText(e.target.value)}
            className="mb-2"
          />
          <Button variant="primary" onClick={handleQuerySubmit}>Submit Query</Button>
        </Card.Body>
      </Card>

      {submittedQueries.length > 0 && (
        <Card className="query-list-card">
          <Card.Body>
            <h5 className="mb-3">Submitted Queries</h5>
            <ul className="list-group">
              {submittedQueries.map((query, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  {query}
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDeleteQuery(index)}
                  >
                    ❌
                  </Button>
                </li>
              ))}
            </ul>
          </Card.Body>
        </Card>
      )}
    </div>
    </div>

  );
}

export default ParentDashboard;
