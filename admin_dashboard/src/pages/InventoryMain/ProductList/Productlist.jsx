import React from "react";
import "./productlist.css";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import PageTitle from "../../../components/PageTitle/PageTitle";
import ListTab from "./ListTab";
function Productlist() {
  const pages = ["Products List"];
  const icon = "bi bi-house-up";
  return (
    <>
      <Header />
      <Sidebar />
      <PageTitle page="Products List" pages={pages} icon={icon} />
      <main id="main" className="main" style={{ marginTop: "2px" }}>
        <ListTab />
      </main>
    </>
  );
}

export default Productlist;
