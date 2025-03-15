import React from 'react';
import '../App.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      <h1 className="privacy-title">Privacy Policy</h1>
      <div className="privacy-content">
        <p><strong>1. Data Collection:</strong> We collect your name, email, and attendance records.</p>
        <p><strong>2. Use of Data:</strong> Your data is used only to manage attendance and improve system functionality.</p>
        <p><strong>3. Data Security:</strong> Your information is stored on secure servers.</p>
        <p><strong>4. Cookies:</strong> This website uses cookies to enhance your browsing experience.</p>
        <p><strong>5. Your Rights:</strong> You have the right to access your data and request its deletion at any time.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
