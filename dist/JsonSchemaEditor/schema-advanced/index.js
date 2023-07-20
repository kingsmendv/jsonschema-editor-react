import * as React from "react";
import { Flex } from "@chakra-ui/react";
import { AdvancedString } from "../advanced-string";
import { AdvancedNumber } from "../advanced-number";
import { AdvancedBoolean } from "../advanced-boolean";
import { useState } from "@hookstate/core";
export var AdvancedSettings = function (props) {
    var itemState = useState(props.itemStateProp);
    var getAdvancedView = function (item) {
        switch (itemState.type.value) {
            case "string":
                return React.createElement(AdvancedString, { itemStateProp: item });
            case "number":
            case "integer":
                return React.createElement(AdvancedNumber, { itemStateProp: item });
            case "boolean":
                return React.createElement(AdvancedBoolean, { itemStateProp: item });
            default:
                return undefined;
        }
    };
    return React.createElement(Flex, null, getAdvancedView(itemState));
};
