//@ts-nocheck
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";
import { FaTemperatureLow } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { MdAir } from "react-icons/md";

const IndividualData = ({ data }) => {
  const [selectedLocation, setSelectedLocation] = useState("New Karachi");
  const [selectedTimeRange, setSelectedTimeRange] = useState("1 Week");
  const [filteredData, setFilteredData] = useState([]);
  const [recentData, setRecentData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Time range mapping
  const timeRangeMapping = {
    "1 Day": 1,
    "1 Week": 7,
    "1 Month": 30,
    "2 Months": 60,
    Total: Infinity,
  };

  // Filter data
  useEffect(() => {
    setLoading(true);
    const currentDate = moment();
    const range = timeRangeMapping[selectedTimeRange];

    const filtered = data.filter((entry) => {
      const entryDate = moment.utc(entry.timestamp);
      const withinRange =
        range === Infinity ||
        entryDate.isAfter(currentDate.clone().subtract(range, "days"));
      return withinRange && entry.location === selectedLocation;
    });

    setFilteredData(filtered);

    const recent = data
      .filter((entry) => entry.location === selectedLocation)
      .sort((a, b) =>
        moment.utc(b.timestamp).diff(moment.utc(a.timestamp))
      )[0];
    setRecentData(recent);

    setTimeout(() => setLoading(false), 1500); // Simulate loading
  }, [selectedLocation, selectedTimeRange, data]);

  // Prepare chart data
  const prepareChartData = (key) => ({
    labels: filteredData.map((entry) =>
      moment.utc(entry.timestamp).format("YYYY-MM-DD HH:mm")
    ),
    datasets: [
      {
        data: filteredData.map((entry) => entry[key]),
        borderColor: "rgb(3, 252, 28)",
        backgroundColor: "rgba(3, 252, 28, 0.2)",
        fill: true,
      },
    ],
  });

  const chartOptions = {
    plugins: { legend: { display: false } },
    scales: { x: { display: false }, y: { display: true } },
  };

  // Suggestions based on data
  const generateSuggestion = () => {
    if (!recentData) return "No recent data available.";
    if (recentData.airQuality < 50) return true;
    if (recentData.airQuality >= 50 && recentData.airQuality < 100) return false;
    return false;
  };

  // Skeleton Loader
  const SkeletonLoader = ({ className }) => (
    <div className={`${className} bg-gray-200 animate-pulse rounded-md`} />
  );

  return (
    <div>
      <div className="header flex justify-between px-4">
        <h2>Individual Data</h2>
        <div className="filters md:space-x-4">
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-[180px] p-2 border rounded-md"
          >
            <option value="" disabled>
              Select a Location
            </option>
            <option value="New Karachi">New Karachi</option>
            <option value="Scheme 33">Scheme 33</option>
            <option value="Shah Faisal">Shah Faisal</option>
            <option value="Fast Uni">Fast Uni</option>
          </select>

          <select
            className="w-[180px] p-2 border rounded-md"
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
          >
            <option value="1 Day">1 Day</option>
            <option value="1 Week">1 Week</option>
            <option value="1 Month">1 Month</option>
            <option value="2 Months">2 Months</option>
            <option value="Total">Total</option>
          </select>
        </div>
      </div>

      <div className="cards-grid grid grid-cols-2 md:grid-cols-3 gap-4 mt-5">
        {loading
          ? Array(3)
              .fill()
              .map((_, index) => (
                <SkeletonLoader
                  key={index}
                  className="h-[250px] shadow rounded-md"
                />
              ))
          : ["temperature", "humidity", "mq135"].map((key, index) => (
              <div key={index} className="card p-4 shadow rounded-md">
                <div className="text-center text-xl font-bold mb-4 text-darkGreen">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </div>
                <Line data={prepareChartData(key)} options={chartOptions} />
              </div>
            ))}
      </div>

      <div className="cards-grid grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {loading ? (
          <>
            <SkeletonLoader className="h-[200px] shadow rounded-md" />
            <SkeletonLoader className="h-[200px] shadow rounded-md" />
          </>
        ) : (
          <>
            <div className="card p-4 shadow rounded-md hover:z-10">
              <div className="text-center text-xl mb-4 font-bold text-darkGreen">
                Recent Data
              </div>
              {recentData ? (
                <div className="text-[20px]">
                  <div className="flex items-center gap-x-4">
                    <div>
                      <strong>Temperature: </strong>
                    </div>
                    <div>
                      <FaTemperatureLow />
                    </div>
                    <div>{recentData.temperature} °C</div>
                  </div>
                  <div className="flex items-center gap-x-4">
                    <div>
                      <strong>Humidity: </strong>
                    </div>
                    <div className="md:text-3xl">
                      <WiHumidity />
                    </div>
                    <div>{recentData.humidity}</div>
                  </div>
                  <div className="flex items-center gap-x-4">
                    <div>
                      <strong>AirQuality: </strong>
                    </div>
                    <div>
                      <MdAir />
                    </div>
                    <div>{recentData.mq135}</div>
                  </div>
                  <p>
                    <strong>Time (UTC):</strong>{" "}
                    {moment
                      .utc(recentData.timestamp)
                      .format("YYYY-MM-DD HH:mm:ss")}
                  </p>
                </div>
              ) : (
                <p>No recent data available</p>
              )}
            </div>
            <div className="card p-4 shadow rounded-sm">
              <div className="text-center text-xl mb-4 font-bold text-darkGreen">
                Analysis
              </div>
              <div className="text-center text-[30px] text-red-600">
                {generateSuggestion() === true && "Air Quality is Perfect"}
                {generateSuggestion() === false &&
                  "Air Quality needs improvement"}
                {generateSuggestion() === "No recent data available." &&
                  "No recent data available."}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default IndividualData;
