import React, { useState } from 'react';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// Mock student attendance data
const studentAttendance = {
  Ayaan: {
    '2025-04-01': true,
    '2025-04-02': false,
    '2025-04-03': true,
    '2025-04-04': false,
  },
  nimra: {
    '2025-04-01': true,
    '2025-04-02': false,
    '2025-04-03': false,
    '2025-04-04': false,
  },
  Fatima: {
    '2025-04-01': true,
    '2025-04-02': true,
    '2025-04-03': true,
    '2025-04-04': true,
  },
};

function FacultyPortal() {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [searchStudent, setSearchStudent] = useState('');

  const getAttendanceRate = (attendance) => {
    const values = Object.values(attendance);
    const totalDays = values.length;
    const presentDays = values.filter(v => v).length;
    return totalDays ? ((presentDays / totalDays) * 100).toFixed(1) : '0.0';
  };

  const filteredStudents = Object.entries(studentAttendance).filter(([name]) =>
    name.toLowerCase().includes(searchStudent.toLowerCase())
  );

  const lowAttendanceStudents = filteredStudents.filter(
    ([_, attendance]) => parseFloat(getAttendanceRate(attendance)) < 75
  );

  const generateCSVReport = () => {
    let csvContent = "Student Name,Attendance Rate (%)\n"; // CSV header

    lowAttendanceStudents.forEach(([name, attendance]) => {
      csvContent += `${name},${getAttendanceRate(attendance)}\n`;
    });

    const filename = "low_attendance_report.csv";
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Create a temporary link element to trigger the download
    const link = document.createElement("a");
    if (link.download !== undefined) { // Feature detection
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      // Fallback for browsers that don't support the download attribute
      window.open('data:text/csv;charset=utf-8,' + escape(csvContent));
    }
  };

  return (
    <div className="cont">
      <h4>Faculty Dashboard</h4>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <Form.Control
          type="text"
          placeholder="Search student..."
          value={searchStudent}
          onChange={(e) => setSearchStudent(e.target.value)}
          style={{ maxWidth: '250px' }}
        />

        <DatePicker
          selected={selectedMonth}
          onChange={(date) => date && setSelectedMonth(date)}
          dateFormat="MMMM yyyy"
          showMonthYearPicker
          className="form-control"
          style={{ maxWidth: '200px' }}
        />
      </div>

      <Card className="mb-4">
        <Card.Body>
          <h5>Monthly Attendance Summary</h5>
          <ul>
            {filteredStudents.map(([name, attendance]) => (
              <li key={name}>
                {name}: <strong>{getAttendanceRate(attendance)}%</strong>
              </li>
            ))}
          </ul>
        </Card.Body>
      </Card>

      {lowAttendanceStudents.length > 0 && (
        <Card className="mb-4">
          <Card.Body>
            <h5>⚠️ Students with Low Attendance (&lt;75%)</h5>
            <ul>
              {lowAttendanceStudents.map(([name, attendance]) => (
                <li key={name}>
                  {name} - <span style={{ color: 'red' }}>{getAttendanceRate(attendance)}%</span>
                </li>
              ))}
            </ul>
            <Button variant="danger" className="mt-3" onClick={generateCSVReport}>Export to CSV</Button>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

export default FacultyPortal;