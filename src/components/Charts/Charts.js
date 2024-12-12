"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
var react_1 = require("react");
var react_2 = require("react");
var axios_1 = require("axios");
var TemperatureChart_1 = require("./TemperatureChart");
var Table_1 = require("../Tables/Table");
var chart_js_1 = require("chart.js");
chart_js_1.Chart.register(chart_js_1.LineElement, chart_js_1.PointElement, chart_js_1.CategoryScale, chart_js_1.LinearScale, chart_js_1.Tooltip, chart_js_1.Legend);
function Charts() {
    var _a = (0, react_2.useState)([]), sensorData = _a[0], setSensorData = _a[1];
    (0, react_2.useEffect)(function () {
        axios_1.default.get("https://plan-tree-amber.vercel.app/sensor-data")
            .then(function (response) {
            // console.log(response.data);
            setSensorData(response.data);
        })
            .catch(function (error) { console.log("Getting while fetching the daata from database, ", error); });
    }, []);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(TemperatureChart_1.default, { data: sensorData }),
        react_1.default.createElement("h2", { className: "text-2xl font-bold mt-8" }, "Data in Table Format"),
        react_1.default.createElement("div", { className: ' flex items-center justify-center' },
            react_1.default.createElement(Table_1.default, { data: sensorData }))));
}
exports.default = Charts;
