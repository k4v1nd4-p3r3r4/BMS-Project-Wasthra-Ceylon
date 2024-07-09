import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

function AreaChartByFoodName() {
  const [foodData, setFoodData] = useState([]);

  useEffect(() => {
    // Fetch available quantity of food items grouped by food name
    axios
      .get("http://127.0.0.1:8000/api/manucharts/getAvailableQtyByFoodName")
      .then((response) => {
        console.log("API Response:", response.data); // Log the API response
        setFoodData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching food data:", error);
      });
  }, []);

  // Prepare series data for bar chart
  const seriesData = [
    {
      name: "Total Quantity",
      data: foodData ? foodData.map((data) => data.total_qty) : [],
    },
  ];

  // Extract food names for x-axis categories
  const foodNames = foodData ? foodData.map((data) => data.food_name) : [];

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
      categories: foodNames,
    },
    yaxis: {
      title: {
        text: "Quantity",
      },
    },
    fill: {
      opacity: 1,
      colors: ["#FFA07A"], // Light salmon color for the bar
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

export default AreaChartByFoodName;
