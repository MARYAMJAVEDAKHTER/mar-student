import React, { useState, useEffect } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { CSVLink } from 'react-csv';

// Mock data for demonstration
const students = [
  { name: 'Juwad', attendanceRate: 65 },
  { name: 'Aliya', attendanceRate: 88 },
  { name: 'Sara', attendanceRate: 70 },
  { name: 'Ahmed', attendanceRate: 50 }
];

function AdminDashboard() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState(new Date());
  const [scheduledMeetings, setScheduledMeetings] = useState([]);
  const [lowAttendanceStudents, setLowAttendanceStudents] = useState([]);
  const [eventTypes, setEventTypes] = useState([]); // To store options for the dropdown
  const [eventType, setEventType] = useState('');
  const [selectedDates, setSelectedDates] = useState([]);
  const [academicEvents, setAcademicEvents] = useState([]); // To store academic events

  useEffect(() => {
    // Mock fetching event types
    const mockEventTypes = ['Holiday', 'Exam', 'Assignment Due', 'Meeting'];
    setEventTypes(mockEventTypes);

    // Mock fetching existing academic events
    const mockAcademicEvents = [
      { title: 'Mid-term Exams', type: 'Exam', date: new Date('2025-05-15') },
      { title: 'Spring Break', type: 'Holiday', date: new Date('2025-04-25') },
    ];
    setAcademicEvents(mockAcademicEvents);
  }, []);

  const handleAddEvent = () => {
    if (eventTitle && eventType && eventDate) {
      setAcademicEvents(prev => [...prev, { title: eventTitle, type: eventType, date: eventDate }]);
      setEventTitle('');
      setEventType('');
      setEventDate(new Date());
    }
  };

  const autoScheduleMeetings = () => {
    const lowAttendance = students.filter(s => s.attendanceRate < 75);
    const meetings = lowAttendance
      .map(s => `Schedule meeting with parents of ${s.name} (Attendance: ${s.attendanceRate}%)`);

    setLowAttendanceStudents(lowAttendance);
    setScheduledMeetings(meetings);
  };

  const logout = () => {
    alert('You have been logged out!');
    navigate('/login');
  };

  const handleTitleChange = (e) => {
    setEventTitle(e.target.value);
  };

  const handleTypeChange = (e) => {
    setEventType(e.target.value);
  };

  const handleDateChange = (date) => {
    setEventDate(date);
  };

  const csvData = [
    ['Student', 'Attendance Rate (%)'],
    ...lowAttendanceStudents.map(student => [student.name, student.attendanceRate]),
  ];

  const calendarEventsCsvData = [
    ['Title', 'Type', 'Date'],
    ...academicEvents.map(event => [event.title, event.type, event.date.toLocaleDateString()]),
  ];

  return (
    <div className="admin-dashboard">
      <header className="navbar">
        <nav>
          <ul className="nav-links">
            <li><Link to="/student">Home</Link></li>
            <li><Link to="/admin">ManageUser</Link></li>
            <li className="logout-icon" onClick={logout}>
              <FiLogOut size={24} color="#ff4d4d" style={{ cursor: 'pointer' }} />
            </li>
          </ul>
        </nav>
      </header>

      <div className="cont">
      <h3 className="dashboard-title">👩‍💻  Admin Dashboard</h3>

        <Card className="mb-4">
          <Card.Body>
            <h5>📅 Add Academic Event</h5>
        
            <Form.Group className="mb-2">
              <Form.Label>Event Type:</Form.Label>
              <Form.Control
                as="select"
                value={eventType}
                onChange={handleTypeChange}
              >
                <option value="">Select Type</option>
                {eventTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Date:</Form.Label>
              <DatePicker
                selected={eventDate}
                onChange={handleDateChange}
                className="form-control"
                dateFormat="yyyy-MM-dd"
    />
   
            
            </Form.Group>
            <Button onClick={handleAddEvent}>Add Event</Button>

            <h6 className="mt-3">Upcoming Events</h6>
            <ul>
              {academicEvents.map((e, i) => (
                <li key={i}>{e.title} ({e.type}) on {e.date.toLocaleDateString()}</li>
              ))}
            </ul>
            {academicEvents.length > 0 && (
              <div className="mt-3">
                <CSVLink
                  data={calendarEventsCsvData}
                  filename={"academic_calendar_events.csv"}
                  className="btn btn-info"
                >
                  Export Calendar Events as CSV
                </CSVLink>
              </div>
            )}
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <h5>📊 Auto-Schedule Parent-Teacher Meetings</h5>
            <Button className="" onClick={autoScheduleMeetings}>Generate Meetings</Button>
            {scheduledMeetings.length > 0 ? (
              <ul>
                {scheduledMeetings.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            ) : (
              <p>No meetings scheduled based on current attendance.</p>
            )}
            {lowAttendanceStudents.length > 0 && (
              <div className="mt-3">
                <CSVLink
                  data={csvData}
                  filename={"low_attendance_report.csv"}
                  className="btn btn-warning"
                >
                  Export Low Attendance as CSV
                </CSVLink>
              </div>
            )}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default AdminDashboard;