//@ts-nocheck
"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Individuals;
var react_1 = require("react");
var recharts_1 = require("recharts");
var card_1 = require("@/components/ui/card");
function Individuals(_a) {
    var data = _a.data, name = _a.name, dataKey = _a.dataKey, chartTitle = _a.chartTitle;
    var _b = (0, react_1.useState)(0), chartWidth = _b[0], setChartWidth = _b[1];
    // Dynamically update chart width
    (0, react_1.useEffect)(function () {
        var handleResize = function () {
            var _a;
            var containerWidth = ((_a = document.getElementById("chart-container")) === null || _a === void 0 ? void 0 : _a.offsetWidth) || 0;
            setChartWidth(containerWidth);
        };
        handleResize(); // Set initial width
        window.addEventListener("resize", handleResize); // Update on resize
        return function () { return window.removeEventListener("resize", handleResize); };
    }, []);
    // Filter data by location
    var filteredData = data.filter(function (item) { return item.location === name; });
    return (react_1.default.createElement(card_1.Card, { className: "w-full" },
        react_1.default.createElement(card_1.CardHeader, null,
            react_1.default.createElement(card_1.CardTitle, null,
                chartTitle,
                " - ",
                name)),
        react_1.default.createElement(card_1.CardContent, null,
            react_1.default.createElement("div", { id: "chart-container", className: "w-full max-w-full overflow-x-auto" }, chartWidth > 0 && (react_1.default.createElement(recharts_1.LineChart, { data: filteredData, width: chartWidth, height: 300, margin: { top: 20, right: 10, left: 10, bottom: 5 } },
                react_1.default.createElement(recharts_1.CartesianGrid, { strokeDasharray: "3 3" }),
                react_1.default.createElement(recharts_1.XAxis, { dataKey: "timestamp", tickFormatter: function (value) {
                        var date = new Date(value);
                        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                    } }),
                react_1.default.createElement(recharts_1.YAxis, null),
                react_1.default.createElement(recharts_1.Tooltip, { formatter: function (value) { return "".concat(value); }, labelFormatter: function (label) {
                        var date = new Date(label);
                        return date.toLocaleString();
                    } }),
                react_1.default.createElement(recharts_1.Line, { type: "monotone", dataKey: dataKey, stroke: "#8884d8", strokeWidth: 2, dot: false })))))));
}
