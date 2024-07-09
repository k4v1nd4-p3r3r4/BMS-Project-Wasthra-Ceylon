import React from "react";
import "./invoice.css";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import PageTitle from "../../../components/PageTitle/PageTitle";
function Invoice() {
  const pages = ["Invoce "];
  const icon = "bi bi-house-up";
  return (
    <>
      <Header />
      <Sidebar />
      <PageTitle page="Invoice" pages={pages} icon={icon} />
      <main id="main" className="main">
        Invoice
      </main>
    </>
  );
}

export default Invoice;
