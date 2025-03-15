import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add your signup logic, like sending data to the backend
    console.log('Signup successful');
    navigate('/login'); // Redirect to login page after signup
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
            <div className="imageslider"></div>

      <div className="signup-box">
      <img src="https://cdn-icons-png.freepik.com/256/5662/5662991.png?ga=GA1.1.1024432574.1703556216&amp;semt=ais_hybrid" alt="Login Icon" style={{ width: '50px' , alignItems: 'center', justifyContent: 'center' ,marginRight: '10px', marginLeft:'100px' ,marginBottom: '10px'}} /> {/* Login Icon */}

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="First Name" required />
         <br/><br/>
          <input type="text" placeholder="Last Name" required />
             <br/><br/>
          <input type="email" placeholder="Enter an email" required />
         <br/><br/>
          <div className="relative">
            <input 
              type={showPassword ? 'text' : 'password'} 
              placeholder="Password" 
              required 
            />
            <span 
              onClick={togglePasswordVisibility} 
              style={{ cursor: 'pointer', position: 'absolute', right: '30px', top: '72%', transform: 'translateY(-50%)', color: '#f1f8fa' }}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </span>
          </div>

          <button type="submit">Submit</button>
        </form>
        <br/>
        <p className='para-2'>By clicking the signup button, you agree to our <Link to="/term">Terms and Conditions</Link> and <Link to="/privacy">Privacy Policy</Link>.</p>
        <p className="par">Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  );
};

export default Signup;