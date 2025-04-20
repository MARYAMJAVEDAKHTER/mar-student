import React, { useState } from 'react';
import '../App.css';
import { FaSearch } from 'react-icons/fa';
import { FaEnvelope, FaCheckCircle } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi"; // Import logout icon

// Mock data for parent messages (replace with your actual data fetching)
const messagesData = [
  {
    id: 1,
    senderInitial: 'MJ',
    senderName: 'Maryam Javed',
    subject: 'Attendance',
    message: 'Assalamualiakum why my student hamada was absent on 14 april2025?',
    time: '11:23 AM',
    status: 'New',
  },
  {
    id: 2,
    senderInitial: 'Sk',
    senderName: 'Sarah khan',
    subject: 'Daniel Williams - Field Trip Permission',
    message: 'I wanted to ask about the upcoming attendance details...',
    time: 'Yesterday',
    status: 'In Progress',
  },
  {
    id: 3,
    senderInitial: 'Ak',
    senderName: 'Ali khan',
    subject: 'Attendance',
    message: 'Give me leave application of your student',
    time: '2 days ago',
    status: 'Resolved',
  },
  // Add more messages here
];

function ParentMessages() {
    const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [responseText, setResponseText] = useState('');
  const [messages, setMessages] = useState(messagesData);

  const filteredMessages = messages.filter((message) => {
    const searchMatch =
      message.senderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase());
    const filterMatch = activeFilter === 'All' || message.status === activeFilter;
    return searchMatch && filterMatch;
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    setSelectedMessage(null);
  };

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
  };

  const handleResponseChange = (event) => {
    setResponseText(event.target.value);
  };

  const handleSendResponse = async () => {
    if (selectedMessage && responseText.trim()) {
      try {
        // Replace '/api/messages/' + selectedMessage.id + '/reply' with your actual backend endpoint
        const response = await fetch(`/api/messages/${selectedMessage.id}/reply`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Include any necessary authorization headers (e.g., JWT token)
            // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
          body: JSON.stringify({ response: responseText }),
        });

        if (response.ok) {
          console.log('Response sent successfully!');
          setResponseText(''); // Clear the input field after successful send
          // Optionally, update the local UI to show the sent message or refresh the message list
        } else {
          console.error('Failed to send response:', response.status);
          // Optionally, display an error message to the user
        }
      } catch (error) {
        console.error('Error sending response:', error);
        // Optionally, display an error message to the user
      }
    } else {
      alert('Please type a response before sending.');
    }
  };
  // Logout function
  const logout = () => {
    alert("You have been logged out!");
    navigate("/login");
  };
  const handleMarkInProgress = async () => {
    if (selectedMessage) {
      try {
        // Replace '/api/messages/' + selectedMessage.id + '/status' with your actual backend endpoint
        const response = await fetch(`/api/messages/${selectedMessage.id}/status`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            // Include any necessary authorization headers
          },
          body: JSON.stringify({ status: 'In Progress' }),
        });

        if (response.ok) {
          console.log('Marked as In Progress for message ID:', selectedMessage.id);
          setMessages((prevMessages) =>
            prevMessages.map((msg) =>
              msg.id === selectedMessage.id ? { ...msg, status: 'In Progress' } : msg
            )
          );
          setSelectedMessage({ ...selectedMessage, status: 'In Progress' });
        } else {
          console.error('Failed to mark as In Progress:', response.status);
          // Optionally, display an error message
        }
      } catch (error) {
        console.error('Error marking as In Progress:', error);
        // Optionally, display an error message
      }
    }
  };

  const handleResolveMessage = async (messageId) => {
    try {
      // Replace '/api/messages/' + messageId + '/status' with your actual backend endpoint
      const response = await fetch(`/api/messages/${messageId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Include any necessary authorization headers
        },
        body: JSON.stringify({ status: 'Resolved' }),
      });

      if (response.ok) {
        console.log('Resolved message ID:', messageId);
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === messageId ? { ...msg, status: 'Resolved' } : msg
          )
        );
        if (selectedMessage?.id === messageId) {
          setSelectedMessage(null);
        }
      } else {
        console.error('Failed to resolve message:', response.status);
        // Optionally, display an error message
      }
    } catch (error) {
      console.error('Error resolving message:', error);
      // Optionally, display an error message
    }
  };

  return (
    <div>
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
      <div className="parent-messages-container">
        <div className="header">
          <h4>
            <FaEnvelope className="header-icon" /> ParentQueryies
          </h4>
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="filter-tabs">
          <button
            className={activeFilter === 'All' ? 'active' : ''}
            onClick={() => handleFilterClick('All')}
          >
            All
          </button>
          <button
            className={activeFilter === 'New' ? 'active' : ''}
            onClick={() => handleFilterClick('New')}
          >
            New
          </button>
          <button
            className={activeFilter === 'In Progress' ? 'active' : ''}
            onClick={() => handleFilterClick('In Progress')}
          >
            In Progress
          </button>
          <button
            className={activeFilter === 'Resolved' ? 'active' : ''}
            onClick={() => handleFilterClick('Resolved')}
          >
            Resolved
          </button>
        </div>

        <ul className="message-list">
          {filteredMessages.map((message) => (
            <li
              key={message.id}
              className={`message-item ${selectedMessage?.id === message.id ? 'selected' : ''}`}
              onClick={() => handleMessageClick(message)}
            >
              <div className="sender-info">
                <div className="sender-initial">{message.senderInitial}</div>
                <div className="sender-details">
                  <div className="sender-name">{message.senderName}</div>
                  <div className="subject">{message.subject}</div>
                </div>
              </div>
              <div className="message-content">{message.message}</div>
              <div className="message-meta">
                <span className="time">{message.time}</span>
                <div className="actions">
                  {message.status !== 'Resolved' && (
                    <button className="resolve-button" onClick={() => handleResolveMessage(message.id)}>
                      <FaCheckCircle /> Resolve
                    </button>
                  )}
                  <span className={`status ${message.status.toLowerCase().replace(' ', '-')}`}>
                    {message.status}
                  </span>
                </div>
              </div>
            </li>
          ))}
          {filteredMessages.length === 0 && (
            <li className="no-messages">No messages found.</li>
          )}
        </ul>
      </div>

      {selectedMessage && (selectedMessage.status === 'New' || selectedMessage.status === 'In Progress') && (
        <div className="permission-card">
          <div className="permission-header">
            <h3>{selectedMessage.subject}</h3>
            <span className={`status-pill ${selectedMessage.status.toLowerCase().replace(' ', '-')}`}>
              {selectedMessage.status}
            </span>
          </div>
          <p className="permission-details">From {selectedMessage.senderName}</p>
          <div className="conversation-preview">
            <div className="sender-initial">{selectedMessage.senderInitial}</div>
            <p className="preview-message">{selectedMessage.message}</p>
          </div>
          <div className="response-area">
            <textarea
              placeholder="Type your response here..."
              value={responseText}
              onChange={handleResponseChange}
            />
            <button className="send-button" onClick={handleSendResponse}>
              Send
            </button>
          </div>
          {selectedMessage.status === 'New' && (
            <button className="mark-in-progress-button" onClick={handleMarkInProgress}>
              Mark In Progress
            </button>
          )}
        </div>
      )}
    </div>
    </div>

  );
}

export default ParentMessages;