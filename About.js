import React from "react";
import '../App.css';
import Footer from "../Footer";
import { Link } from "react-router-dom";


const About = () => {
  return (
    <div>
      <header className="navbar">
        <nav>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            </ul>
            </nav>
        </header>    
       <div className="about-container">
      <h1>About Student Attendance System</h1>
      <p>
        The Student Attendance System is a modern solution designed to simplify
        and enhance the process of managing student attendance in educational
        institutions. Our system utilizes advanced technologies like face
        recognition, enabling students to mark their attendance seamlessly and
        securely.
      </p>
      <p>
        Parents can monitor their child's attendance and communicate with the
        faculty, while teachers can easily update records and handle attendance
        queries. The admin panel offers a centralized management system for all
        users.
      </p>
      <p>
        This platform streamlines the attendance process, improves accuracy, and
        enhances communication between students, parents, and faculty, creating a
        more efficient and transparent educational environment.
      </p>
      </div>     

      <Footer/>
    </div>
    
    
  );
};

export default About;
