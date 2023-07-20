import * as React from "react";
import { useState } from "@hookstate/core";
import * as R from "ramda";
var schemaDraft = "http://json-schema.org/draft-07/schema#";
export var JSONPATH_JOIN_CHAR = ".";
export var PropertyType;
(function (PropertyType) {
    PropertyType[PropertyType["SIBLING"] = 0] = "SIBLING";
    PropertyType[PropertyType["CHILD"] = 1] = "CHILD";
})(PropertyType || (PropertyType = {}));
export function useDebounce(value, delay) {
    var debouncedValue = useState(value);
    React.useEffect(function () {
        var timer = setTimeout(function () { return debouncedValue.set(value); }, delay || 500);
        return function () {
            clearTimeout(timer);
        };
    }, [value, delay]);
    return debouncedValue.value;
}
export default useDebounce;
export var StringFormat = [
    { name: "date-time" },
    { name: "date" },
    { name: "time" },
    { name: "email" },
    { name: "hostname" },
    { name: "ipv4" },
    { name: "ipv6" },
    { name: "uri" },
    { name: "regex" },
];
export var SchemaTypes = [
    "string",
    "number",
    "array",
    "object",
    "boolean",
    "integer",
];
export var DataType;
(function (DataType) {
    DataType["string"] = "string";
    DataType["number"] = "number";
    DataType["array"] = "arrray";
    DataType["object"] = "object";
    DataType["boolean"] = "boolean";
    DataType["integer"] = "integer";
})(DataType || (DataType = {}));
export var getDefaultSchema = function (dataType, includeSchema) {
    switch (dataType) {
        case DataType.number:
            return includeSchema
                ? {
                    $schema: schemaDraft,
                    type: "number",
                    title: "",
                    description: "",
                    properties: {},
                }
                : {
                    type: "number",
                    title: "",
                    description: "",
                    properties: {},
                };
        case DataType.boolean:
            return includeSchema
                ? {
                    $schema: schemaDraft,
                    type: "boolean",
                    title: "",
                    description: "",
                    properties: {},
                }
                : {
                    type: "boolean",
                    title: "",
                    description: "",
                    properties: {},
                };
        case DataType.integer:
            return includeSchema
                ? {
                    $schema: schemaDraft,
                    type: "integer",
                    title: "",
                    description: "",
                    properties: {},
                }
                : {
                    type: "integer",
                    title: "",
                    description: "",
                    properties: {},
                };
        case DataType.array:
            return includeSchema
                ? {
                    $schema: schemaDraft,
                    type: "array",
                    title: "",
                    description: "",
                    items: {
                        type: "string",
                        title: "",
                        description: "",
                    },
                }
                : {
                    type: "array",
                    title: "",
                    description: "",
                    items: {
                        type: "string",
                        title: "",
                        description: "",
                    },
                };
        case DataType.object:
            return includeSchema
                ? {
                    $schema: schemaDraft,
                    type: "object",
                    title: "",
                    description: "",
                    properties: {},
                    required: [],
                }
                : {
                    type: "object",
                    title: "",
                    description: "",
                    properties: {},
                    required: [],
                };
        case DataType.string:
        default:
            return includeSchema
                ? {
                    $schema: schemaDraft,
                    type: "string",
                    title: "",
                    description: "",
                    properties: {},
                }
                : {
                    type: "string",
                    title: "",
                    description: "",
                    properties: {},
                };
    }
};
export var random = function () {
    return Math.random().toString(36).substring(2, 6);
};
export var handleTypeChange = function (newValue, rootChange) {
    switch (newValue) {
        case "array":
            return getDefaultSchema(DataType.array, rootChange);
        case "object":
            return getDefaultSchema(DataType.object, rootChange);
        default:
            return getDefaultSchema(DataType[newValue], rootChange);
    }
};
export var renameKeys = R.curry(function (keysMap, object) {
    return R.reduce(function (acc, key) {
        var k = R.has(key, keysMap) ? keysMap[key] : key;
        acc[k] = object[key];
        return acc;
    }, {}, R.keys(object));
});
export var deleteKey = function (key, object) {
    delete object[key];
    return object;
};
