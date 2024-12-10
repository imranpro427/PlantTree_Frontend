//@ts-nocheck
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

const IndividualData = ({ data }) => {
  console.log(data);
  const [selectedLocation, setSelectedLocation] = useState("New Karachi");
  const [selectedTimeRange, setSelectedTimeRange] = useState("1 Week");
  const [filteredData, setFilteredData] = useState([]);
  const [recentData, setRecentData] = useState(null);

  // Time range mapping
  const timeRangeMapping = {
    "1 Day": 1,
    "1 Week": 7,
    "1 Month": 30,
    "2 Months": 60,
    "Total": Infinity,
  };

  // filter data
  useEffect(() => {
    const currentDate = moment();
    const range = timeRangeMapping[selectedTimeRange];

    const filtered = data.filter(entry => {
      const entryDate = moment.utc(entry.timestamp);
      const withinRange = range === Infinity || entryDate.isAfter(currentDate.clone().subtract(range, 'days'));
      return withinRange && entry.location === selectedLocation;
    });

    setFilteredData(filtered);

    const recent = data
      .filter(entry => entry.location === selectedLocation)
      .sort((a, b) => moment.utc(b.timestamp).diff(moment.utc(a.timestamp)))[0];
    setRecentData(recent);
  }, [selectedLocation, selectedTimeRange, data]);

  // Prepare chart data
  const prepareChartData = (key) => ({
    labels: filteredData.map(entry => moment.utc(entry.timestamp).format("YYYY-MM-DD HH:mm")),
    datasets: [
      {
        data: filteredData.map(entry => entry[key]),
        borderColor: 'rgb(3, 252, 28)',
        backgroundColor: 'rgba(3, 252, 28, 0.2)',
        fill: true,
      }
    ]
  });

  const chartOptions = {
  plugins: {
    legend: {
      display: false, // Hide legend
    },
  },
  scales: {
    x: {
      display: false, // Hide x-axis labels
    },
    y: {
      display: true, // Hide y-axis labels
    },
  },
};

  // Suggestions based on data
  const generateSuggestion = () => {
    if (!recentData) return "No recent data available.";
    if (recentData.airQuality < 50) return true;
    if (recentData.airQuality >= 50 && recentData.airQuality < 100) return false;
    return false;
  };

  return (
    <div>
      <div className="header flex justify-between px-4">
        <h2>Individual Data</h2>
        <div className="filters">
          <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
            <option value="New Karachi">New Karachi</option>
            <option value="Scheme 33">Scheme 33</option>
            <option value="Shah Faisal">Shah Faisal</option>
            <option value="Fast Uni">Fast Uni</option>
          </select>
          <select value={selectedTimeRange} onChange={(e) => setSelectedTimeRange(e.target.value)}>
            <option value="1 Day">1 Day</option>
            <option value="1 Week">1 Week</option>
            <option value="1 Month">1 Month</option>
            <option value="2 Months">2 Months</option>
            <option value="Total">Total</option>
          </select>
        </div>
      </div>
      <div className=' cards-grid grid grid-cols-2 md:grid-cols-3 gap-4 mt-5'>
        <div className=' card p-4 shadow rounded-md'>
          <div className=' text-center text-xl font-bold mb-4 text-darkGreen'> Temperature</div>
          <Line data={prepareChartData("temperature")} options={chartOptions} />
        </div>
        <div className=' card p-4 shadow rounded-md'>
          <div className=' text-center text-xl font-bold mb-4 text-darkGreen'> Humidity</div>
          <Line data={prepareChartData("humidity")} options={chartOptions} />
        </div>
        <div className=' card p-4 shadow rounded-md'>
          <div className='text-center text-xl font-bold mb-4 text-darkGreen'> Air Quality</div>
          <Line data={prepareChartData("mq135")} options={chartOptions} />
        </div>
      </div>
      <div className=' cards-grid grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 '>
        <div className=' card p-4 shadow rounded-md hover:z-10'>
          <div className=' text-center text-xl mb-4 font-bold text-darkGreen'>Recent Data</div>
          {recentData?(
            <div className=' text-[20px]'>
            <p><strong>Temperature: </strong> {recentData.temperature} °C</p>
            <p><strong>Humidity: </strong> {recentData.humidity} </p>
            <p><strong>AirQuality: </strong> {recentData.mq135} </p>
            <p><strong>Time (UTC):</strong> {moment.utc(recentData.timestamp).format("YYYY-MM-DD HH:mm:ss")}</p>
            </div>
          ):(                                     
            <p>No recent Data available</p>
          )}
        </div>
        <div className=' card p-4 shadow rounded-sm'>
          <div className=' text-center text-xl mb-4 font-bold text-darkGreen'>Analysis</div>
          <div className=' text-center text-[30px] text-red-600'>
            {generateSuggestion() === true && "Air Quality is Perfect"}
            {generateSuggestion() === false && "Air Quality needs improvement"}
            {generateSuggestion() === "No recent data available." && "No recent data available."}
          </div>

        </div>
      </div>
    </div>
  );
};

export default IndividualData;
