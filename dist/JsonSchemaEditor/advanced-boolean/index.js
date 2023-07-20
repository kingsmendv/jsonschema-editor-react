import * as React from "react";
import { Flex, FormLabel, Select } from "@chakra-ui/react";
import { useState } from "@hookstate/core";
export var AdvancedBoolean = function (props) {
    var _a;
    var itemStateProp = props.itemStateProp;
    var item = useState(itemStateProp);
    return (React.createElement(Flex, { wrap: "nowrap", gap: "20px", alignItems: "center" },
        React.createElement(FormLabel, { m: 0, htmlFor: "default" }, "Default"),
        React.createElement(Select, { variant: "outline", value: (_a = item.default.value) !== null && _a !== void 0 ? _a : "", margin: 2, placeholder: "Choose data type", onChange: function (evt) {
                item.default.set(evt.target.value);
            } },
            React.createElement("option", { key: "true", value: "true" }, "true"),
            React.createElement("option", { key: "false", value: "false" }, "false"))));
};
