import React from "react";
import "./manufac.css";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import PageTitle from "../../../components/PageTitle/PageTitle";
import Manutab from "./Manutab";
function Manufactured() {
  const pages = ["Manufactured"];
  const icon = "bi bi-house-up";
  return (
    <>
      <Header />
      <Sidebar />
      <PageTitle page="Manufactured products" pages={pages} icon={icon} />
      <main id="main" className="main" style={{ marginTop: "2px" }}>
        <Manutab />
      </main>
    </>
  );
}

export default Manufactured;
