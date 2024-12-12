"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-nocheck
var react_1 = require("react");
var react_chartjs_2_1 = require("react-chartjs-2");
var chart_js_1 = require("chart.js");
var Connect_1 = require("@/connection/Connect");
var react_countup_1 = require("react-countup");
var TemperatureChart_1 = require("../Charts/TemperatureChart");
var HumidityChart_1 = require("../Charts/HumidityChart");
var Spinner_1 = require("../Loader/Spinner");
// Register necessary Chart.js components
chart_js_1.Chart.register(chart_js_1.CategoryScale, chart_js_1.LinearScale, chart_js_1.PointElement, chart_js_1.LineElement, chart_js_1.Title, chart_js_1.Tooltip, chart_js_1.Legend);
var HomeDashboard = function () {
    var _a = (0, Connect_1.useSensorData)(), sensorData = _a.data, loading = _a.loading, error = _a.error;
    if (loading) {
        return (react_1.default.createElement("div", { className: "flex justify-center items-center h-screen" },
            react_1.default.createElement(Spinner_1.Spinner, null),
            " "));
    }
    if (error) {
        return react_1.default.createElement("p", null,
            "Error: ",
            error.message);
    }
    var totalLocations = new Set(sensorData.map(function (sensor) { return sensor.location; })).size; // Unique locations
    var totalDataCollected = sensorData.length;
    var averageDataPerLocation = totalDataCollected / totalLocations || 0;
    return (react_1.default.createElement("div", { className: "" },
        react_1.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" },
            react_1.default.createElement("div", { className: "bg-white shadow-md rounded-lg p-4" },
                react_1.default.createElement("h3", { className: "text-lg font-medium mb-4 text-center" }, "Total number of Locations"),
                react_1.default.createElement("div", { className: "h-48" },
                    react_1.default.createElement(react_chartjs_2_1.Line, { data: {
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
                        }, options: {
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
                        } }))),
            react_1.default.createElement("div", { className: "bg-white shadow-md rounded-lg p-4 flex items-center justify-center flex-col" },
                react_1.default.createElement("h3", { className: "text-lg font-medium mb-4" }, "Average number of Data per Location"),
                react_1.default.createElement("div", { className: "text-center text-[50px] font-bold text-darkGreen mt-2" },
                    react_1.default.createElement(react_countup_1.default, { end: averageDataPerLocation, duration: 3, decimals: 2 }),
                    "+")),
            react_1.default.createElement("div", { className: "bg-white shadow-md rounded-lg p-4 flex items-center justify-center flex-col" },
                react_1.default.createElement("h3", { className: "text-lg font-medium mb-4" }, "Total Data Collected"),
                react_1.default.createElement("div", { className: "text-center text-[50px] font-bold text-darkGreen mt-2" },
                    react_1.default.createElement(react_countup_1.default, { end: totalDataCollected, duration: 4, separator: "," }),
                    "+"))),
        react_1.default.createElement("div", { className: "pt-5 grid grid-cols-1 md:grid-cols-2 gap-6" },
            react_1.default.createElement("div", { className: "bg-white shadow-md rounded-lg p-4 w-full h-72" },
                react_1.default.createElement("div", { className: "text-center text-lg font-medium mb-4" }, "Temperature for all locations"),
                react_1.default.createElement(TemperatureChart_1.default, { data: sensorData })),
            react_1.default.createElement("div", { className: "bg-white shadow-md rounded-lg p-4 w-full" },
                react_1.default.createElement("div", { className: "text-center text-lg font-medium mb-4" }, "Humidity for all locations"),
                react_1.default.createElement(HumidityChart_1.default, { data: sensorData })))));
};
exports.default = HomeDashboard;
