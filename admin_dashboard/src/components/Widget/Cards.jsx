import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function Cards() {
  const [totalFoodSales, setTotalFoodSales] = useState(0);
  const [totalItemSales, setTotalItemSales] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  useEffect(() => {
    // Fetch total food sales
    axios
      .get("http://127.0.0.1:8000/api/dashboard/foodsale")
      .then((response) => {
        console.log("Total food sales response:", response.data);
        setTotalFoodSales(response.data.total_sales);
      })
      .catch((error) => {
        console.error("Error fetching total food sales:", error);
        setTotalFoodSales(0);
      });

    // Fetch total item sales
    axios
      .get("http://127.0.0.1:8000/api/dashboard/itemsale")
      .then((response) => {
        console.log("Total item sales response:", response.data);
        setTotalItemSales(response.data.total_sales);
      })
      .catch((error) => {
        console.error("Error fetching total item sales:", error);
        setTotalItemSales(0);
      });

    // Fetch total income
    axios
      .get("http://127.0.0.1:8000/api/dashboard/totalsale")
      .then((response) => {
        console.log("Total income response:", response.data);
        setTotalIncome(response.data.total_amount);
      })
      .catch((error) => {
        console.error("Error fetching total income:", error);
        setTotalIncome(0);
      });

    // Fetch total purchase
    axios
      .get("http://127.0.0.1:8000/api/dashboard/totalpurchase")
      .then((response) => {
        console.log("Total purchase response:", response.data);
        setTotalExpense(response.data.purchaseTotalAmount);
      })
      .catch((error) => {
        console.error("Error fetching total purchase:", error);
        setTotalExpense(0);
      });

    // Fetch total customers
    axios
      .get("http://127.0.0.1:8000/api/dashboard/totalcustomers")
      .then((response) => {
        console.log("Total customers response:", response.data);
        setTotalCustomers(response.data.total_customers);
      })
      .catch((error) => {
        console.error("Error fetching total customers:", error);
        setTotalCustomers(0);
      });
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-3 col-md-6">
          <div
            className="card mb-4"
            style={{ backgroundColor: "#00A86B", color: "white" }}
          >
            <div className="card-body">
              Total Food Sales
              <h2>{totalFoodSales}</h2>
            </div>
            <div className="card-footer d-flex align-items-center justify-content-between">
              <a
                className="small text-white stretched-link"
                href="/productsales"
              >
                View Details
              </a>

              <div className="small text-white">
                <i className="bi bi-chevron-right"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div
            className="card mb-4"
            style={{ backgroundColor: "#00A86B", color: "white" }}
          >
            <div className="card-body">
              Total Handcraft Sales
              <h2>{totalItemSales}</h2>
            </div>
            <div className="card-footer d-flex align-items-center justify-content-between">
              <a
                className="small text-white stretched-link"
                href="/productsales"
              >
                View Details
              </a>
              <div className="small text-white">
                <i className="bi bi-chevron-right"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div
            className="card mb-4"
            style={{ backgroundColor: "#00A86B", color: "white" }}
          >
            <div className="card-body">
              Total Customers
              <h2>{totalCustomers}</h2>
            </div>
            <div className="card-footer d-flex align-items-center justify-content-between">
              <a className="small text-white stretched-link" href="/buyers">
                View Details
              </a>
              <div className="small text-white">
                <i className="bi bi-chevron-right"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div
            className="card mb-4"
            style={{ backgroundColor: "#00A86B", color: "white" }}
          >
            <div className="card-body">
              Total Income(Rs)
              <h2>{totalIncome}</h2>
            </div>
            <div className="card-footer d-flex align-items-center justify-content-between">
              <a
                className="small text-white stretched-link"
                href="/productsales"
              >
                View Details
              </a>
              <div className="small text-white">
                <i className="bi bi-chevron-right"></i>
              </div>
            </div>
          </div>
        </div>

        {/*  <div className="col-xl-3 col-md-6">
          <div
            className="card mb-4"
            style={{ backgroundColor: "#00A86B", color: "white" }}
          >
            <div className="card-body">
              Total Expense(Rs)
              <h2>{totalExpense}</h2>
            </div>
            <div className="card-footer d-flex align-items-center justify-content-between">
              <a className="small text-white stretched-link" href="/purchase">
                View Details
              </a>
              <div className="small text-white">
                <i className="bi bi-chevron-right"></i>
              </div>
            </div>
          </div>
        </div>*/}
      </div>
    </div>
  );
}

export default Cards;
