import React, { useRef, useState } from 'react';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import "../App.css";

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
            <li><Link to="/his">Reports</Link></li>
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

      {/* Camera and Feedback */}
      <div style={{ textAlign: 'center', padding: '20px', fontWeight: 'bold', color: 'white' }}>
        <h4>🎥 Live Camera Feed</h4>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{
            backgroundColor: 'white',
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
            fontWeight: 'bold',
          }}
        />

        <Button
          variant="primary"
          onClick={captureImageAndMarkAttendance}
          style={{ marginTop: '3px' }}
        >
          📸 Capture & Mark Attendance
        </Button>

        {/* Message Display */}
        {message && (
          <div style={{ marginTop: '15px', maxWidth: '400px', margin: 'auto',backgroundColor:'#00bcd4' }}>
            <div
              className={`alert ${
                message.includes("✅") ? "alert-success"
                : message.includes("❌") ? "alert-danger"
                : "alert-info"
              }`}
              role="alert"
            >
              {message}
            </div>
          </div>
        )}
      </div>

     
    </div>
  );
}

export default FacultyPortal;
