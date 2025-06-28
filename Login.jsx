/** @format */

import { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = ({ role }) => {
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:4000/api/${role}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Email: Email.trim().toLowerCase(),
        Password: Password,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      toast.success("Login Successful");

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("userId", data.userId || data.id || data.ID);

      setTimeout(() => {
        if (role === "admin") navigate("/dashboard/class/manage");
        else if (role === "teacher") navigate("/dashboard/teacher/attendance");
        else if (role === "student") navigate("/dashboard/student/attendance");
        else if (role === "parent") navigate("/dashboard/parent/attendance");
      }, 3000);
    } else {
      toast.error(data.error || "Login failed");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="login-container">
        <h2>
          <img
            src="https://cdn-icons-png.flaticon.com/128/295/295128.png"
            alt="Admin Icon"
            width="74"
            height="70"
          />
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter Email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ paddingRight: "11px" }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "2px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit">Login</button>
          <div style={{ marginTop: "15px" }}>
            <span style={{ margin: "0 10px" }}>|</span>
            <Link to="/">Back to Home</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
