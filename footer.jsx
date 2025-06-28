import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
    <div className="bubble-container">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="bubble" style={{ animationDelay: `${i * 0.2}s` }}></div>
      ))}
    </div>
    <div>
      &copy; 2025 <span>Student Attendance System</span> | Contact: <span>info@example.com</span>
    </div>
  </footer>
  );
};

export default Footer;
