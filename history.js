import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi"; // Import logout icon
import Footer from "../Footer";

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { BsCalendarDay, BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { format, addMonths, subMonths } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../App.css'; // Custom CSS for present/absent highlighting



const mockAttendance = {
  "2025-04-01": true,// ✅ Add this line to mark 19th April as present
  "2025-04-02": true,// ✅ Add this line to mark 19th April as present
  "2025-04-03": false,
  "2025-04-04": true,// ✅ Add this line to mark 19th April as present
  "2025-04-05": true,// ✅ Add this line to mark 19th April as present
  "2025-04-08": true,// ✅ Add this line to mark 19th April as present
  "2025-04-09": false,
  "2025-04-10": true,// ✅ Add this line to mark 19th April as present
  "2025-04-11": true,// ✅ Add this line to mark 19th April as present
  "2025-04-12": true,// ✅ Add this line to mark 19th April as present
  "2025-04-15": false,
  "2025-04-16": true, // ✅ Add this line to mark 19th April as present
  "2025-04-19": true, // ✅ Add this line to mark 19th April as present

};
function AttendanceHistory() {
    const navigate = useNavigate();
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
  
    const daysPresent = Object.values(mockAttendance).filter(v => v).length;
    const daysAbsent = Object.values(mockAttendance).filter(v => !v).length;
    const attendanceRate = ((daysPresent / (daysPresent + daysAbsent)) * 100).toFixed(1);
  
    const handlePreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
    const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const handleDateChange = (date) => setSelectedDate(date);
  
    const dayClassNameGetter = (date) => {
      const formattedDate = format(date, "yyyy-MM-dd");
      if (mockAttendance[formattedDate] === true) return "present-day";
      if (mockAttendance[formattedDate] === false) return "absent-day";
      return "";
    };
  const highlightWithRanges = [
    {
      "react-datepicker__day--present": Object.keys(mockAttendance)
        .filter(date => mockAttendance[date])
        .map(date => new Date(date)),
    },
    {
      "react-datepicker__day--absent": Object.keys(mockAttendance)
        .filter(date => !mockAttendance[date])
        .map(date => new Date(date)),
    },
  ];
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
           <li className="logout-icon" onClick={logout}>
            <FiLogOut size={24} color="#ff4d4d" style={{ cursor: "pointer" }} />
          </li>
        </ul>
      </nav>
    </header>
      <div className="cont">
        <div className="mb-4">
        <h3 className="dashboard-title">🗓️📊 Attendance History</h3>
        <p className="text-muted"><h4>Track your monthly attendance records</h4></p>
        </div>

        <div className="row row-cols-1 row-cols-sm-3 g-3 mb-4">
          <div className="col">
            <Card className="shadow-sm">
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="small text-muted mb-0">Days Present</p>
                  <p className="h5 fw-bold text-success mb-0">{daysPresent}</p>
                </div>
                <div className="bg-success bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                  <BsCalendarDay className="text-success" size={24} />
                </div>
              </Card.Body>
            </Card>
          </div>

          <div className="col">
            <Card className="shadow-sm">
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="small text-muted mb-0">Days Absent</p>
                  <p className="h5 fw-bold text-danger mb-0">{daysAbsent}</p>
                </div>
                <div className="bg-danger bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                  <BsCalendarDay className="text-danger" size={24} />
                </div>
              </Card.Body>
            </Card>
          </div>

          <div className="col">
            <Card className="shadow-sm">
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="small text-muted mb-0">Attendance Rate</p>
                  <p className="h5 fw-bold text-primary mb-0">{attendanceRate}%</p>
                </div>
                <div className="bg-primary bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                  <BsCalendarDay className="text-primary" size={24} />
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>

        <Card className="shadow-sm">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="h6 fw-semibold text-dark mb-0">{format(currentMonth, "MMMM yyyy")}</h2>
              <div>
                <Button variant="outline-secondary" size="sm" className="me-2" onClick={handlePreviousMonth}>
                  <BsChevronLeft size={16} />
                </Button>
                <Button variant="outline-secondary" size="sm" onClick={handleNextMonth}>
                  <BsChevronRight size={16} />
                </Button>
              </div>
            </div>

            <DatePicker
           selected={selectedDate}
            onChange={handleDateChange}
                 inline
           dayClassName={dayClassNameGetter}
/>


            

            <div className="mt-3 d-flex gap-3 justify-content-center">
              <div className="d-flex align-items-center gap-2">
                <div className="bg-success rounded" style={{ width: '12px', height: '12px' }}></div>
                <span className="small text-muted">Present</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <div className="bg-danger rounded" style={{ width: '12px', height: '12px' }}></div>
                <span className="small text-muted">Absent</span>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
      </div>
  );
}

export default AttendanceHistory;
