import React from "react";
import { Link } from "react-router-dom"; // Import Link component
import "./sidebar.css";

function Sidebar() {
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <Link to="/Dashboard" className="nav-link">
            {" "}
            {/* Replace <a> with <Link> */}
            <i className="bi bi-grid"></i>
            <span>Dashboard</span>
          </Link>
        </li>
        <p className="topic">Inventory</p>
        <hr />

        <li className="nav-item">
          <Link
            to="#"
            className="nav-link collapsed"
            data-bs-target="#components-nav"
            data-bs-toggle="collapse"
          >
            <i className="bi bi-basket2"></i>
            <span>Raw Materials</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </Link>
          <ul
            id="components-nav"
            className="nav-content collapse"
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link to="/Materials ">
                <i className="bi bi-circle"></i>
                <span>Materials</span>
              </Link>
            </li>
            <li>
              <Link to="/Purchase">
                <i className="bi bi-circle"></i>
                <span>Purchase</span>
              </Link>
            </li>
            <li>
              <Link to="/Usage">
                <i className="bi bi-circle"></i>
                <span>Usage</span>
              </Link>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <Link
            to="#"
            className="nav-link collapsed"
            data-bs-target="#product-nav"
            data-bs-toggle="collapse"
          >
            <i className="bi bi-archive"></i>
            <span>Products</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </Link>
          <ul
            id="product-nav"
            className="nav-content collapse"
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link to="/Productlist">
                <i className="bi bi-circle"></i>
                <span>Products list</span>
              </Link>
            </li>
            <li>
              <Link to="/Manufactured">
                <i className="bi bi-circle"></i>
                <span>Manufactured</span>
              </Link>
            </li>
            <li>
              <Link to="/Productsales">
                <i className="bi bi-circle"></i>
                <span>Sales</span>
              </Link>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <Link to="/Buyers" className="nav-link">
            <i className="bi bi-person-lines-fill"></i>
            <span>Customers</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/Suppliers" className="nav-link">
            <i className="bi bi-person-fill-add"></i>
            <span>Suppliers</span>
          </Link>
        </li>

        <p className="topic">Employees</p>
        <hr />

        {/* <li className="nav-item">
          <Link to="/Users" className="nav-link">
            <i className="bi bi-person-check-fill"></i>
            <span>Users</span>
          </Link>
        </li> */}

        <li className="nav-item">
          <Link
            to="#"
            className="nav-link collapsed"
            data-bs-target="#emp-nav"
            data-bs-toggle="collapse"
          >
            <i className="bi bi-person-fill-gear"></i>
            <span>Employees</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </Link>
          <ul
            id="emp-nav"
            className="nav-content collapse"
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link to="/AllEmp">
                <i className="bi bi-circle"></i>
                <span>All employees</span>
              </Link>
            </li>
            <li>
              <Link to="/Attendence ">
                <i className="bi bi-circle"></i>
                <span>Attendence</span>
              </Link>
            </li>
            <li>
              <Link to="/Leaves">
                <i className="bi bi-circle"></i>
                <span>Leaves</span>
              </Link>
            </li>
            <li>
              <Link to="/DailyTasks">
                <i className="bi bi-circle"></i>
                <span>Daily Tasks</span>
              </Link>
            </li>
          </ul>
        </li>
        <p className="topic">Finance</p>
        <hr />

        <li className="nav-item">
          <Link to="/dayilytransaction" className="nav-link">
            <i className="bi bi-cash-coin"></i>
            <span>Daily Transaction</span>
          </Link>
        </li>

        {/* <li className="nav-item">
          <Link to="/Invoice" className="nav-link">
            <i className="bi bi-receipt"></i>
            <span>Invoice</span>
          </Link>
        </li> */}

        {/* <li className="nav-item">
          <Link to="/Reports" className="nav-link">
            <i className="bi bi-bookmark-check"></i>
            <span>Reports</span>
          </Link>
        </li> */}
        <li className="nav-item">
          <Link to="/salaries" className="nav-link">
            <i className="bi bi-bookmark-check"></i>
            <span>Salary</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
