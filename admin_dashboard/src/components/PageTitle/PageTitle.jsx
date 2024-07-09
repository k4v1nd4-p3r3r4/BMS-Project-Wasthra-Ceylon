// PageTitle.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./pagetitle.css";

function PageTitle({ page, pages, icon }) {
  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h3>{page}</h3>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/Dashboard">
                <i className={`icon ${icon}`}></i>{" "}
                {/* Use the icon prop here */}
              </Link>
            </li>
            {/* Render breadcrumb links for each page */}
            {pages.map((p, index) => (
              <li className="breadcrumb-item" key={index}>
                {index === pages.length - 1 ? (
                  <span>{p}</span> // Current page, no link
                ) : (
                  <Link to={`/${p}`}>{p}</Link> // Link to other pages
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </main>
  );
}

export default PageTitle;
