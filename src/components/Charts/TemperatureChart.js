"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-nocheck
var react_1 = require("react");
var react_2 = require("react");
var react_chartjs_2_1 = require("react-chartjs-2");
var chart_js_1 = require("chart.js");
var moment_1 = require("moment");
var chart_js_2 = require("chart.js");
chart_js_2.Chart.register(chart_js_1.Filler, chart_js_2.LineElement, chart_js_2.PointElement, chart_js_2.CategoryScale, chart_js_2.LinearScale, chart_js_2.Tooltip, chart_js_2.Legend);
var TemperatureChart = function (_a) {
    var data = _a.data;
    // Compute the start date for the last 7 days
    var sevenDaysAgo = (0, moment_1.default)().utc().subtract(7, 'days');
    // Filter the data for the last 7 days
    var filteredData = data.filter(function (entry) {
        var entryDate = moment_1.default.utc(entry.timestamp);
        return entryDate.isAfter(sevenDaysAgo);
    });
    // Filter data by location
    var location1Data = filteredData.filter(function (sens) { return sens.location === "Scheme 33"; });
    var location2Data = filteredData.filter(function (sens) { return sens.location === "New Karachi"; });
    var location3Data = filteredData.filter(function (sens) { return sens.location === "Fast Uni"; });
    var location4Data = filteredData.filter(function (sens) { return sens.location === "Shah Faisal"; });
    // Prepare chart data
    var chartData = {
        labels: location1Data.map(function (entry) { return moment_1.default.utc(entry.timestamp).format("YYYY-MM-DD HH:mm:ss"); }),
        datasets: [
            {
                label: "Scheme 33",
                data: location1Data.map(function (entry) { return entry.temperature; }),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
            },
            {
                label: "New Karachi",
                data: location2Data.map(function (entry) { return entry.temperature; }),
                borderColor: 'rgb(4, 115, 133)',
                backgroundColor: 'rgba(4, 115, 133, 0.2)',
                fill: true,
            },
            {
                label: "Fast Uni",
                data: location3Data.map(function (sens) { return sens.temperature; }),
                borderColor: 'rgb(128, 99, 255)',
                backgroundColor: 'rgba(128, 99, 255, 0.2)',
                fill: true,
            },
            {
                label: "Shah Faisal",
                data: location4Data.map(function (sens) { return sens.temperature; }),
                borderColor: 'rgb(47, 255, 0)',
                backgroundColor: 'rgba(47, 255, 0, 0.2)',
                fill: true,
            },
        ],
    };
    (0, react_2.useEffect)(function () {
        // Debugging log to check filtered data
        console.log('Filtered Data:', filteredData);
    }, [filteredData]);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(react_chartjs_2_1.Line, { data: chartData })));
};
exports.default = TemperatureChart;
