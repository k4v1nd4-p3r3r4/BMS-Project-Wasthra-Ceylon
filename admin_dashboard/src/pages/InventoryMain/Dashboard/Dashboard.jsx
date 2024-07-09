import React, { useEffect } from "react";
import "./dashboard.css";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import PageTitle from "../../../components/PageTitle/PageTitle";
import Cards from "../../../components/Widget/Cards";
//import ReportCharts from "../../../components/ReportCharts/ReportCharts";
import Piechart from "../../../components/ReportCharts/Piechart";
import Clock from "../../../components/Clock/Clock/Clock";
import AreaChart from "../../../components/ReportCharts/AreaChart";
import ItemChart from "../../../components/ReportCharts/ItemChart";
import UsageChart from "../../../components/ReportCharts/UsageChart";
import FoodSelling from "../../../components/ReportCharts/FoodSelling";
import ItemSalesChart from "../../../components/ReportCharts/ItemSalesChart";

import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const pages = ["Dashboard"];
  const icon = "bi bi-house-up";

  const navigate = useNavigate();

  useEffect(() => {
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    if (!userName || !userEmail) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <>
      <Header />
      <Sidebar />
      <div className="dashboard-header">
        <PageTitle page="Dashboard" pages={pages} icon={icon} />
        <Clock />
      </div>
      <main id="main" className="main" style={{ marginTop: "5px" }}>
        <Cards />
        <section className="dashboard section">
          <div className="row">
            <div className="col-lg-6">
              <div className="row">
                <div className="col-12" style={{ marginTop: "30px" }}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">
                        <i className="bi bi-bar-chart-fill"></i>&nbsp;
                        <span>Food available quantity</span>
                      </h5>
                      <AreaChart />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row">
                <div className="col-12" style={{ marginTop: "30px" }}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">
                        <i className="bi bi-bar-chart-fill "></i>&nbsp;
                        <span>Handcraft available quantity</span>
                      </h5>
                      <ItemChart />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row">
                <div className="col-12" style={{ marginTop: "30px" }}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">
                        <i className="bi bi-bar-chart-fill "></i>&nbsp;
                        <span>Matrial Usage</span>
                      </h5>
                      <UsageChart />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row">
                <div className="col-12" style={{ marginTop: "30px" }}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">
                        <i className="bi bi-bar-chart-fill "></i>&nbsp;
                        <span>Material availability</span>
                      </h5>
                      <Piechart />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row">
                <div className="col-12" style={{ marginTop: "30px" }}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">
                        <i className="bi bi-bar-chart-fill "></i>&nbsp;
                        <span>Food Selling</span>
                      </h5>
                      <FoodSelling />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row">
                <div className="col-12" style={{ marginTop: "30px" }}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">
                        <i className="bi bi-bar-chart-fill "></i>&nbsp;
                        <span>Handcraft Selling</span>
                      </h5>
                      <ItemSalesChart />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Dashboard;
