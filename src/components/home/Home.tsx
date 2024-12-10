// @ts-nocheck
import Chart from "../Charts/Charts";
import HomeDashboard from "./homeDashboard";
import React, { useState } from "react";
import { IoHome } from "react-icons/io5";
import { FaMapLocationDot } from "react-icons/fa6";
import { PiPlantBold } from "react-icons/pi";
import { TbDeviceAnalytics } from "react-icons/tb";
import IndividualData from "../individual/IndividualData";
import { useSensorData } from "@/connection/Connect";

const App: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState("Home");
  const { data: sensorData, loading, error } = useSensorData();
  // Sidebar Items
  const sidebarItems = [
    { name: "Home", icon: <IoHome /> , description: "Home" },
    { name: "Individual", icon: <FaMapLocationDot />, description: "Individual" },
    { name: "Map", icon: <PiPlantBold />, description: "Plant Suggestion" },
    { name: "Reports", icon: <TbDeviceAnalytics />, description: "Reports" },
  ];

  return (
    <div className="h-screen bg-gray-300 flex justify-center items-center">
      {/* Container for Sidebar and Dashboard */}
      <div className="flex flex-col md:flex-row h-[95%] w-[95%] md:w-[90%] ">
        {/* Sidebar */}
        <aside className="w-full md:w-20 bg-gray-300 p-2 flex justify-center md:justify-start md:flex-col items-center md:items-center">
  <ul className="flex md:space-y-8 md:flex-col items-center justify-center h-full">
    {sidebarItems.map((item) => (
      <li
        key={item.name}
        onClick={() => setActiveMenu(item.name)}
        className={`group relative flex justify-center items-center p-2 md:rounded-md hover:bg-brightGreen cursor-pointer ${
          activeMenu === item.name ? "bg-brightGreen" : ""
        }`}
      >
        <span className="text-2xl md:text-3xl text-white">{item.icon}</span>

        {/* Tooltip (Positioned Below the Icon) */}
        <span
          className="absolute top-full mt-2 bg-darkGreen text-white text-xs md:text-sm rounded-md py-1 px-3 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          style={{ whiteSpace: "nowrap" }}
        >
          {item.description}
        </span>
      </li>
    ))}
  </ul>
</aside>


        {/* Main Dashboard Content */}
        <main className="flex-1 bg-gray-100 p-6 md:p-8 shadow-lg rounded-[40px] md:rounded-[100px] overflow-hidden">
          <div>
            <h2 className="text-lg md:text-[50px] pl-4 font-bold text-darkGreen">
              {activeMenu === "Home"
                ? "PlanTree"
                : `${activeMenu} Section`}
            </h2>
            <p className="mt-2 text-sm pl-4 md:text-base text-gray-700">
              {activeMenu === "Home" &&
                "Your one-stop solution for monitoring environmental health."}
              {activeMenu === "Individual" &&
                "Explore the data and search for specific information."}
              {activeMenu === "Map" &&
                "Visualize environmental data on the map."}
              {activeMenu === "Reports" &&
                "Generate detailed reports for analysis."}
            </p>
            {activeMenu === "Home" && (
              <div className="mt-6">
                <HomeDashboard />
              </div>
            )}
            {activeMenu === "Individual" ? <IndividualData data={sensorData}/>:""}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
