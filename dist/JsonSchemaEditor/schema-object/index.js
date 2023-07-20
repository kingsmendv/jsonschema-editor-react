import * as React from "react";
import { SchemaItem } from "../schema-item";
import { useState } from "@hookstate/core";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, } from "@chakra-ui/react";
import { AdvancedSettings } from "../schema-advanced";
export var SchemaObject = function (props) {
    var _a;
    var schemaState = props.schemaState, isReadOnly = props.isReadOnly;
    var schema = useState(schemaState);
    var properties = useState(schema.properties);
    var propertiesOrNull = properties.ornull;
    var isReadOnlyState = useState(isReadOnly);
    var onCloseAdvanced = function () {
        localState.isAdvancedOpen.set(false);
    };
    var showadvanced = function (item) {
        localState.isAdvancedOpen.set(true);
        localState.item.set(item);
    };
    var focusRef = React.createRef();
    var localState = useState({
        isAdvancedOpen: false,
        item: "",
    });
    if (!propertiesOrNull) {
        return React.createElement(React.Fragment, null);
    }
    else {
        return (React.createElement("div", { className: "object-style" }, (_a = propertiesOrNull === null || propertiesOrNull === void 0 ? void 0 : propertiesOrNull.keys) === null || _a === void 0 ? void 0 :
            _a.map(function (name) {
                return (React.createElement(SchemaItem, { key: String(name), itemStateProp: propertiesOrNull.nested(name), parentStateProp: schema, name: name, showadvanced: showadvanced, required: schema.required.value, isReadOnly: isReadOnlyState, initialSchema: props.initialSchema }));
            }),
            React.createElement(Modal, { isOpen: localState.isAdvancedOpen.get(), finalFocusRef: focusRef, size: "lg", onClose: onCloseAdvanced },
                React.createElement(ModalOverlay, null),
                React.createElement(ModalContent, null,
                    React.createElement(ModalHeader, { textAlign: "center" }, "Advanced Schema Settings"),
                    React.createElement(ModalBody, null,
                        React.createElement(AdvancedSettings, { itemStateProp: propertiesOrNull.nested(localState.item.value) })),
                    React.createElement(ModalFooter, null,
                        React.createElement(Button, { colorScheme: "blue", variant: "ghost", mr: 3, onClick: onCloseAdvanced }, "Close"))))));
    }
};
