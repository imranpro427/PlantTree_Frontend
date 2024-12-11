//@ts-nocheck
import React from "react";
import Table from "../Tables/Table";
import { useSensorData } from "@/connection/Connect";
const Reports: React.FC<{ data: any }> = ({ data }) => {
  // const tableHeaders = ["Location", "Temperature (°C)", "Air Quality", "Humidity (%)"];
  // const locations = Object.keys(data);
  const {data: sensorData} = useSensorData();

  return (
    <div><Table data={sensorData} /></div>
  );
};

export default Reports;
