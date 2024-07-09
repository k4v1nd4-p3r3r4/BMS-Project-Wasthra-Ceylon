import React, { useState, useEffect } from "react";
import "./userProfile.css";
import profilePic from "../images/user.png";


const UserProfile = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Retrieve user details from local storage
    const storedName = localStorage.getItem('userName');
    const storedEmail = localStorage.getItem('userEmail');

    // Update state with retrieved user details
    if (storedName && storedEmail) {
      setUserName(storedName);
      setUserEmail(storedEmail);
    }
  }, []);

  const handleLogout = () => {
    // Clear user details from local storage
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userToken');

    // Redirect to login page or perform other logout actions
    window.location.href = '/'; // Adjust the redirection as needed
  };

  return (
    <div className="user-profile">
      <div className="user-info">
        <img src={profilePic} alt="User" className="profile-pic" />
        <span>{userName}</span>
      </div>
      <div className="dropdown">
        <button className="dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item">{userEmail}</a>
          <a className="dropdown-item" href="#" onClick={handleLogout}>Logout</a>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
