import { createState } from "@hookstate/core";
import Ajv from "ajv";
var ajv = new Ajv();
export var defaultSchema = function () {
    return {
        $schema: "http://json-schema.org/draft-07/schema#",
        type: "object",
        title: "title",
        description: "",
        properties: {},
        required: [],
    };
};
var isValidSchema = function (schema) {
    var isValid = ajv.validateSchema(schema);
    return isValid;
};
export var useSchemaState = function (initialState) {
    if (initialState.jsonSchema === undefined) {
        initialState.jsonSchema = defaultSchema();
    }
    initialState.isValidSchema = isValidSchema(initialState.jsonSchema);
    return createState(initialState);
};
