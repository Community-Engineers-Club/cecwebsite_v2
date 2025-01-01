import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Graph = (props) => {
  // Props:
  // 'array' = array values to be graphed
  // 'name = Temperature OR Humidity

  // Prepare data for Chart.js
  const chartData = {
    labels: props.array.map((_, index) => index), // x-axis = indices for array
    datasets: [
      {
        label: props.type, // Type of data
        data: props.array, // y-axis data values
        backgroundColor: "red", // Fill color
        borderWidth: 2,
        pointRadius: 5,
        pointBackgroundColor: "red",
        tension: 0, // Curve smoothness
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Distribution of " + props.type,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Index",
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
        },
        beginAtZero: true, // Start y-axis at 0
      },
    },
  };

  return (
    <div style={{ width: "600px", margin: "auto" }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default Graph;