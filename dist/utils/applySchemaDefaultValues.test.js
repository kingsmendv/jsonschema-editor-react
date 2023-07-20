import { applySchemaDefaultValues } from "./applySchemaDefaultValues";
function makeJSON(value) {
    return JSON.parse(JSON.stringify(value));
}
describe("applySchemaDefaultVals", function () {
    describe("jest1", function () {
        var schema = {
            $schema: "http://json-schema.org/draft-07/schema#",
            description: "",
            properties: {
                objProp1: {
                    default: "abc123",
                    description: "",
                    properties: {},
                    title: "",
                    type: "string",
                },
            },
            required: ["objProp1"],
            title: "title",
            type: "object",
        };
        test("applies default object property", function () {
            var result = applySchemaDefaultValues({
                schema: schema,
                value: {},
            });
            var expected = { objProp1: "abc123" };
            expect(result).toStrictEqual(expected);
        });
    });
    describe("jest2", function () {
        var schema = {
            $schema: "http://json-schema.org/draft-07/schema#",
            description: "",
            properties: {
                field_qcn6: {
                    description: "",
                    items: {
                        description: "",
                        properties: {
                            arryObjProp1: {
                                default: 69,
                                description: "",
                                properties: {},
                                title: "",
                                type: "number",
                            },
                            nonRequiredStr: {
                                description: "",
                                properties: {},
                                title: "",
                                type: "string",
                            },
                        },
                        required: ["arryObjProp1"],
                        title: "",
                        type: "object",
                    },
                    title: "",
                    type: "array",
                },
            },
            required: [],
            title: "title",
            type: "object",
        };
        test("default values for objs in an array only apply if there are items in the array", function () {
            var result = applySchemaDefaultValues({
                schema: schema,
                value: {},
            });
            var expected = { field_qcn6: [] };
            expect(result).toStrictEqual(expected);
        });
        test("default values for objs in an array should apply here", function () {
            var result = applySchemaDefaultValues({
                schema: schema,
                value: makeJSON({ field_qcn6: [{}] }),
            });
            var expected = {
                field_qcn6: [{ arryObjProp1: 69 }],
            };
            expect(result).toStrictEqual(expected);
        });
        test("should not apply defaults over existing variables", function () {
            var result = applySchemaDefaultValues({
                schema: schema,
                value: makeJSON({
                    field_qcn6: [{}, { arryObjProp1: 100, nonRequiredStr: "hello" }],
                }),
            });
            var expected = {
                field_qcn6: [
                    { arryObjProp1: 69 },
                    { arryObjProp1: 100, nonRequiredStr: "hello" },
                ],
            };
            expect(result).toStrictEqual(expected);
        });
    });
    describe("jest3", function () {
        var schema = {
            $schema: "http://json-schema.org/draft-07/schema#",
            description: "",
            properties: {
                obj1: {
                    description: "",
                    properties: {
                        intProp: {
                            default: 6969,
                            description: "",
                            properties: {},
                            title: "",
                            type: "integer",
                        },
                        obj2: {
                            description: "",
                            properties: {
                                boolProp: {
                                    default: "true",
                                    description: "",
                                    properties: {},
                                    title: "",
                                    type: "boolean",
                                },
                                boolPropFalse: {
                                    default: "false",
                                    description: "",
                                    properties: {},
                                    title: "",
                                    type: "boolean",
                                },
                            },
                            required: ["boolProp", "boolPropFalse"],
                            title: "",
                            type: "object",
                        },
                    },
                    required: ["intProp", "obj2"],
                    title: "",
                    type: "object",
                },
            },
            required: [],
            title: "title",
            type: "object",
        };
        test("should not set defaults for nested obj", function () {
            var result = applySchemaDefaultValues({
                schema: schema,
                value: makeJSON({}),
            });
            var expected = {};
            expect(result).toStrictEqual(expected);
        });
        test("should set defaults for nested obj", function () {
            var result = applySchemaDefaultValues({
                schema: schema,
                value: makeJSON({
                    obj1: {},
                }),
            });
            var expected = {
                obj1: {
                    intProp: 6969,
                    obj2: {
                        boolProp: true,
                        boolPropFalse: false,
                    },
                },
            };
            expect(result).toStrictEqual(expected);
        });
    });
});
