"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Table;
//@ts-nocheck
var react_1 = require("react");
var react_2 = require("react");
var react_table_1 = require("react-table");
var md_1 = require("react-icons/md");
var bi_1 = require("react-icons/bi");
var gr_1 = require("react-icons/gr");
var react_loading_skeleton_1 = require("react-loading-skeleton");
require("react-loading-skeleton/dist/skeleton.css");
var select_1 = require("@/components/ui/select");
function SkeletonRow(_a) {
    var columns = _a.columns;
    return (react_1.default.createElement("tr", null, Array.from({ length: columns }).map(function (_, index) { return (react_1.default.createElement("td", { key: index },
        react_1.default.createElement(react_loading_skeleton_1.default, { height: 20 }))); })));
}
function Table(_a) {
    var data = _a.data;
    var columns = (0, react_2.useMemo)(function () { return [
        {
            Header: "Location",
            accessor: "location",
        },
        {
            Header: "Temperature (°C)",
            accessor: "temperature",
        },
        {
            Header: "Humidity (%)",
            accessor: "humidity",
        },
        {
            Header: "Air Quality (mq135)",
            accessor: "mq135",
        },
        {
            Header: "Timestamp",
            accessor: "timestamp",
        },
    ]; }, []);
    var loading = !data || data.length === 0;
    var _b = (0, react_table_1.useTable)({ columns: columns, data: data, initialState: { pageIndex: 0, pageSize: 10 } }, react_table_1.usePagination), getTableProps = _b.getTableProps, getTableBodyProps = _b.getTableBodyProps, headerGroups = _b.headerGroups, prepareRow = _b.prepareRow, page = _b.page, canPreviousPage = _b.canPreviousPage, canNextPage = _b.canNextPage, pageOptions = _b.pageOptions, pageCount = _b.pageCount, gotoPage = _b.gotoPage, nextPage = _b.nextPage, previousPage = _b.previousPage, setPageSize = _b.setPageSize, _c = _b.state, pageIndex = _c.pageIndex, pageSize = _c.pageSize;
    return (react_1.default.createElement("div", { className: "w-full max-w-7xl mx-auto p-6 bg-gray-50 shadow-lg rounded-lg" },
        react_1.default.createElement("h1", { className: "text-2xl font-semibold text-gray-800 mb-4" }, "Report Overview"),
        react_1.default.createElement("div", { className: "flex items-center justify-between flex-wrap gap-4 mb-4" },
            react_1.default.createElement("div", { className: "flex items-center space-x-2" },
                react_1.default.createElement("button", { onClick: function () { return gotoPage(0); }, disabled: !canPreviousPage, className: "p-2 bg-gray-200 rounded hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed" },
                    react_1.default.createElement(bi_1.BiFirstPage, null)),
                react_1.default.createElement("button", { onClick: function () { return previousPage(); }, disabled: !canPreviousPage, className: "p-2 bg-gray-200 rounded hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed" },
                    react_1.default.createElement(gr_1.GrFormPrevious, null)),
                react_1.default.createElement("button", { onClick: function () { return nextPage(); }, disabled: !canNextPage, className: "p-2 bg-gray-200 rounded hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed" },
                    react_1.default.createElement(md_1.MdNavigateNext, null)),
                react_1.default.createElement("button", { onClick: function () { return gotoPage(pageCount - 1); }, disabled: !canNextPage, className: "p-2 bg-gray-200 rounded hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed" },
                    react_1.default.createElement(bi_1.BiLastPage, null))),
            react_1.default.createElement("div", { className: "flex items-center space-x-2" },
                react_1.default.createElement("span", { className: "text-sm text-gray-700" },
                    "Page ",
                    pageIndex + 1,
                    " of ",
                    pageOptions.length),
                react_1.default.createElement("input", { type: "number", min: "1", max: pageOptions.length, defaultValue: pageIndex + 1, onChange: function (e) {
                        var page = e.target.value ? Number(e.target.value) - 1 : 0;
                        gotoPage(page);
                    }, className: "p-1 border border-gray-300 rounded w-16 text-center" })),
            react_1.default.createElement("div", { className: "flex items-center space-x-2" },
                react_1.default.createElement("div", { className: "text-sm" }, "Filter"),
                react_1.default.createElement(select_1.Select, { value: pageSize, onValueChange: function (e) { return setPageSize(Number(e)); }, className: "w-32" },
                    react_1.default.createElement(select_1.SelectTrigger, null,
                        react_1.default.createElement(select_1.SelectValue, { placeholder: "Show ".concat(pageSize) })),
                    react_1.default.createElement(select_1.SelectContent, null, [10, 20, 30, 40, 50].map(function (size) { return (react_1.default.createElement(select_1.SelectItem, { key: size, value: String(size) },
                        "Show ",
                        size)); }))))),
        react_1.default.createElement("div", { className: "overflow-x-auto" },
            react_1.default.createElement("table", __assign({}, getTableProps(), { className: "min-w-full divide-y divide-gray-200 border-none" }),
                react_1.default.createElement("thead", { className: "bg-darkGreen text-white" }, headerGroups.map(function (headerGroup) { return (react_1.default.createElement("tr", __assign({}, headerGroup.getHeaderGroupProps()), headerGroup.headers.map(function (column) { return (react_1.default.createElement("th", __assign({}, column.getHeaderProps(), { className: "px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border border-gray-200" }), column.render("Header"))); }))); })),
                react_1.default.createElement("tbody", __assign({}, getTableBodyProps(), { className: "bg-white divide-y divide-gray-200" }), loading
                    ? Array.from({ length: 10 }).map(function (_, index) { return (react_1.default.createElement(SkeletonRow, { key: index, columns: columns.length })); })
                    : page.map(function (row) {
                        prepareRow(row);
                        return (react_1.default.createElement("tr", __assign({}, row.getRowProps(), { className: "hover:bg-gray-100" }), row.cells.map(function (cell) { return (react_1.default.createElement("td", __assign({}, cell.getCellProps(), { className: "px-6 py-4 text-sm text-gray-700 border border-gray-300" }), cell.render("Cell"))); })));
                    }))))));
}
