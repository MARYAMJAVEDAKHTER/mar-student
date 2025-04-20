import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../App.css'; // Assuming you have some global styles
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

function BulkNotifications() {
  const navigate = useNavigate();
  const [recipientGroup, setRecipientGroup] = useState('');
  const [noticeType, setNoticeType] = useState('');
  const [subject, setSubject] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [recipientGroupsOptions, setRecipientGroupsOptions] = useState([
    'Parents of Absent Students',
    'Low Attendance Students',
    'All Students',
    'Teachers',
    'Parents',
    // Add more recipient groups as needed
  ]);
  const [noticeTypeOptions, setNoticeTypeOptions] = useState([
    'Absence Notification',
    'General Announcement',
    'Attendance Warning',
    'Event Reminder',
    'Important Update',
    // Add more notice types as needed
  ]);

  const handleRecipientGroupChange = (event) => {
    setRecipientGroup(event.target.value);
  };

  const handleNoticeTypeChange = (event) => {
    setNoticeType(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleMessageContentChange = (event) => {
    setMessageContent(event.target.value);
  };

  const handleSendNotification = () => {
    // Here you would implement the logic to send the bulk notification
    // This would likely involve making an API call to your backend (Supabase as mentioned)
    console.log('Sending Notification:', {
      recipientGroup,
      noticeType,
      subject,
      messageContent,
    });

    // Optionally, you can clear the form after sending
    setRecipientGroup('');
    setNoticeType('');
    setSubject('');
    setMessageContent('');
  };
  const logout = () => {
    alert('You have been logged out!');
    navigate('/login');
  };

  return (
    <div className="bulk-notifications-page">
      <header className="navbar">
        <nav>
          <ul className="nav-links">
            <li><Link to="/student">Home</Link></li>
            <li><Link to="/faculty">Dashboard</Link></li>
            <li className="logout-icon" onClick={logout}>
              <FiLogOut size={24} color="#ff4d4d" style={{ cursor: 'pointer' }} />
            </li>
          </ul>
        </nav>
      </header>

      <div className="cont">
      <h3 className="dashboard-title">🔔 Notifications</h3>
      <Form>
          <Form.Group className="mb-3">
            <Form.Label>Recipient Group</Form.Label>
            <Form.Control
              as="select"
              value={recipientGroup}
              onChange={handleRecipientGroupChange}
            >
              <option value="">Select recipient group</option>
              {recipientGroupsOptions.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Notice Type</Form.Label>
            <Form.Control
              as="select"
              value={noticeType}
              onChange={handleNoticeTypeChange}
            >
              <option value="">Select type</option>
              {noticeTypeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., Absence Notification: [Student Name]"
              value={subject}
              onChange={handleSubjectChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Message Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Enter your message here..."
              value={messageContent}
              onChange={handleMessageContentChange}
            />
          </Form.Group>

          <Button variant="primary" onClick={handleSendNotification}>
            Send Notification
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default BulkNotifications;