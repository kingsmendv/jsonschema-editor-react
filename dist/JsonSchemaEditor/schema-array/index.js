import * as React from "react";
import { Flex, Input, Checkbox, Select, IconButton, Tooltip, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, } from "@chakra-ui/react";
import { useState } from "@hookstate/core";
import { FiSettings } from "react-icons/fi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { SchemaTypes, getDefaultSchema, DataType, handleTypeChange, random, } from "../utils";
import { SchemaObject } from "../schema-object";
import { AdvancedSettings } from "../schema-advanced";
export var SchemaArray = function (props) {
    var _a, _b, _c, _d, _e, _f;
    var schemaState = props.schemaState, isReadOnly = props.isReadOnly;
    var state = useState(schemaState.items);
    var isReadOnlyState = useState(isReadOnly);
    var length = state.path.filter(function (name) { return name !== "properties"; }).length;
    var tagPaddingLeftStyle = {
        paddingLeft: "".concat(20 * (length - 1), "px"),
    };
    var onCloseAdvanced = function () {
        localState.isAdvancedOpen.set(false);
    };
    var showadvanced = function () {
        localState.isAdvancedOpen.set(true);
    };
    var focusRef = React.createRef();
    var localState = useState({
        isAdvancedOpen: false,
    });
    return (React.createElement(React.Fragment, null,
        React.createElement(Flex, { direction: "row", wrap: "nowrap", className: "array-item", mt: 2, style: tagPaddingLeftStyle },
            React.createElement(Input, { key: "Items", isDisabled: true, value: "Items", size: "sm", flexShrink: 1, margin: 2, variant: "outline" }),
            React.createElement(Checkbox, { isDisabled: true, margin: 2, colorScheme: "blue" }),
            React.createElement(Select, { variant: "outline", isDisabled: isReadOnlyState.value, value: state.type.value, size: "sm", margin: 2, placeholder: "Choose data type", onChange: function (evt) {
                    var newSchema = handleTypeChange(evt.target.value, false);
                    state.set(newSchema);
                } }, SchemaTypes.map(function (item, index) {
                return (React.createElement("option", { key: String(index), value: item }, item));
            })),
            React.createElement(Input, { value: state.title.value, isDisabled: isReadOnlyState.value, size: "sm", margin: 2, variant: "outline", placeholder: "Add Title", onChange: function (evt) {
                    state.title.set(evt.target.value);
                } }),
            React.createElement(Input, { value: state.description.value, isDisabled: isReadOnlyState.value, size: "sm", margin: 2, variant: "outline", placeholder: "Add Description", onChange: function (evt) {
                    state.description.set(evt.target.value);
                } }),
            React.createElement(Flex, { flex: "1 0 96px", justifyContent: "space-between" },
                state.type.value !== "object" ? (React.createElement(Tooltip, { hasArrow: true, "aria-label": "Advanced Settings", label: "Advanced Settings", placement: "top" },
                    React.createElement(IconButton, { isRound: true, isDisabled: isReadOnlyState.value, size: "sm", variant: "link", colorScheme: "blue", fontSize: "16px", icon: React.createElement(FiSettings, null), "aria-label": "Advanced Settings", onClick: function () {
                            showadvanced();
                        } }))) : (React.createElement("div", null)),
                state.type.value === "object" && (React.createElement(Tooltip, { hasArrow: true, "aria-label": "Add Child Node", label: "Add Child Node", placement: "top" },
                    React.createElement(IconButton, { isRound: true, isDisabled: isReadOnlyState.value, size: "sm", variant: "link", colorScheme: "green", fontSize: "16px", icon: React.createElement(IoIosAddCircleOutline, null), "aria-label": "Add Child Node", onClick: function () {
                            var fieldName = "field_".concat(random());
                            state.properties[fieldName].set(getDefaultSchema(DataType.string));
                        } }))))),
        ((_a = state.type) === null || _a === void 0 ? void 0 : _a.value) === "object" && (React.createElement(SchemaObject, { isReadOnly: isReadOnlyState, schemaState: state, initialSchema: ((_b = props === null || props === void 0 ? void 0 : props.initialSchema) === null || _b === void 0 ? void 0 : _b.items)
                ? (_c = props === null || props === void 0 ? void 0 : props.initialSchema) === null || _c === void 0 ? void 0 : _c.items
                : undefined })),
        ((_d = state.type) === null || _d === void 0 ? void 0 : _d.value) === "array" && (React.createElement(SchemaArray, { isReadOnly: isReadOnlyState, schemaState: state, initialSchema: ((_e = props === null || props === void 0 ? void 0 : props.initialSchema) === null || _e === void 0 ? void 0 : _e.items)
                ? (_f = props === null || props === void 0 ? void 0 : props.initialSchema) === null || _f === void 0 ? void 0 : _f.items
                : undefined })),
        React.createElement(Modal, { isOpen: localState.isAdvancedOpen.get(), finalFocusRef: focusRef, size: "lg", onClose: onCloseAdvanced },
            React.createElement(ModalOverlay, null),
            React.createElement(ModalContent, null,
                React.createElement(ModalHeader, { textAlign: "center" }, "Advanced Schema Settings"),
                React.createElement(ModalBody, null,
                    React.createElement(AdvancedSettings, { itemStateProp: state })),
                React.createElement(ModalFooter, null,
                    React.createElement(Button, { colorScheme: "blue", variant: "ghost", mr: 3, onClick: onCloseAdvanced }, "Close"))))));
};
