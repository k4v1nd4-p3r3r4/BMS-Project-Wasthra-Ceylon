import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

function FoodSelling() {
  const [foodSellingData, setFoodSellingData] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading status

  useEffect(() => {
    fetchFoodSellingData();
  }, []);

  const fetchFoodSellingData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/manucharts/getTotalFoodSellingQtyByFoodName"
      );
      console.log("API Response:", response.data);
      setFoodSellingData(response.data.data);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching food selling data:", error);
      setLoading(false); // Set loading to false on error as well
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading indicator while fetching data
  }

  // Prepare series data for bar chart
  const seriesData = [
    {
      name: "Total Quantity Sold",
      data: foodSellingData.map((data) => data.total_qty),
    },
  ];

  // Extract food names for x-axis categories
  const foodNames = foodSellingData.map((data) => data.food_name);

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
        text: "Quantity Sold",
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

export default FoodSelling;
