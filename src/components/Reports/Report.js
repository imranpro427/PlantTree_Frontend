"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-nocheck
var react_1 = require("react");
var Table_1 = require("../Tables/Table");
var Connect_1 = require("@/connection/Connect");
var Reports = function (_a) {
    var data = _a.data;
    // const tableHeaders = ["Location", "Temperature (°C)", "Air Quality", "Humidity (%)"];
    // const locations = Object.keys(data);
    var sensorData = (0, Connect_1.useSensorData)().data;
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(Table_1.default, { data: sensorData })));
};
exports.default = Reports;
