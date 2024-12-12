"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var homeDashboard_1 = require("./homeDashboard");
var react_1 = require("react");
var io5_1 = require("react-icons/io5");
var fa6_1 = require("react-icons/fa6");
var pi_1 = require("react-icons/pi");
var tb_1 = require("react-icons/tb");
var IndividualData_1 = require("../individual/IndividualData");
var Connect_1 = require("@/connection/Connect");
var Report_1 = require("../Reports/Report");
var plantree_03_svg_1 = require("../../assets/Plantree/Full Logo/Svg/plantree-03.svg");
var react_router_dom_1 = require("react-router-dom");
var App = function () {
    var _a = (0, react_1.useState)("Home"), activeMenu = _a[0], setActiveMenu = _a[1];
    var sensorData = (0, Connect_1.useSensorData)().data;
    var _b = (0, react_1.useState)(false), tooltipVisible = _b[0], setTooltipVisible = _b[1];
    var navigate = (0, react_router_dom_1.useNavigate)();
    var sidebarItems = [
        { name: "Home", icon: react_1.default.createElement(io5_1.IoHome, null), description: "Home" },
        { name: "Individual", icon: react_1.default.createElement(fa6_1.FaMapLocationDot, null), description: "Individual" },
        { name: "Map", icon: react_1.default.createElement(pi_1.PiPlantBold, null), description: "Plant Suggestion" },
        { name: "Reports", icon: react_1.default.createElement(tb_1.TbDeviceAnalytics, null), description: "Reports" },
    ];
    var handleItemClick = function (itemName) {
        if (itemName === "Map") {
            setTooltipVisible(true);
            setTimeout(function () { return setTooltipVisible(false); }, 2000);
        }
        else {
            setActiveMenu(itemName);
        }
    };
    return (react_1.default.createElement("div", { className: " h-screen bg-gray-400 flex justify-center items-center overflow-hidden" },
        react_1.default.createElement("div", { className: "flex flex-col md:flex-row h-[95%] w-full md:w-[90%] " },
            react_1.default.createElement("aside", { className: "w-full md:w-20 bg-gray-400 p-2 flex justify-center md:justify-start md:flex-col items-center" },
                react_1.default.createElement("ul", { className: "flex md:space-y-8 md:flex-col items-center justify-center h-full" }, sidebarItems.map(function (item) { return (react_1.default.createElement("li", { key: item.name, onClick: function () { return handleItemClick(item.name); }, className: "group relative flex justify-center items-center p-2 md:rounded-md hover:scale-125 hover:bg-brightGreen cursor-pointer \n                ".concat(activeMenu === item.name ? "bg-brightGreen" : "", " transform transition-all duration-200 ease-in-out") },
                    react_1.default.createElement("span", { className: "text-2xl md:text-3xl text-white" }, item.icon),
                    react_1.default.createElement("span", { className: "absolute top-full mt-2 bg-darkGreen text-white text-xs md:text-sm rounded-md py-1 px-3 shadow-md transition-opacity duration-300 z-10 ".concat(item.name === "Map" && tooltipVisible
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"), style: { whiteSpace: "nowrap" } }, item.name === "Map" && tooltipVisible ? "Coming Soon" : item.description))); }))),
            react_1.default.createElement("main", { className: "flex-1 bg-gray-100 p-6 md:p-8 shadow-lg rounded-[40px] md:rounded-[80px] overflow-y-auto" },
                react_1.default.createElement("div", null,
                    react_1.default.createElement("div", { className: "w-full flex flex-col items-center space-y-2" },
                        react_1.default.createElement("img", { src: plantree_03_svg_1.default, alt: "PlanTree Logo", className: "h-20 object-contain hover:cursor-pointer", onClick: function () { return navigate("/"); } }),
                        react_1.default.createElement("h2", { className: "text-lg md:text-xl font-semibold text-darkGreen" }, activeMenu === "Home"
                            ? "Welcome to PlanTree"
                            : "".concat(activeMenu, " Section"))),
                    react_1.default.createElement("p", { className: "mt-2 text-sm md:text-base text-gray-700" },
                        activeMenu === "Home" &&
                            "Your one-stop solution for monitoring environmental health.",
                        activeMenu === "Individual" &&
                            "Explore the data and search for specific information.",
                        activeMenu === "Map" &&
                            "Visualize environmental data on the map.",
                        activeMenu === "Reports" &&
                            "Generate detailed reports for analysis."),
                    activeMenu === "Home" && (react_1.default.createElement("div", { className: "mt-6" },
                        react_1.default.createElement(homeDashboard_1.default, null))),
                    activeMenu === "Individual" && react_1.default.createElement(IndividualData_1.default, { data: sensorData }),
                    activeMenu === "Reports" && react_1.default.createElement(Report_1.default, { data: sensorData }))))));
};
exports.default = App;
