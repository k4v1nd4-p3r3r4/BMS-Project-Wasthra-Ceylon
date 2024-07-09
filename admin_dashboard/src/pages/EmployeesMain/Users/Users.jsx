import React from "react";
import "./users.css";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import PageTitle from "../../../components/PageTitle/PageTitle";
function Users() {
  const pages = ["Users"];
  const icon = "bi bi-house-up";

  return (
    <>
      <Header />
      <Sidebar />
      <PageTitle page="Users" pages={pages} icon={icon} />
      <main id="main" className="main">
        users
      </main>
    </>
  );
}

export default Users;
