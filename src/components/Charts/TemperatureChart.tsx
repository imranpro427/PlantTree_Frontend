//@ts-nocheck
import React from 'react';
import { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Filler } from 'chart.js';
import moment from 'moment';

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  Filler,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const TemperatureChart = ({ data }) => {
  // Compute the start date for the last 7 days
  const sevenDaysAgo = moment().utc().subtract(7, 'days');

  // Filter the data for the last 7 days
  const filteredData = data.filter((entry) => {
    const entryDate = moment.utc(entry.timestamp);
    return entryDate.isAfter(sevenDaysAgo);
  });

  // Filter data by location
  const location1Data = filteredData.filter(sens => sens.location === "Scheme 33");
  const location2Data = filteredData.filter(sens => sens.location === "New Karachi");
  const location3Data = filteredData.filter(sens => sens.location === "Fast Uni");
  const location4Data = filteredData.filter(sens => sens.location === "Shah Faisal");

  
  // Prepare chart data
  const chartData = {
    labels: location1Data.map(entry => moment.utc(entry.timestamp).format("YYYY-MM-DD HH:mm:ss")),
    datasets: [
      {
        label: "Scheme 33",
        data: location1Data.map(entry => entry.temperature),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
      {
        label: "New Karachi",
        data: location2Data.map(entry => entry.temperature),
        borderColor: 'rgb(4, 115, 133)',
        backgroundColor: 'rgba(4, 115, 133, 0.2)',
        fill: true,
      },
      {
        label: "Fast Uni",
        data: location3Data.map(sens => sens.temperature),
        borderColor: 'rgb(128, 99, 255)',
        backgroundColor: 'rgba(128, 99, 255, 0.2)',
        fill: true,
      },
      {
        label: "Shah Faisal",
        data: location4Data.map(sens => sens.temperature),
        borderColor: 'rgb(47, 255, 0)',
        backgroundColor: 'rgba(47, 255, 0, 0.2)',
        fill: true,
      },
    ],
  };

  useEffect(() => {
    // Debugging log to check filtered data
    console.log('Filtered Data:', filteredData);
  }, [filteredData]);

  return (
    <div>
      <Line data={chartData} />
    </div>
  );
};

export default TemperatureChart;
