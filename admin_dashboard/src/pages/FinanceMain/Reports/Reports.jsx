import React from "react";
import "./report.css";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import PageTitle from "../../../components/PageTitle/PageTitle";

function Reports() {
  const pages = ["Reports"];
  const icon = "bi bi-house-up";
  return (
    <>
      <Header />
      <Sidebar />
      <PageTitle page="Reports" pages={pages} icon={icon} />
      <main id="main" className="main">
        Reports
      </main>
    </>
  );
}

export default Reports;
