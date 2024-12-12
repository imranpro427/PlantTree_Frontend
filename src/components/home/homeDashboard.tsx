//@ts-nocheck
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
} from 'chart.js';
import { useSensorData } from "@/connection/Connect";
import CountUp from 'react-countup'; 
import TemperatureChart from "../Charts/TemperatureChart";
import HumidityChart from "../Charts/HumidityChart";
import {Spinner} from "../Loader/Spinner"

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const HomeDashboard = () => {
  const { data: sensorData, loading, error } = useSensorData();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner /> {/* Add spinner during data loading */}
      </div>
    );
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const totalLocations = new Set(sensorData.map((sensor) => sensor.location)).size;  // Unique locations
  const totalDataCollected = sensorData.length;
  const averageDataPerLocation = totalDataCollected / totalLocations || 0;

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-medium mb-4 text-center">Total number of Locations</h3>
          <div className="h-48">
            <Line
              data={{
                labels: ["a", "b", "c"],
                datasets: [
                  {
                    label: 'Number of Locations',
                    data: [1, 2, 4],
                    fill: false,
                    borderColor: 'rgb(3, 252, 7)', 
                    tension: 0.1,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    display: false,
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-center flex-col">
          <h3 className="text-lg font-medium mb-4">Average number of Data per Location</h3>
          <div className="text-center text-[50px] font-bold text-darkGreen mt-2">
            <CountUp end={averageDataPerLocation} duration={3} decimals={2} />+
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-center flex-col">
          <h3 className="text-lg font-medium mb-4">Total Data Collected</h3>
          <div className="text-center text-[50px] font-bold text-darkGreen mt-2">
            <CountUp end={totalDataCollected} duration={4} separator="," />+
          </div>
        </div>
      </div>

      <div className="pt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-4 w-full h-72">
          <div className="text-center text-lg font-medium mb-4">Temperature for all locations</div>
          <TemperatureChart data={sensorData} />
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 w-full">
          <div className="text-center text-lg font-medium mb-4">Humidity for all locations</div>
          <HumidityChart data={sensorData} />
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;
