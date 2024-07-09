import React, { useEffect, useState } from "react";
import axios from "axios";
import "./navNotice.css"; // Import CSS file

function NavNotice() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/notify/notifications"
      );
      // Sort the notifications array by timestamp in descending order
      const sortedNotifications = response.data.notifications.sort((a, b) =>
        a.timestamp > b.timestamp ? -1 : 1
      );
      setNotifications(sortedNotifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleCloseNotification = (index) => {
    const updatedNotifications = [...notifications];
    updatedNotifications.splice(index, 1);
    setNotifications(updatedNotifications);
  };

  return (
    <li className="header-nav nav-item dropdown">
      <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
        <i className="bi bi-bell"></i>
        <span className="badge bg-danger badge">{notifications.length}</span>
      </a>
      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
        <li className="dropdown-header">
          You have {notifications.length} new notifications
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        {notifications.map((notification, index) => (
          <li key={index} className="notification-item">
            <i
              className="bi bi-x-circle text-danger"
              onClick={() => handleCloseNotification(index)}
              style={{ cursor: "pointer" }}
            ></i>
            <div>
              <h4>{notification.name}</h4>
              <p>{notification.message}</p>
              <p>{notification.timestamp}</p>
            </div>
          </li>
        ))}

        <li>
          <hr className="dropdown-divider" />
        </li>
      </ul>
    </li>
  );
}

export default NavNotice;
