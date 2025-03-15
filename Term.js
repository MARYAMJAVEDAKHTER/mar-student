import React from 'react';
import '../App.css';

const Terms = () => {
  return (
    <div className="terms-container">
      <h1 className="terms-title">Terms and Conditions</h1>
      <ul className="terms-list">
        <li><strong>Use of Service:</strong> Your account is for personal use only. Do not share your password with anyone.</li>
        <li><strong>Accurate Information:</strong> All information provided during registration must be accurate and up-to-date.</li>
        <li><strong>Purpose of the System:</strong> This system is intended solely for managing student attendance.</li>
        <li><strong>Account Termination:</strong> If any user is found misusing the system, their account may be terminated.</li>
      </ul>
    </div>
  );
};

export default Terms;
