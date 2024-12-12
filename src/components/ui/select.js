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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectScrollDownButton = exports.SelectScrollUpButton = exports.SelectSeparator = exports.SelectItem = exports.SelectLabel = exports.SelectContent = exports.SelectTrigger = exports.SelectValue = exports.SelectGroup = exports.Select = void 0;
// @ts-nocheck
var react_1 = require("react");
var SelectPrimitive = require("@radix-ui/react-select");
var lucide_react_1 = require("lucide-react");
var utils_1 = require("@/lib/utils");
var Select = SelectPrimitive.Root;
exports.Select = Select;
var SelectGroup = SelectPrimitive.Group;
exports.SelectGroup = SelectGroup;
var SelectValue = SelectPrimitive.Value;
exports.SelectValue = SelectValue;
var SelectTrigger = react_1.default.forwardRef(function (_a, ref) {
    var className = _a.className, children = _a.children, props = __rest(_a, ["className", "children"]);
    return (react_1.default.createElement(SelectPrimitive.Trigger, __assign({ ref: ref, className: (0, utils_1.cn)("flex h-10 w-full items-center justify-between rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus:ring-gray-300", className) }, props),
        children,
        react_1.default.createElement(SelectPrimitive.Icon, { asChild: true },
            react_1.default.createElement(lucide_react_1.ChevronDown, { className: "h-4 w-4 opacity-50" }))));
});
exports.SelectTrigger = SelectTrigger;
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
var SelectScrollUpButton = react_1.default.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (react_1.default.createElement(SelectPrimitive.ScrollUpButton, __assign({ ref: ref, className: (0, utils_1.cn)("flex cursor-default items-center justify-center py-1", className) }, props),
        react_1.default.createElement(lucide_react_1.ChevronUp, { className: "h-4 w-4" })));
});
exports.SelectScrollUpButton = SelectScrollUpButton;
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
var SelectScrollDownButton = react_1.default.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (react_1.default.createElement(SelectPrimitive.ScrollDownButton, __assign({ ref: ref, className: (0, utils_1.cn)("flex cursor-default items-center justify-center py-1", className) }, props),
        react_1.default.createElement(lucide_react_1.ChevronDown, { className: "h-4 w-4" })));
});
exports.SelectScrollDownButton = SelectScrollDownButton;
SelectScrollDownButton.displayName =
    SelectPrimitive.ScrollDownButton.displayName;
var SelectContent = react_1.default.forwardRef(function (_a, ref) {
    var className = _a.className, children = _a.children, _b = _a.position, position = _b === void 0 ? "popper" : _b, props = __rest(_a, ["className", "children", "position"]);
    return (react_1.default.createElement(SelectPrimitive.Portal, null,
        react_1.default.createElement(SelectPrimitive.Content, __assign({ ref: ref, className: (0, utils_1.cn)("relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white text-gray-950 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50", position === "popper" &&
                "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className), position: position }, props),
            react_1.default.createElement(SelectScrollUpButton, null),
            react_1.default.createElement(SelectPrimitive.Viewport, { className: (0, utils_1.cn)("p-1", position === "popper" &&
                    "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]") }, children),
            react_1.default.createElement(SelectScrollDownButton, null))));
});
exports.SelectContent = SelectContent;
SelectContent.displayName = SelectPrimitive.Content.displayName;
var SelectLabel = react_1.default.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (react_1.default.createElement(SelectPrimitive.Label, __assign({ ref: ref, className: (0, utils_1.cn)("py-1.5 pl-8 pr-2 text-sm font-semibold", className) }, props)));
});
exports.SelectLabel = SelectLabel;
SelectLabel.displayName = SelectPrimitive.Label.displayName;
var SelectItem = react_1.default.forwardRef(function (_a, ref) {
    var className = _a.className, children = _a.children, props = __rest(_a, ["className", "children"]);
    return (react_1.default.createElement(SelectPrimitive.Item, __assign({ ref: ref, className: (0, utils_1.cn)("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-gray-800 dark:focus:text-gray-50", className) }, props),
        react_1.default.createElement("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center" },
            react_1.default.createElement(SelectPrimitive.ItemIndicator, null,
                react_1.default.createElement(lucide_react_1.Check, { className: "h-4 w-4" }))),
        react_1.default.createElement(SelectPrimitive.ItemText, null, children)));
});
exports.SelectItem = SelectItem;
SelectItem.displayName = SelectPrimitive.Item.displayName;
var SelectSeparator = react_1.default.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (react_1.default.createElement(SelectPrimitive.Separator, __assign({ ref: ref, className: (0, utils_1.cn)("-mx-1 my-1 h-px bg-gray-100 dark:bg-gray-800", className) }, props)));
});
exports.SelectSeparator = SelectSeparator;
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
