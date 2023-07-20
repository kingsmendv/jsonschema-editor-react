import * as React from "react";
import { Flex, Input, Checkbox, Select, IconButton, Tooltip, } from "@chakra-ui/react";
import { useState } from "@hookstate/core";
import { IoIosAddCircleOutline } from "react-icons/io";
import { getDefaultSchema, DataType, random, handleTypeChange } from "../utils";
export var SchemaRoot = function (props) {
    var _a, _b, _c, _d, _e, _f;
    var state = useState(props.schemaState);
    var isReadOnlyState = useState(props.isReadOnly);
    return (React.createElement(React.Fragment, null,
        props.onSchemaChange(JSON.stringify(state.value)),
        React.createElement(Flex, { "data-testid": "jsonschema-editor", direction: "row", wrap: "nowrap" },
            React.createElement(Input, { isDisabled: true, placeholder: "root", margin: 2, variant: "outline", size: "sm" }),
            React.createElement(Checkbox
            // isDisabled={isReadOnlyState.value}
            , { 
                // isDisabled={isReadOnlyState.value}
                isDisabled: true, margin: 2, width: 20, colorScheme: "blue" }),
            React.createElement(Select, { variant: "outline", isDisabled: true, value: (_a = state.type.value) !== null && _a !== void 0 ? _a : "object", size: "sm", margin: 2, placeholder: "Choose root data type", onChange: function (evt) {
                    var newSchema = handleTypeChange(evt.target.value, false);
                    state.set(newSchema);
                } },
                React.createElement("option", { key: "object", value: "object" }, "object"),
                React.createElement("option", { key: "array", value: "array" }, "array")),
            React.createElement(Input, { value: (_c = (_b = state.value) === null || _b === void 0 ? void 0 : _b.title) !== null && _c !== void 0 ? _c : "", isDisabled: isReadOnlyState.value, size: "sm", margin: 2, variant: "outline", placeholder: "Add Title", onChange: function (evt) {
                    state.title.set(evt.target.value);
                } }),
            React.createElement(Input, { value: (_e = (_d = state.value) === null || _d === void 0 ? void 0 : _d.description) !== null && _e !== void 0 ? _e : "", isDisabled: isReadOnlyState.value, size: "sm", margin: 2, variant: "outline", placeholder: "Add Description", onChange: function (evt) {
                    state.description.set(evt.target.value);
                } }),
            ((_f = state.value) === null || _f === void 0 ? void 0 : _f.type) === "object" && (React.createElement(Flex, { flex: "1 0 96px", justifyContent: "flex-end" },
                React.createElement(Tooltip, { hasArrow: true, "aria-label": "Add Child Node", label: "Add Child Node", placement: "top" },
                    React.createElement(IconButton, { isRound: true, isDisabled: isReadOnlyState.value, size: "sm", variant: "link", colorScheme: "green", fontSize: "16px", icon: React.createElement(IoIosAddCircleOutline, null), "aria-label": "Add Child Node", onClick: function () {
                            var fieldName = "field_".concat(random());
                            state.properties[fieldName].set(getDefaultSchema(DataType.string));
                        } })))))));
};
