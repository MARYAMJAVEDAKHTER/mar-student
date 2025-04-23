import React, { useRef, useState } from 'react';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi"; // Import logout icon
import "../App.css"; // Import CSS file
import * as faceapi from 'face-api.js';

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
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [message, setMessage] = useState('');

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      console.error('Camera error:', err);
      setMessage('❌ Unable to access camera');
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const captureImageAndMarkAttendance = async () => {
    setMessage('📸 Capturing image...');
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
      if (!blob) return;

      setMessage('⏳ Sending image to backend...');
      const formData = new FormData();
      formData.append('image', blob, 'capture.jpg');

      try {
        const response = await fetch('http://localhost:5000/api/mark-attendance', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        if (data.success) {
          setMessage(`✅ Attendance marked for ${data.name}`);
        } else {
          setMessage('❌ Face not recognized. Attendance not marked.');
        }
      } catch (error) {
        console.error(error);
        setMessage('❌ Error connecting to backend.');
      }

      stopCamera();
    }, 'image/jpeg');
  };

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
    let csvContent = "Student Name,Attendance Rate (%)\n";

    lowAttendanceStudents.forEach(([name, attendance]) => {
      csvContent += `${name},${getAttendanceRate(attendance)}\n`;
    });

    const filename = "low_attendance_report.csv";
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      window.open('data:text/csv;charset=utf-8,' + escape(csvContent));
    }
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
            <li><Link to="/student">Home</Link></li>
            <li><Link to="/response">Query</Link></li>
            <li><Link to="/notification">Notification</Link></li>
            <button className="mark-btn" onClick={async () => {
              await startCamera();
              setMessage("🎥 Camera started. Look at the camera...");
            }}>
              Mark Attendance
            </button>
            <li className="logout-icon" onClick={logout}>
              <FiLogOut size={24} color="#ff4d4d" style={{ cursor: "pointer" }} />
            </li>
          </ul>
        </nav>
      </header>

      <div style={{ textAlign: 'center', padding: '20px', fontWeight:'bold', color:'white',}}>
        <h4>🎥 Live Camera Feed</h4>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{
            backgroundColor:'white',
            width: '440px',
            height: '380px',
            border: '3px solid #00bcd4',
            borderRadius: '12px',
            margin: '10px auto',
            display: 'flex',
            objectFit: 'cover',
            backgroundColor: '#000'
          }}
        />

        <h4>🖼️ Captured Image Preview</h4>
        <canvas
          ref={canvasRef}
          style={{
            width: '290px',
            height: '170px',
            border: '2px dashed #888',
            borderRadius: '10px',
            margin: '10px auto',
            display: 'flex',
            fontWeight:'bold',
          }}
        />

        <Button
          variant="primary"
          onClick={captureImageAndMarkAttendance}
          style={{ marginTop: '3px' }}
        >
          📸 Capture & Mark Attendance
        </Button>

        {message && <p style={{ marginTop: '3px', fontWeight: 'bold' }}>{message}</p>}
      </div>

      <div className="cont">
        <h3 className="dashboard-title">👩‍🏫 Faculty Dashboard</h3>

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
    </div>
  );
}

export default FacultyPortal;