import React, { useState, useEffect } from 'react';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi'; // Import logout icon
import Footer from '../Footer';

const Reports = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [attendanceData, setAttendanceData] = useState([
    { id: 1, name: 'Momina', date: '2025-03-01', status: 'Present' },
    { id: 2, name: 'Mr. Javed', date: '2025-03-01', status: 'Absent' },
    { id: 3, name: 'Alice', date: '2025-03-02', status: 'Present' },
  ]);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const filteredData = attendanceData.filter((record) =>
    record.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportToCSV = () => {
    const csvContent = [
      ['Student ID', 'Student Name', 'Date', 'Status'],
      ...filteredData.map((record) => [record.id, record.name, record.date, record.status])
    ].map((row) => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'attendance_report.csv';
    link.click();
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
                  <li><Link to="/admin">Dashboard</Link></li>
                  <li><Link to="/report">Reports</Link></li>
                  {/* Logout Icon on Leftmost Side */}
                  <li className="logout-icon" onClick={logout}>
                    <FiLogOut size={24} color="#ff4d4d" style={{ cursor: 'pointer' }} />
                  </li>
                </ul>
              </nav>
            </header>
      
      <main className="container">
        <h1>Attendance Reports</h1>

        <label htmlFor="search">Search Student:</label>
        <input
          type="text"
          id="search"
          placeholder="Enter student name"
          value={searchTerm}
          onChange={handleSearch}
        />
        <br></br>

        <button className="export-btn" onClick={exportToCSV}>Export as CSV</button>

        <table id="reports-table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((record) => (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.name}</td>
                <td>{record.date}</td>
                <td>{record.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      <Footer/>
    </div>
  );
};

export default Reports;