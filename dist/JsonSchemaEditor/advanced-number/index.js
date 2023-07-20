import * as React from "react";
import { Box, FormLabel, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Checkbox, Textarea, } from "@chakra-ui/react";
import { none, useState } from "@hookstate/core";
export var AdvancedNumber = function (props) {
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
    var defaultVal = (itemState.default.value || "");
    var defaultMinVal = (itemState.minimum.value || "");
    var defaultMaxVal = (itemState.maximum.value || "");
    var layoutStyle = {
        display: "grid",
        gridTemplateColumns: "auto 1fr auto 1fr",
        gap: "15px 20px",
        width: "100%",
        alignItems: "center",
    };
    return (React.createElement("div", { style: layoutStyle },
        React.createElement(FormLabel, { m: "0" }, "Default"),
        React.createElement(NumberInput, { defaultValue: defaultVal, placeholder: "Default value", onChange: function (value) {
                itemState.default.set(Number(value));
            }, gridColumn: "2/5" },
            React.createElement(NumberInputField, { value: defaultVal }),
            React.createElement(NumberInputStepper, null,
                React.createElement(NumberIncrementStepper, null),
                React.createElement(NumberDecrementStepper, null))),
        React.createElement(FormLabel, { m: "0" }, "Min Value"),
        React.createElement(NumberInput, { defaultValue: defaultMinVal, onChange: function (value) {
                itemState.minimum.set(Number(value));
            } },
            React.createElement(NumberInputField, { value: defaultMinVal }),
            React.createElement(NumberInputStepper, null,
                React.createElement(NumberIncrementStepper, null),
                React.createElement(NumberDecrementStepper, null))),
        React.createElement(FormLabel, { m: "0" }, "Max Value"),
        React.createElement(NumberInput, { defaultValue: defaultMaxVal, onChange: function (value) {
                itemState.maximum.set(Number(value));
            } },
            React.createElement(NumberInputField, { value: defaultMaxVal }),
            React.createElement(NumberInputStepper, null,
                React.createElement(NumberIncrementStepper, null),
                React.createElement(NumberDecrementStepper, null))),
        React.createElement(FormLabel, { m: "0" }, "Enum"),
        React.createElement(Box, { gridColumn: "2/5", display: "flex", gap: "20px" },
            React.createElement(Checkbox, { isChecked: isEnumChecked, onChange: function (evt) {
                    if (!evt.target.checked) {
                        itemState.enum.set(none);
                    }
                    else {
                        itemState.enum.set(Array());
                    }
                } }),
            React.createElement(Textarea, { value: enumValue, isDisabled: !isEnumChecked, placeholder: "ENUM Values - One Entry Per Line", 
                // type={"number"}
                onChange: function (evt) {
                    var re = /^[0-9\n]+$/;
                    if (evt.target.value === "" || re.test(evt.target.value)) {
                        var update = changeEnumOtherValue(evt.target.value);
                        if (update === null) {
                            itemState.enum.set(none);
                        }
                        else {
                            itemState.enum.set(update);
                        }
                    }
                } }))));
};
