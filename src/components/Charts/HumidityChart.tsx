//@ts-nocheck
import * as React from 'react'
import { useEffect } from 'react'
import { Line } from 'react-chartjs-2';
import { Filler } from 'chart.js';
import moment from 'moment';
import Individuals from "./Individuals"




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



const HumidityChart = ({data}) => {
	const sevenDaysAgo = moment().utc().subtract(7,'days')
	const filteredData = data.filter((entry)=>{
		const entryDate = moment.utc(entry.timestamp)
		return entryDate.isAfter(sevenDaysAgo)
	})


	const location1Data = filteredData.filter(sens => sens.location === "Scheme 33")
	const location2Data = filteredData.filter(sens=> sens.location === "New Karachi")
	const location3Data = filteredData.filter(sens=> sens.location === "Fast Uni")
	const location4Data = filteredData.filter(sens=> sens.location === "Shah Faisal")
	
	const chartData = {
		labels: location1Data.map((entry)=>moment.utc(entry.timestamp).format("YYYY-MM-DD HH:mm:ss")),
		datasets:[
			{
				label:"Scheme33",
				data: location1Data.map((entry)=>entry.humidity),
				borderColor: 'rgb(255, 99, 132)',
        		backgroundColor: 'rgba(255, 99, 132, 0.2)',
        		fill: true,
			},
			{
				label:"NewKarachi",
				data: location2Data.map((entry)=>entry.humidity),
				borderColor: 'rgb(4, 115, 133)',
        		backgroundColor: 'rgba(4, 115, 133, 0.2)',
        		fill: true,
			},
			{
				label:"Fast Uni",
				data: location3Data.map((sens)=>sens.humidity),
				borderColor: 'rgb(128, 99, 255)',
        		backgroundColor: 'rgba(128, 99, 255, 0.2)',
        		fill: true,
			},
			{
				label:"Shah Faisal",
				data: location4Data.map((sens)=>sens.humidity),
				borderColor: 'rgb(47, 255, 0)',
        		backgroundColor: 'rgba(128, 99, 255, 0.2)',
        		fill: true,
			}
		]
	}
	useEffect(()=>{
		data.map((sens)=>{
			// console.log(sens.location)
			// console.log(sens.temperature)
		});
	},[data])
	return (
	<div>
		{/* for individual temperatures of different areas */}
		{/* <Individuals data={data} name="New Karachi" dataKey="temperature" chartTitle="Temperature" />
		<Individuals data={data} name="Shah Faisal" dataKey="temperature" chartTitle="Temperature" />
		<Individuals data={data} name="Fast Uni" dataKey="temperature" chartTitle="Temperature" />
		<Individuals data={data} name="Scheme 33" dataKey="temperature" chartTitle="Temperature" />
		<hr />
		<h2 className=' text-2xl font-bold text-center'> Air Qualities</h2>
		<Individuals data={data} name="New Karachi" dataKey="mq135" chartTitle="Air Quality" />
		<Individuals data={data} name="Shah Faisal" dataKey="mq135" chartTitle="Air Quality" />
		<Individuals data={data} name="Fast Uni" dataKey="mq135" chartTitle="Air Quality" />
		<Individuals data={data} name="Scheme 33" dataKey="mq135" chartTitle="Air Quality" />
		<hr />
		<h2 className=' text-2xl font-bold text-center'> Humidity</h2>
		<Individuals data={data} name="New Karachi" dataKey="humidity" chartTitle="Humidity" />
		<Individuals data={data} name="Shah Faisal" dataKey="humidity" chartTitle="Humidity" />
		<Individuals data={data} name="Fast Uni" dataKey="humidity" chartTitle="Humidity" />
		<Individuals data={data} name="Scheme 33" dataKey="humidity" chartTitle="Humidity" /> */}
	  <Line data={chartData} />
	</div>
  )
}


export default HumidityChart;
