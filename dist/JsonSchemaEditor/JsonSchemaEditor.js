import * as React from "react";
import { useState } from "@hookstate/core";
import { useSchemaState, defaultSchema } from "./state";
import { Box, Flex, ChakraProvider, theme } from "@chakra-ui/react";
import { SchemaRoot } from "./schema-root";
import { Whoops } from "./whoops";
import { SchemaObject } from "./schema-object";
import { SchemaArray } from "./schema-array";
import { InitialSchemaContext } from "./state/InitialSchemaContext";
export * from "../JsonSchemaEditor.types";
export var JsonSchemaEditor = function (props) {
    var _a, _b;
    var onSchemaChange = props.onSchemaChange, readOnly = props.readOnly, data = props.data, _c = props.defaultsOnNewRequired, defaultsOnNewRequired = _c === void 0 ? false : _c;
    var schemaState = useSchemaState({
        jsonSchema: data !== null && data !== void 0 ? data : defaultSchema(),
        isReadOnly: readOnly !== null && readOnly !== void 0 ? readOnly : false,
        fieldId: 0,
    });
    var jsonSchemaState = useState(schemaState.jsonSchema);
    return (React.createElement(ChakraProvider, { theme: theme },
        React.createElement(InitialSchemaContext.Provider, { value: { defaultsOnNewRequired: defaultsOnNewRequired, schema: data } }, schemaState.isValidSchema ? (React.createElement(Flex, { m: 2, direction: "column" },
            React.createElement(Flex, { pr: "96px", fontSize: "12px", opacity: 0.5, fontWeight: 500 },
                React.createElement(Box, { flexGrow: 1, flexBasis: "208", px: "8px" }, "Property"),
                React.createElement(Box, { flexGrow: 0, flexBasis: "32px", textAlign: "center" }, "Req."),
                React.createElement(Box, { flexGrow: 1, flexBasis: "188", px: "8px" }, "Data Type"),
                React.createElement(Box, { flexGrow: 1, flexBasis: "208", px: "8px" }, "Title"),
                React.createElement(Box, { flexGrow: 1, flexBasis: "208", px: "8px" }, "Description")),
            React.createElement(SchemaRoot, { onSchemaChange: onSchemaChange, schemaState: schemaState.jsonSchema, isReadOnly: schemaState.isReadOnly }),
            jsonSchemaState.type.value === "object" && (React.createElement(SchemaObject, { schemaState: jsonSchemaState, isReadOnly: (_a = schemaState.isReadOnly) !== null && _a !== void 0 ? _a : false, initialSchema: data ? JSON.parse(JSON.stringify(data)) : undefined })),
            jsonSchemaState.type.value === "array" && (React.createElement(SchemaArray, { schemaState: jsonSchemaState, isReadOnly: (_b = schemaState.isReadOnly) !== null && _b !== void 0 ? _b : false, initialSchema: data ? JSON.parse(JSON.stringify(data)) : undefined })))) : (React.createElement(Flex, { alignContent: "center", justifyContent: "center" },
            React.createElement(Whoops, null))))));
};
