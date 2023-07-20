import * as React from "react";
import { Box, Input, FormLabel, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Checkbox, Textarea, Select, } from "@chakra-ui/react";
import { none, useState } from "@hookstate/core";
import { StringFormat } from "../utils";
export var AdvancedString = function (props) {
    var _a, _b, _c;
    var itemStateProp = props.itemStateProp;
    var changeEnumOtherValue = function (value) {
        var array = value.split("\n");
        if (array.length === 0 || (array.length === 1 && !array[0])) {
            return null;
        }
        return array;
    };
    var itemState = useState(itemStateProp);
    var isEnumChecked = itemState.value.enum !== undefined;
    var enumData = itemState.value.enum
        ? itemState.enum.value
        : [];
    var enumValue = enumData === null || enumData === void 0 ? void 0 : enumData.join("\n");
    var layoutStyle = {
        display: "grid",
        gridTemplateColumns: "auto 1fr auto 1fr",
        gap: "15px 20px",
        width: "100%",
        alignItems: "center",
    };
    return (React.createElement("div", { style: layoutStyle },
        React.createElement(FormLabel, { m: 0 }, "Default"),
        React.createElement(Input, { id: "default", placeholder: "Default value", value: (_a = itemState.default.value) !== null && _a !== void 0 ? _a : "", onChange: function (evt) {
                itemState.default.set(evt.target.value);
            }, gridColumn: "2/5" }),
        React.createElement(FormLabel, { m: 0 }, "Min Length"),
        React.createElement(NumberInput, { defaultValue: itemState.minLength.value === undefined
                ? undefined
                : Number(itemState.minLength.value), onChange: function (value) {
                itemState.minLength.set(Number(value));
            } },
            React.createElement(NumberInputField, { value: Number(itemState.minLength.value) }),
            React.createElement(NumberInputStepper, null,
                React.createElement(NumberIncrementStepper, null),
                React.createElement(NumberDecrementStepper, null))),
        React.createElement(FormLabel, { m: 0 }, "Max Length"),
        React.createElement(NumberInput, { defaultValue: itemState.maxLength.value === undefined
                ? undefined
                : Number(itemState.maxLength.value), onChange: function (value) {
                itemState.maxLength.set(Number(value));
            } },
            React.createElement(NumberInputField, { value: Number(itemState.maxLength.value) }),
            React.createElement(NumberInputStepper, null,
                React.createElement(NumberIncrementStepper, null),
                React.createElement(NumberDecrementStepper, null))),
        React.createElement(FormLabel, { m: 0, htmlFor: "pattern" }, "Pattern"),
        React.createElement(Input, { id: "pattern", placeholder: "MUST be a valid regular expression.", value: (_b = itemState.pattern.value) !== null && _b !== void 0 ? _b : "", onChange: function (evt) {
                itemState.pattern.set(evt.target.value);
            }, gridColumn: "2/5" }),
        React.createElement(FormLabel, { m: 0 }, "Enum"),
        React.createElement(Box, { gridColumn: "2/5", display: "flex", gap: "20px" },
            React.createElement(Checkbox, { isChecked: isEnumChecked, onChange: function (evt) {
                    if (!evt.target.checked) {
                        itemState.enum.set(none);
                    }
                    else {
                        itemState.enum.set(Array());
                    }
                } }),
            React.createElement(Textarea, { value: enumValue || "", isDisabled: !isEnumChecked, placeholder: "ENUM Values - One Entry Per Line", onChange: function (evt) {
                    var update = changeEnumOtherValue(evt.target.value);
                    if (update === null) {
                        itemState.enum.set(none);
                    }
                    else {
                        itemState.enum.set(update);
                    }
                } })),
        React.createElement(FormLabel, { m: 0, htmlFor: "format" }, "Format"),
        React.createElement(Select, { variant: "outline", value: (_c = itemState.format.value) !== null && _c !== void 0 ? _c : "", placeholder: "Choose data type", onChange: function (evt) {
                if (evt.target.value === "") {
                    itemState.format.set(none);
                }
                else {
                    itemState.format.set(evt.target.value);
                }
            }, gridColumn: "2/5" }, StringFormat.map(function (item, index) {
            return (React.createElement("option", { key: String(index), value: item.name }, item.name));
        }))));
};
