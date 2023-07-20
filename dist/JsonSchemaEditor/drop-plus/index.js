import * as React from "react";
import { Popover, PopoverTrigger, PopoverContent, Stack, IconButton, Button, } from "@chakra-ui/react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { DataType, getDefaultSchema } from "../utils";
import { useState } from "@hookstate/core";
import { random } from "../utils";
export var DropPlus = function (props) {
    var itemState = useState(props.itemStateProp);
    var parentState = useState(props.parentStateProp);
    var parentStateOrNull = parentState.ornull;
    var propertiesOrNull = parentStateOrNull.properties.ornull;
    var itemPropertiesOrNull = itemState.properties.ornull;
    if (props.isDisabled) {
        return React.createElement("div", null);
    }
    if (!parentStateOrNull) {
        return React.createElement(React.Fragment, null);
    }
    return (React.createElement(Popover, { trigger: "hover" },
        React.createElement(PopoverTrigger, null,
            React.createElement(IconButton, { isRound: true, size: "sm", variant: "link", colorScheme: "green", fontSize: "16px", icon: React.createElement(IoIosAddCircleOutline, null), "aria-label": "Add Child Node" })),
        React.createElement(PopoverContent, { border: "0", zIndex: 4, width: "100px", color: "white" },
            React.createElement(Stack, null,
                React.createElement(Button, { colorScheme: "blue", variant: "outline", size: "xs", onClick: function () {
                        var fieldName = "field_".concat(random());
                        propertiesOrNull === null || propertiesOrNull === void 0 ? void 0 : propertiesOrNull.nested(fieldName).set(getDefaultSchema(DataType.string));
                    } }, "Sibling Node"),
                React.createElement(Button, { size: "xs", colorScheme: "orange", variant: "outline", onClick: function () {
                        if (itemState.properties) {
                            var fieldName = "field_".concat(random());
                            itemPropertiesOrNull === null || itemPropertiesOrNull === void 0 ? void 0 : itemPropertiesOrNull.nested(fieldName).set(getDefaultSchema(DataType.string));
                        }
                    } }, "Child Node")))));
};
