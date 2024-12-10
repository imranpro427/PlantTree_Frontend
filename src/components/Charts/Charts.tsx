import * as React from 'react';
import {useEffect,useState} from 'react';
import axios from "axios";
import TemperatureChart from './TemperatureChart';
import Table from '../Tables/Table';
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
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);



function Charts() {
	const [sensorData, setSensorData] = useState([]);
	useEffect(()=>{
		axios.get("https://plan-tree-amber.vercel.app/sensor-data")
		.then((response)=>{
			// console.log(response.data);
			setSensorData(response.data);
		})
		.catch((error)=>{console.log("Getting while fetching the daata from database, ",error)})
	},[]);


  return (
	<div>
	  {/* {sensorData.length > 0 ? (
		<ul>
			{sensorData.map((sensor)=>(
				<li key={sensor._id}>
					Location: {sensor.location}, Temperature: {sensor.temperature}°C,
					Humidity: {sensor.humidity}, Air Quality:{sensor.mq135}
				</li>
			))}
		</ul>
	  ) : ( <p> No data available</p>) } */}

	  <TemperatureChart data={sensorData} />
	  <h2 className="text-2xl font-bold mt-8">Data in Table Format</h2>
	  <div className=' flex items-center justify-center'>

	  <Table data={sensorData} />
	  </div>
	</div>
  )
}

export default Charts
