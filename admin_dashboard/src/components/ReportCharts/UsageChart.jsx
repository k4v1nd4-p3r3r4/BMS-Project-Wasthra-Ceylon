import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

const UsageChartByMaterialName = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchUsageData();
  }, []);

  const fetchUsageData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/materialcharts/getUsageQtyByMaterialName"
      );
      setData(response.data.data); // Assuming API response structure is { status: 200, data: [...] }
    } catch (error) {
      console.error("Error fetching usage data:", error);
    }
  };

  // Prepare data for Area Chart
  const chartData = {
    series: [
      {
        name: "Usage Quantities",
        data: data.map((item) => item.total_usage_qty),
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: data.map((item) => item.material_name),
        title: {
          text: "Material Name",
        },
      },
      yaxis: {
        title: {
          text: "Total Usage Quantity",
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " units";
          },
        },
      },
    },
  };

  return (
    <div className="area-chart">
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="area"
        height={350}
      />
    </div>
  );
};

export default UsageChartByMaterialName;
