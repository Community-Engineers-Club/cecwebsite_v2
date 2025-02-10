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

/*
  Data input:
  data = [ {time: string, precipitation: number }, ... ]
*/

const Graph = ({ data }) => {

  const times = data.map((entry) => entry.time);
  const precipitation = data.map((entry) => entry.precipitation);

  // Chart Data configuration
  const chartData = {
    labels: times,
    datasets: [
      {
        label: "Precipitation (in)",
        data: precipitation, // y-axis data values
        backgroundColor: "rgba(0, 0, 255, 0.3", // Fill color
        borderWidth: 2,
        borderColor: "blue",
        pointRadius: 4,
        //pointBackgroundColor: "red",
        fill: true,
       //tension: smooth,
      },
    ],
  };

  // Chart Display Configuration
  const options = {
    responsive: true,
    scales: {
      x: { title: {display: true, text: "Time"} },
      y: { title: {display: true, text: "Precipitation (in)"} },
    },
  };

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default Graph;