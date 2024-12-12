"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-nocheck
var react_1 = require("react");
var react_chartjs_2_1 = require("react-chartjs-2");
var moment_1 = require("moment");
var fa_1 = require("react-icons/fa");
var wi_1 = require("react-icons/wi");
var md_1 = require("react-icons/md");
var IndividualData = function (_a) {
    var data = _a.data;
    var _b = (0, react_1.useState)("New Karachi"), selectedLocation = _b[0], setSelectedLocation = _b[1];
    var _c = (0, react_1.useState)("1 Week"), selectedTimeRange = _c[0], setSelectedTimeRange = _c[1];
    var _d = (0, react_1.useState)([]), filteredData = _d[0], setFilteredData = _d[1];
    var _e = (0, react_1.useState)(null), recentData = _e[0], setRecentData = _e[1];
    var _f = (0, react_1.useState)(true), loading = _f[0], setLoading = _f[1];
    // Time range mapping
    var timeRangeMapping = {
        "1 Day": 1,
        "1 Week": 7,
        "1 Month": 30,
        "2 Months": 60,
        Total: Infinity,
    };
    // Filter data
    (0, react_1.useEffect)(function () {
        setLoading(true);
        var currentDate = (0, moment_1.default)();
        var range = timeRangeMapping[selectedTimeRange];
        var filtered = data.filter(function (entry) {
            var entryDate = moment_1.default.utc(entry.timestamp);
            var withinRange = range === Infinity ||
                entryDate.isAfter(currentDate.clone().subtract(range, "days"));
            return withinRange && entry.location === selectedLocation;
        });
        setFilteredData(filtered);
        var recent = data
            .filter(function (entry) { return entry.location === selectedLocation; })
            .sort(function (a, b) {
            return moment_1.default.utc(b.timestamp).diff(moment_1.default.utc(a.timestamp));
        })[0];
        setRecentData(recent);
        setTimeout(function () { return setLoading(false); }, 1500); // Simulate loading
    }, [selectedLocation, selectedTimeRange, data]);
    // Prepare chart data
    var prepareChartData = function (key) { return ({
        labels: filteredData.map(function (entry) {
            return moment_1.default.utc(entry.timestamp).format("YYYY-MM-DD HH:mm");
        }),
        datasets: [
            {
                data: filteredData.map(function (entry) { return entry[key]; }),
                borderColor: "rgb(3, 252, 28)",
                backgroundColor: "rgba(3, 252, 28, 0.2)",
                fill: true,
            },
        ],
    }); };
    var chartOptions = {
        plugins: { legend: { display: false } },
        scales: { x: { display: false }, y: { display: true } },
    };
    // Suggestions based on data
    var generateSuggestion = function () {
        if (!recentData)
            return "No recent data available.";
        if (recentData.airQuality < 50)
            return true;
        if (recentData.airQuality >= 50 && recentData.airQuality < 100)
            return false;
        return false;
    };
    // Skeleton Loader
    var SkeletonLoader = function (_a) {
        var className = _a.className;
        return (react_1.default.createElement("div", { className: "".concat(className, " bg-gray-200 animate-pulse rounded-md") }));
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", { className: "header flex justify-between px-4" },
            react_1.default.createElement("h2", null, "Individual Data"),
            react_1.default.createElement("div", { className: "filters md:space-x-4" },
                react_1.default.createElement("select", { value: selectedLocation, onChange: function (e) { return setSelectedLocation(e.target.value); }, className: "w-[180px] p-2 border rounded-md" },
                    react_1.default.createElement("option", { value: "", disabled: true }, "Select a Location"),
                    react_1.default.createElement("option", { value: "New Karachi" }, "New Karachi"),
                    react_1.default.createElement("option", { value: "Scheme 33" }, "Scheme 33"),
                    react_1.default.createElement("option", { value: "Shah Faisal" }, "Shah Faisal"),
                    react_1.default.createElement("option", { value: "Fast Uni" }, "Fast Uni")),
                react_1.default.createElement("select", { className: "w-[180px] p-2 border rounded-md", value: selectedTimeRange, onChange: function (e) { return setSelectedTimeRange(e.target.value); } },
                    react_1.default.createElement("option", { value: "1 Day" }, "1 Day"),
                    react_1.default.createElement("option", { value: "1 Week" }, "1 Week"),
                    react_1.default.createElement("option", { value: "1 Month" }, "1 Month"),
                    react_1.default.createElement("option", { value: "2 Months" }, "2 Months"),
                    react_1.default.createElement("option", { value: "Total" }, "Total")))),
        react_1.default.createElement("div", { className: "cards-grid grid grid-cols-2 md:grid-cols-3 gap-4 mt-5" }, loading
            ? Array(3)
                .fill()
                .map(function (_, index) { return (react_1.default.createElement(SkeletonLoader, { key: index, className: "h-[250px] shadow rounded-md" })); })
            : ["temperature", "humidity", "mq135"].map(function (key, index) { return (react_1.default.createElement("div", { key: index, className: "card p-4 shadow rounded-md" },
                react_1.default.createElement("div", { className: "text-center text-xl font-bold mb-4 text-darkGreen" }, key.charAt(0).toUpperCase() + key.slice(1)),
                react_1.default.createElement(react_chartjs_2_1.Line, { data: prepareChartData(key), options: chartOptions }))); })),
        react_1.default.createElement("div", { className: "cards-grid grid grid-cols-1 md:grid-cols-2 gap-4 mt-4" }, loading ? (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(SkeletonLoader, { className: "h-[200px] shadow rounded-md" }),
            react_1.default.createElement(SkeletonLoader, { className: "h-[200px] shadow rounded-md" }))) : (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { className: "card p-4 shadow rounded-md hover:z-10" },
                react_1.default.createElement("div", { className: "text-center text-xl mb-4 font-bold text-darkGreen" }, "Recent Data"),
                recentData ? (react_1.default.createElement("div", { className: "text-[20px]" },
                    react_1.default.createElement("div", { className: "flex items-center gap-x-4" },
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("strong", null, "Temperature: ")),
                        react_1.default.createElement("div", null,
                            react_1.default.createElement(fa_1.FaTemperatureLow, null)),
                        react_1.default.createElement("div", null,
                            recentData.temperature,
                            " \u00B0C")),
                    react_1.default.createElement("div", { className: "flex items-center gap-x-4" },
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("strong", null, "Humidity: ")),
                        react_1.default.createElement("div", { className: "md:text-3xl" },
                            react_1.default.createElement(wi_1.WiHumidity, null)),
                        react_1.default.createElement("div", null, recentData.humidity)),
                    react_1.default.createElement("div", { className: "flex items-center gap-x-4" },
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("strong", null, "AirQuality: ")),
                        react_1.default.createElement("div", null,
                            react_1.default.createElement(md_1.MdAir, null)),
                        react_1.default.createElement("div", null, recentData.mq135)),
                    react_1.default.createElement("p", null,
                        react_1.default.createElement("strong", null, "Time (UTC):"),
                        " ",
                        moment_1.default
                            .utc(recentData.timestamp)
                            .format("YYYY-MM-DD HH:mm:ss")))) : (react_1.default.createElement("p", null, "No recent data available"))),
            react_1.default.createElement("div", { className: "card p-4 shadow rounded-sm" },
                react_1.default.createElement("div", { className: "text-center text-xl mb-4 font-bold text-darkGreen" }, "Analysis"),
                react_1.default.createElement("div", { className: "text-center text-[30px] text-red-600" },
                    generateSuggestion() === true && "Air Quality is Perfect",
                    generateSuggestion() === false &&
                        "Air Quality needs improvement",
                    generateSuggestion() === "No recent data available." &&
                        "No recent data available.")))))));
};
exports.default = IndividualData;
