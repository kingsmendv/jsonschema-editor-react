import * as React from "react";
import { Flex, Input, Checkbox, Select, Tooltip, IconButton, useToast, } from "@chakra-ui/react";
import { FiSettings } from "react-icons/fi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { AiOutlineDelete } from "react-icons/ai";
import { DropPlus } from "../drop-plus";
import { useState, none } from "@hookstate/core";
import { getDefaultSchema, DataType, SchemaTypes, random, handleTypeChange, } from "../utils";
import { renameKeys, deleteKey } from "../utils";
import { useDebouncedCallback } from "use-debounce";
import { SchemaObject } from "../schema-object";
import { SchemaArray } from "../schema-array";
import { InitialSchemaContext } from "../state/InitialSchemaContext";
export var SchemaItem = function (props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    var name = props.name, itemStateProp = props.itemStateProp, showadvanced = props.showadvanced, required = props.required, parentStateProp = props.parentStateProp, isReadOnly = props.isReadOnly;
    // const itemState = useState(itemStateProp);
    var parentState = useState(parentStateProp);
    var parentStateOrNull = parentState.ornull;
    var propertiesOrNull = parentStateOrNull.properties.ornull;
    var nameState = useState(name);
    var isReadOnlyState = useState(isReadOnly);
    var itemState = useState(parentStateProp.properties.nested(nameState.value));
    var length = parentState.path.filter(function (name) { return name !== "properties"; }).length;
    var tagPaddingLeftStyle = {
        paddingLeft: "".concat(20 * length, "px"),
    };
    var isRequired = required
        ? required.length > 0 && required.includes(name)
        : false;
    var toast = useToast();
    var _k = React.useState(false), requiresDefaultValue = _k[0], setRequiresDefaultValue = _k[1];
    var _l = React.useContext(InitialSchemaContext), initialSchema = _l.schema, defaultsOnNewRequired = _l.defaultsOnNewRequired;
    // Debounce callback
    var debounced = useDebouncedCallback(
    // function
    function (newValue) {
        var _a;
        // Todo: make toast for duplicate properties
        if (propertiesOrNull && propertiesOrNull[newValue].value) {
            toast({
                title: "Duplicate Property",
                description: "Property already exists!",
                status: "error",
                duration: 1000,
                isClosable: true,
                position: "top",
            });
        }
        else {
            var oldName_1 = name;
            var proptoupdate = newValue;
            var newobj = renameKeys((_a = {}, _a[oldName_1] = proptoupdate, _a), parentState.properties.value);
            // If the field was required, be sure to update the field name in the required array
            var wasRequired = required.includes(oldName_1);
            if (wasRequired) {
                var updatedRequired = required.filter(function (field) { return field !== oldName_1; });
                updatedRequired.push(newValue);
                parentStateOrNull.required.set(updatedRequired);
            }
            parentStateOrNull.properties.set(JSON.parse(JSON.stringify(newobj)));
        }
    }, 
    // delay in ms
    1000);
    if (!itemState.value) {
        return React.createElement(React.Fragment, null);
    }
    var wrapperStyle = ((_a = itemState.type) === null || _a === void 0 ? void 0 : _a.value) === "object" || ((_b = itemState.type) === null || _b === void 0 ? void 0 : _b.value) === "array"
        ? {
            background: "#cccccc1a",
            marginBottom: "20px",
            // marginLeft: tagPaddingLeftStyle.paddingLeft,
            // borderLeft: "2px solid #cccccc",
        }
        : {};
    return (React.createElement("div", { style: wrapperStyle },
        React.createElement(Flex, { alignContent: "space-evenly", direction: "row", wrap: "nowrap", className: "schema-item", style: tagPaddingLeftStyle },
            React.createElement(Input, { isDisabled: isReadOnlyState.value, defaultValue: nameState.value, size: "sm", margin: 2, variant: "outline", placeholder: "Enter property name", onChange: function (evt) {
                    debounced(evt.target.value);
                } }),
            React.createElement(Checkbox, { title: "Is required?", isDisabled: isReadOnlyState.value, isChecked: isRequired, margin: 2, colorScheme: "blue", onChange: function (evt) {
                    var _a;
                    var parentStateProps = parentState.properties.get() || {};
                    var dataType = parentStateProps[name].type;
                    var requiresDefaultValue = !!defaultsOnNewRequired &&
                        // Is checked
                        evt.target.checked &&
                        // Is not required in the original schema
                        (!((_a = props.initialSchema) === null || _a === void 0 ? void 0 : _a.required) ||
                            !props.initialSchema.required.includes(name)) &&
                        // Is not an object or array type
                        dataType !== "object" &&
                        dataType !== "array";
                    setRequiresDefaultValue(requiresDefaultValue);
                    if (!evt.target.checked && required.includes(name)) {
                        parentState.required[required.indexOf(name)].set(none);
                    }
                    else {
                        parentState.required.merge([name]);
                    }
                } }),
            React.createElement(Select, { isDisabled: false, variant: "outline", value: itemState.type.value, size: "sm", margin: 2, placeholder: "Choose data type", onChange: function (evt) {
                    var newSchema = handleTypeChange(evt.target.value, false);
                    itemState.set(newSchema);
                } }, SchemaTypes.map(function (item, index) {
                return (React.createElement("option", { key: String(index), value: item }, item));
            })),
            React.createElement(Input, { isDisabled: isReadOnlyState.value, value: itemState.title.value || "", size: "sm", margin: 2, variant: "outline", placeholder: "Add Title", onChange: function (evt) {
                    itemState.title.set(evt.target.value);
                } }),
            React.createElement(Input, { isDisabled: isReadOnlyState.value, value: itemState.description.value || "", size: "sm", margin: 2, variant: "outline", placeholder: "Add Description", onChange: function (evt) {
                    itemState.description.set(evt.target.value);
                } }),
            React.createElement(Flex, { flex: "1 0 96px", justifyContent: "flex-end" },
                itemState.type.value !== "object" &&
                    itemState.type.value !== "array" && (React.createElement(Tooltip, { hasArrow: true, "aria-label": "Advanced Settings", label: "Advanced Settings", placement: "top" },
                    React.createElement(IconButton, { isRound: true, isDisabled: isReadOnlyState.value, size: "sm", variant: "link", colorScheme: "blue", fontSize: "16px", icon: React.createElement(FiSettings, null), "aria-label": "Advanced Settings", onClick: function () {
                            showadvanced(name);
                        } }))),
                React.createElement(Tooltip, { hasArrow: true, "aria-label": "Remove Node", label: "Remove Node", placement: "top" },
                    React.createElement(IconButton, { isRound: true, isDisabled: isReadOnlyState.value, size: "sm", variant: "link", colorScheme: "red", fontSize: "16px", icon: React.createElement(AiOutlineDelete, null), "aria-label": "Remove Node", onClick: function () {
                            var updatedState = deleteKey(nameState.value, JSON.parse(JSON.stringify(parentState.properties.value)));
                            // If the field was required, be sure to remove it.
                            var wasRequired = required.includes(nameState.value);
                            if (wasRequired) {
                                var updatedRequired = required.filter(function (field) { return field !== nameState.value; });
                                parentStateOrNull.required.set(updatedRequired);
                            }
                            parentState.properties.set(updatedState);
                        } })),
                ((_c = itemState.type) === null || _c === void 0 ? void 0 : _c.value) === "object" ? (React.createElement(DropPlus, { isDisabled: isReadOnlyState.value, parentStateProp: parentState, itemStateProp: itemStateProp })) : (React.createElement(Tooltip, { hasArrow: true, "aria-label": "Add Sibling Node", label: "Add Sibling Node", placement: "top" },
                    React.createElement(IconButton, { isRound: true, isDisabled: isReadOnlyState.value, size: "sm", variant: "link", colorScheme: "green", fontSize: "16px", icon: React.createElement(IoIosAddCircleOutline, null), "aria-label": "Add Sibling Node", onClick: function () {
                            if (propertiesOrNull) {
                                var fieldName = "field_".concat(random());
                                propertiesOrNull === null || propertiesOrNull === void 0 ? void 0 : propertiesOrNull.nested(fieldName).set(getDefaultSchema(DataType.string));
                            }
                        } }))))),
        requiresDefaultValue &&
            (itemState.default.value === undefined ||
                itemState.default.value === "") &&
            ((_d = itemState.type) === null || _d === void 0 ? void 0 : _d.value) !== "array" &&
            ((_e = itemState.type) === null || _e === void 0 ? void 0 : _e.value) !== "object" && (React.createElement("div", { style: {
                color: "white",
                display: "inline-block",
                background: "crimson",
                padding: "2px 8px",
                fontSize: "0.9rem",
                borderRadius: "3px",
                marginLeft: "calc(".concat(tagPaddingLeftStyle.paddingLeft, " + 8px)"),
            } }, "Please enter a default value for the new required field!")),
        ((_f = itemState.type) === null || _f === void 0 ? void 0 : _f.value) === "object" && (React.createElement(SchemaObject, { isReadOnly: isReadOnlyState, schemaState: itemState, initialSchema: ((_g = props === null || props === void 0 ? void 0 : props.initialSchema) === null || _g === void 0 ? void 0 : _g.properties) &&
                typeof props.initialSchema.properties === "object"
                ? props.initialSchema.properties[nameState.value]
                : undefined })),
        ((_h = itemState.type) === null || _h === void 0 ? void 0 : _h.value) === "array" && (React.createElement(SchemaArray, { isReadOnly: isReadOnlyState, schemaState: itemState, initialSchema: ((_j = props === null || props === void 0 ? void 0 : props.initialSchema) === null || _j === void 0 ? void 0 : _j.properties) &&
                typeof props.initialSchema.properties === "object"
                ? props.initialSchema.properties[nameState.value]
                : undefined }))));
};
