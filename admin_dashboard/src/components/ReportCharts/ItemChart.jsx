import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

function ItemChart() {
  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    // Fetch available quantity of items grouped by item name
    axios
      .get("http://127.0.0.1:8000/api/manucharts/getAvailableQtyByItemName")
      .then((response) => {
        setItemData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching item data:", error);
      });
  }, []);

  // Prepare series data for bar chart
  const seriesData = [
    {
      name: "Total Quantity",
      data: itemData.map((data) => data.total_qty),
    },
  ];

  // Extract item names for x-axis categories
  const itemNames = itemData.map((data) => data.item_name);

  // Options for the bar chart
  const options = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "10%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + " units";
      },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: itemNames,
    },
    yaxis: {
      title: {
        text: "Quantity",
      },
    },
    fill: {
      opacity: 1,
      colors: ["#ADD8E6"], // Light blue color for the bar
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " units";
        },
      },
    },
  };

  return (
    <div>
      <Chart options={options} series={seriesData} type="bar" height={350} />
    </div>
  );
}

export default ItemChart;
