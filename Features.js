import React from "react";
import "../App.css";

const Features = () => {
  return (
    <section className="features">
      <h3>Key Features</h3>
      <div className="feature-box">
        <div className="feature">
          <h4>Face Recognition</h4>
          <p>Students can mark attendance using Face Recognition system.</p>
        </div>
        <div className="feature">
          <h4>Parent Portal</h4>
          <p>Parents can monitor attendance and raise queries.</p>
        </div>
        <div className="feature">
          <h4>Faculty Portal</h4>
          <p>Faculty can update attendance and respond queries.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;
