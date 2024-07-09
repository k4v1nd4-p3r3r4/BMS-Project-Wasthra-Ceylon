import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

function ReportCharts() {
  const [foodSellingData, setFoodSellingData] = useState([]);
  const [itemSellingData, setItemSellingData] = useState([]);

  useEffect(() => {
    // Fetch total selling quantity of food items grouped by food ID
    axios
      .get("http://127.0.0.1:8000/api/sales/getTotalFoodSellingQtyByFoodId")
      .then((response) => {
        if (response.data && response.data.data) {
          setFoodSellingData(response.data.data);
        } else {
          console.error("Invalid food selling data:", response);
        }
      })
      .catch((error) => {
        console.error("Error fetching food selling data:", error);
      });

    // Fetch total selling quantity of items grouped by item ID
    axios
      .get("http://127.0.0.1:8000/api/sales/getTotalItemSellingQtyByItemId")
      .then((response) => {
        if (response.data && response.data.data) {
          setItemSellingData(response.data.data);
        } else {
          console.error("Invalid item selling data:", response);
        }
      })
      .catch((error) => {
        console.error("Error fetching item selling data:", error);
      });
  }, []);

  // Prepare data for combined bar chart
  const foodSeries = foodSellingData.map((data) => ({
    id: `F${data.food_id}`,
    qty: data.total_qty,
  }));

  const itemSeries = itemSellingData.map((data) => ({
    id: `H${data.item_id}`,
    qty: data.total_qty,
  }));

  const combinedSeries = [
    {
      name: "Food Selling Quantity",
      data: foodSeries.map((data) => data.qty),
    },
    {
      name: "Item Selling Quantity",
      data: itemSeries.map((data) => data.qty),
    },
  ];

  const categories = [];
  const maxLength = Math.max(foodSeries.length, itemSeries.length);

  for (let i = 0; i < maxLength; i++) {
    if (foodSeries[i]) {
      categories.push(foodSeries[i].id);
    }
    if (itemSeries[i]) {
      categories.push(itemSeries[i].id);
    }
  }

  const options = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      title: {
        text: "Quantity",
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    legend: {
      position: "top",
    },
  };

  return (
    <div className="sales-bar-chart">
      <Chart
        options={options}
        series={combinedSeries}
        type="bar"
        height={350}
      />
    </div>
  );
}

export default ReportCharts;
