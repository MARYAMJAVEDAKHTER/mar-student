/** @format */
import { Link } from "react-router-dom";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaInfoCircle,
  FaUserShield,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaUserFriends,
} from "react-icons/fa";
import "./HomePage.css";
import Footer from "./footer";

const HomePage = () => {
  const navigate = useNavigate();

  const data = {
    admin: {
      title: "Admin",
      description: "Manage system users and monitor data.",
      icon: <FaUserShield size={40} />,
    },
    teacher: {
      title: "Teacher",
      description: "Manage attendance of your students and update records.",
      icon: <FaChalkboardTeacher size={40} />,
    },
    student: {
      title: "Student",
      description: "Check attendance and view your records.",
      icon: <FaUserGraduate size={40} />,
    },
    parent: {
      title: "Parent",
      description: "Check attendance of your child and stay updated.",
      icon: <FaUserFriends size={40} />,
    },
  };

  return (
    <div>
      {/* ✅ Header Section */}
      <header className="navbar">
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/">
                <FaHome className="nav-icon" /> Home
              </Link>
            </li>
            <li>
              <Link to="/about">
                <FaInfoCircle className="nav-icon" /> About
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className="home-container">
        <h1>Welcome to the Portal</h1>
        <h3>Manage everything through a single portal</h3>
        <div className="card-wrapper">
          {Object.entries(data).map(([role, { title, description, icon }]) => (
            <div className="card" key={role}>
              <div className="card-icon">{icon}</div>
              <h2>{title}</h2>
              <p>{description}</p>
              <button onClick={() => navigate(`/login/${role}`)}>
                Login as {title}
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
