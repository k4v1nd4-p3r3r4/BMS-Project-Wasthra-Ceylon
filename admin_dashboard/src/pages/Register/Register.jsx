import React, { useState } from "react";
import "./Register.css"; // Assuming you have a separate SCSS file
import Logo from './Logo.png'
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate,Link} from 'react-router-dom';

const leftbox = {
  background: '#344955'
};

const Register = () => {
  const [name,setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
//const history = useHistory();
  const navigate = useNavigate();

  const validatePassword = () => {
    if (password !== passwordConfirm) {
      setErrorMessage("Password and password confirmation do not match");
      return false;
    }
    return true;
  }

  // Function to validate email format
  const validateEmail = (email) => {
    // Regular expression for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }


  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    setIsLoading(true); // Set loading state
    setErrorMessage(''); // Clear any previous errors

     // Check if passwords match
     if (!validatePassword()) {
        setIsLoading(false);
        return;
      }

     // Check if email is valid
     if (!validateEmail(email)) {
        setErrorMessage("Invalid email format");
        setIsLoading(false);
        return;
      }

      let items = {name,password,email};
      console.warn(items);
    try {
      const response = await axios.post('http://localhost:8000/api/register', {
        name,
        email,
        password,
      });

      // Handle successful registration
      console.log('Registration successful:', response.data); // register
      navigate('/'); 

      response = await response.json();
      localStorage.setItem("user-info",JSON.stringify(response));//save data in local

    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Registration failed');
      console.log("Registration Failed..!") // Handle errors gracefully
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className='container d-flex justify-content-center align-items-center min-vh-100'>
      <div className='row border rounded-4 p-3 bg-white shadow box-area'>
        <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box" style={leftbox}>
          <div className='featured-image mb-3'>
            <img src={Logo} alt="logo" className='img-fluid' style={{ width: '500px' }} />
          </div>
        </div>
        <div className="col-md-6 rounded-4 rigth-box">
          <form onSubmit={handleSubmit}>
            <div className="row align-items-center">
              <div className="header-text mb-4">
                <p className='text-center fs-2'>Business Management System - Register User </p>
              </div>
              <div className="input-group mb-3">
                <input type="text" className='form-control form-control-lg bg-light fs-6' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="input-group mb-3">
                <input type="text" className='form-control form-control-lg bg-light fs-6' placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="input-group mb-3">
                <input type={showPassword ? "text" : "password"} className='form-control form-control-lg bg-light fs-6' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                  <i className={`fas ${showPassword ?  "fa-eye" :"fa-eye-slash"}`}></i>
                </button>
              </div>
              <div className="input-group mb-3">
                <input type={showPassword ? "text" : "password"} className='form-control form-control-lg bg-light fs-6' placeholder='Confirm Password' value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
                <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                  <i className={`fas ${showPassword ? "fa-eye" :"fa-eye-slash" }`}></i>
                </button>
              </div>
              <div className="input-group mb-3">
                <button className='btn btn-lg btn-primary w-100 fs-6' type="submit" disabled={isLoading}>{isLoading ? 'Loading...' : 'Register'}</button>
                {errorMessage && <p className="error-message text-danger">{errorMessage}</p>}

              </div>
              <div className="row">
                    <small>have account? <a href="#"><Link to="/">Login</Link></a></small>
                </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register;
