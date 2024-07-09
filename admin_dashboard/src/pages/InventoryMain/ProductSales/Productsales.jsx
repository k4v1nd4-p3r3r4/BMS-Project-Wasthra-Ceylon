import React from "react";
import "./productsales.css";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import PageTitle from "../../../components/PageTitle/PageTitle";
import Saletab from "./Saletab";
function Productsales() {
  const pages = ["Sales"];
  const icon = "bi bi-house-up";
  return (
    <>
      <Header />
      <Sidebar />
      <PageTitle page="Sales" pages={pages} icon={icon} />
      <main id="main" className="main" style={{ marginTop: "2px" }}>
        <Saletab />
      </main>
    </>
  );
}

export default Productsales;
