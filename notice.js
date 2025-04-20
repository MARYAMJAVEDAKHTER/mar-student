import React from 'react';
import '../App.css'; // Create this CSS file

function AttendanceNotice() {
  return (
    <div className="attendance-notice widget">
      <h3>Attendance Notice</h3>
      <p>Your attendance is below the recommended level of 90%. Please improve your attendance to avoid academic penalties.</p>
    </div>
  );
}

export default AttendanceNotice;