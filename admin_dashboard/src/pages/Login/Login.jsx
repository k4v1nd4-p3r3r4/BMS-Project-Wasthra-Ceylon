
import React, { useState } from "react";
import "./login.css"; // Assuming you have a separate SCSS file
import Logo from './Logo.png'
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate,Link} from 'react-router-dom';



const leftbox = {
  background: '#344955'
};


const Login = () => {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [isLoading, setIsLoading] = useState(false);
const [errorMessage, setErrorMessage] = useState('');
const navigate = useNavigate();


const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validatePassword = (password) => {
  // Adjust these requirements as needed
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[^a-zA-Z0-9]/.test(password);
  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumber &&
    hasSpecialChar
  );
};

const handleSubmit = async (event) => {
  event.preventDefault();


  let error = ''; // Create a variable to store combined errors

  // Empty field checks
  if (email.trim() === '') {
    error += 'Email is required. ';
  } else if (!validateEmail(email)) {
    error += 'Invalid email address. ';
  }

  if (password.trim() === '') {
    error += 'Password is required. ';
  }

  // Set error message and exit if any errors found
  if (error) {
    setErrorMessage(error.trim());
    return;
  }

  // Email validation
  if (!validateEmail(email)) {
    setErrorMessage('Invalid email address');
    return;
  }

  // Password validation
  if (!validatePassword(password)) {
    setErrorMessage('Password must be at least 8 characters and include uppercase, lowercase, numbers, and special characters');
    return;
  }

  setIsLoading(true);
  setErrorMessage('');
   

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email,
        password,
      });

      const { name, email: userEmail, token } = response.data;

      // Store user information in local storage
      localStorage.setItem('userName', name);
      localStorage.setItem('userEmail', userEmail);
      localStorage.setItem('userToken', token);

      // if (!localStorage.getItem('userName') || !localStorage.getItem('userEmail') ) {
      //   navigate("/");
      //   return;
      // }

      if (!localStorage.getItem('userName') || localStorage.getItem('userName') === 'undefined' ||
          !localStorage.getItem('userEmail') || localStorage.getItem('userEmail') === 'undefined') {
        alert('Enter login data correctly. Please try again.');
        return;
      }

      // Handle successful login (e.g., store token, redirect to dashboard)
      console.log('Login successful:', response.data); // Example logging
      navigate('/dashboard');
     
      
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Login failed');
      console.error("Login Failed:", error); // Handle errors gracefully
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  
return (

 
      
  <div className='container container d-flex justify-content-center align-items-center min-vh-100'>
      
      {/*--login center--*/}
          <div className='row border rounded-4 p-3 bg-white shadow box-area'>


          {/*--left box--*/}
          <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box" style={leftbox}>
              <div className='featured-image mb-3'>
                  <img src={Logo} alt="logo" className = 'img-fluid'style={{width:'500px'}} />
              </div>
              
          </div>

          {/*--right box--*/}

          <div className="col-md-6 rounded-4 rigth-box">
          <form onSubmit={handleSubmit}>
              <div className="row align-items-center">
                  <div className="header-text mb-4">
                      <p className='text-center fs-2'>Business Management System </p>

                  </div>
                  <div className="input-group mb-3">
                      <input type="text" className='form-control form-control-lg bg-light fs-6' placeholder='Email Address' value={email}
                      onChange={(e) => setEmail(e.target.value)}/>
                  </div>
                  <div className="input-group mb-1">
                      <input type="password" className='form-control form-control-lg bg-light fs-6' placeholder='Password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}/>
                  </div>
                  <div className="input-group mb-5 d-flex justify-content-between">
                      <div className="form-check">
                          <input type="checkbox" className='form-check-input' name="" id="formCheck"  />
                          <label htmlFor="formCheck" className='form-check-lable text-secondary'><small>Rmember Me</small></label>
                      </div>
                      <div className='forgot'>
                          <small><a href="#">Forgot Password?</a></small>
                      </div>
                  </div>
                  <div className="input-group mb-3">
                      <button className='btn btn-lg btn-primary w-100 fs-6'type="submit" disabled={isLoading}> {isLoading ? 'Loading...' : 'Login'}</button>
                      {errorMessage && <p className="error-message text-danger">{errorMessage}</p>}
                  </div>
                  
                  <div class="row">
                    <small>Don't have account? <a href="#"> <Link to="/register">Register..</Link></a></small>
                </div>
              </div>
            </form>
          </div> 
      </div>
    
  </div>
    
)
}

export default Login;
