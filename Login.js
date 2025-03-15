import React, { useState } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = () => {
  const [showResetModal, setShowResetModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [resetUsername, setResetUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Login Function
  const onSubmit = (data) => {
    console.log("Form Data:", data);
    alert("Login Successful!");
    
    // Redirect to Student Dashboard after login
    navigate("/student");
  };
  // Reset Password Function
const resetPassword = () => {
  if (resetUsername && newPassword.length >= 6) {
    localStorage.setItem(resetUsername, newPassword);
    alert("Password reset successful! You can now log in.");
    setShowResetModal(false);
  } else {
    alert("Please enter a valid username and a password of at least 6 characters!");
  }
};


  return (
    <div>
      <div className="imageslider"></div>

      <div className="login-box">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Login Icon */}
          <img
            src="https://cdn-icons-png.flaticon.com/512/6681/6681204.png"
            alt="Login Icon"
            style={{
              width: "90px",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "10px",
              marginLeft: "100px",
              marginBottom: "10px",
            }}
          />

          {/* Username Field */}
          <div>
            <input
              type="text"
              placeholder="Username"
              {...register("username", { required: "Username is required" })}
              className={errors.username ? "input-error" : ""}
            />
            {errors.username && <p className="error">{errors.username.message}</p>}
          </div>

          {/* Password Field */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className={errors.password ? "input-error" : ""}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                cursor: "pointer",
                position: "absolute",
                right: "33px",
                top: "55%",
                transform: "translateY(-50%)",
                color: "#f1f8fa",
              }}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </span>
          </div>
          {errors.password && <p className="error">{errors.password.message}</p>}

          <br />
          <button type="submit">Login</button>
          <p className="forgot-password" onClick={() => setShowResetModal(true)}>
            Forgot Password?
          </p>
        </form>

        <br />
        <p className="para-2">
          Not have an account? <Link to="/signup">Signup here</Link>
        </p>
      </div>

      {/* Reset Password Modal */}
      {showResetModal && (
        <div id="resetPasswordModal" className="modal-overlay">
          <div className="modal-content">
            <h3>Reset Password</h3>
            <input
              type="text"
              value={resetUsername}
              onChange={(e) => setResetUsername(e.target.value)}
              placeholder="Enter Username"
            />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter New Password"
            />
            <button onClick={resetPassword}>Reset Password</button>
            <button onClick={() => setShowResetModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
