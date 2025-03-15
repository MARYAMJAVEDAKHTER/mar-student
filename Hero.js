import React from "react";
import "../App.css";

const Hero = () => {
  return (
    <section className="hero">
            <p>WELCOME STUDENT ATTENDANCE SYSTEM</p>
      <p>Mark Attendance with Face Recognition</p>
      <button onClick={() => alert("Face Recognition Feature Coming Soon!")}>
        Mark Attendance
      </button>
    </section>
  );
};

export default Hero;
