//@ts-nocheck
import Chart from "../Charts/Charts";
import HomeDashboard from "./homeDashboard";
import React, { useState } from "react";
import { IoHome } from "react-icons/io5";
import { FaMapLocationDot } from "react-icons/fa6";
import { PiPlantBold } from "react-icons/pi";
import { TbDeviceAnalytics } from "react-icons/tb";
import IndividualData from "../individual/IndividualData";
import { useSensorData } from "@/connection/Connect";
import Report from "../Reports/Report";
import Logo from "../../assets/Plantree/Full Logo/Svg/plantree-03.svg";
import { useNavigate } from "react-router-dom";

const App: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState("Home");
  const { data: sensorData } = useSensorData();
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  const sidebarItems = [
    { name: "Home", icon: <IoHome />, description: "Home" },
    { name: "Individual", icon: <FaMapLocationDot />, description: "Individual" },
    { name: "Map", icon: <PiPlantBold />, description: "Plant Suggestion" },
    { name: "Reports", icon: <TbDeviceAnalytics />, description: "Reports" },
  ];

  const handleItemClick = (itemName: string) => {
    if (itemName === "Map") {
      setTooltipVisible(true);
      setTimeout(() => setTooltipVisible(false), 2000);
    } else {
      setActiveMenu(itemName);
    }
  };

  return (
    <div className=" h-screen bg-gray-400 flex justify-center items-center overflow-hidden">
      {/* Container for Sidebar and Dashboard */}
      <div className="flex flex-col md:flex-row h-[95%] w-full md:w-[90%] ">
        {/* Sidebar */}
        <aside className="w-full md:w-20 bg-gray-400 p-2 flex justify-center md:justify-start md:flex-col items-center">
          <ul className="flex md:space-y-8 md:flex-col items-center justify-center h-full">
            {sidebarItems.map((item) => (
              <li
                key={item.name}
                onClick={() => handleItemClick(item.name)}
                className={`group relative flex justify-center items-center p-2 md:rounded-md hover:scale-125 hover:bg-brightGreen cursor-pointer 
                ${activeMenu === item.name ? "bg-brightGreen" : ""} transform transition-all duration-200 ease-in-out`}
              >
                <span className="text-2xl md:text-3xl text-white">{item.icon}</span>
                <span
                  className={`absolute top-full mt-2 bg-darkGreen text-white text-xs md:text-sm rounded-md py-1 px-3 shadow-md transition-opacity duration-300 z-10 ${
                    item.name === "Map" && tooltipVisible
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                  style={{ whiteSpace: "nowrap" }}
                >
                  {item.name === "Map" && tooltipVisible ? "Coming Soon" : item.description}
                </span>
              </li>
            ))}
          </ul>

        </aside>

        {/* Main Dashboard Content */}
        <main className="flex-1 bg-gray-100 p-6 md:p-8 shadow-lg rounded-[40px] md:rounded-[80px] overflow-y-auto">
          <div>
            <div className="w-full flex flex-col items-center space-y-2">
              <img
                src={Logo}
                alt="PlanTree Logo"
                className="h-20 object-contain hover:cursor-pointer"
                onClick={()=>navigate("/")}
              />
              <h2 className="text-lg md:text-xl font-semibold text-darkGreen">
                {activeMenu === "Home"
                  ? "Welcome to PlanTree"
                  : `${activeMenu} Section`}
              </h2>
            </div>
            <p className="mt-2 text-sm md:text-base text-gray-700">
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
            {activeMenu === "Individual" && <IndividualData data={sensorData} />}
            {activeMenu === "Reports" && <Report data={sensorData} />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
