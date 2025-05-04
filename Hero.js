import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router
import { School, Users, Book, Camera } from "lucide-react";
import "../home.css"; // Create this CSS file


const Hero = () => {
  return (
    <div className="min-h-screen bg-gradient">
        
      {/* Hero Section */}
      <section className="py-20 px-6 hero-section">
      <div className="hero-image-container">

          <div className="hero">
            <h3 className="hero-title">
             Welcome to Smart Attendance System <br />
              <span className="hero-subtitle">For Modern Education</span>
            </h3>
            <p className="hero-description">
              Streamline attendance tracking with face recognition technology.
              Connect students, parents, faculty, and administrators on one secure platform.
            </p>
          </div>
          <div className="camera-box-outer">
              <div className="camera-box">
                <Camera className="camera-icon" />
              </div>
            </div>
          </div>
      {/* Features Preview */}
          <h2 className="features-section">Key Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-bg">
                <Camera className="feature-icon" />
              </div>
              <h4 className="feature-title">Face Recognition</h4>
              <p className="feature-description">
                Advanced facial recognition for seamless and accurate attendance marking
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-bg">
                <Users className="feature-icon" />
              </div>
              <h4 className="feature-title">Multiple User Types</h4>
              <p className="feature-description">
                Dedicated portals for students, parents, faculty, and administrators
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-bg">
                <Book className="feature-icon" />
              </div>
              <h4 className="feature-title">Comprehensive Reports</h4>
              <p className="feature-description">
                Detailed analytics and reports for attendance management
              </p>
            </div>
          </div>
         
      </section>
    </div>
  );
};

export default Hero;