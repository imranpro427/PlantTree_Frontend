"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
var react_1 = require("react");
var react_2 = require("react");
var react_router_dom_1 = require("react-router-dom");
var Charts_1 = require("./components/Charts/Charts");
var Home_1 = require("./components/home/Home");
function App() {
    var _a = (0, react_2.useState)(0), count = _a[0], setCount = _a[1];
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
            react_1.default.createElement(react_router_dom_1.Routes, null,
                react_1.default.createElement(react_router_dom_1.Route, { path: "/home", element: react_1.default.createElement(Charts_1.default, null) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "/", element: react_1.default.createElement(Home_1.default, null) })))));
}
exports.default = App;
