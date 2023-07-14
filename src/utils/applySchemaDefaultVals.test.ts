import { applySchemaDefaultValues } from "./applySchemaDefaultVals";
import { JSONSchema7 } from "../JsonSchemaEditor.types";

function makeJSON(value: any) {
	return JSON.parse(JSON.stringify(value));
}

describe("applySchemaDefaultVals", () => {
	describe("jest1", () => {
		const schema = {
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
		} as JSONSchema7;

		test("applies default object property", () => {
			const result = applySchemaDefaultValues({
				schema,
				value: {} as JSON,
			});
			const expected = { objProp1: "abc123" };
			expect(result).toStrictEqual(expected);
		});
	});

	describe("jest2", () => {
		const schema = {
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
		} as JSONSchema7;

		test("default values for objs in an array only apply if there are items in the array", () => {
			const result = applySchemaDefaultValues({
				schema,
				value: {} as JSON,
			});
			const expected = { field_qcn6: [] };
			expect(result).toStrictEqual(expected);
		});

		test("default values for objs in an array should apply here", () => {
			const result = applySchemaDefaultValues({
				schema,
				value: makeJSON({ field_qcn6: [{}] }),
			});
			const expected = {
				field_qcn6: [{ arryObjProp1: 69 }],
			};
			expect(result).toStrictEqual(expected);
		});

		test("should not apply defaults over existing variables", () => {
			const result = applySchemaDefaultValues({
				schema,
				value: makeJSON({
					field_qcn6: [{}, { arryObjProp1: 100, nonRequiredStr: "hello" }],
				}),
			});
			const expected = {
				field_qcn6: [
					{ arryObjProp1: 69 },
					{ arryObjProp1: 100, nonRequiredStr: "hello" },
				],
			};
			expect(result).toStrictEqual(expected);
		});
	});

	describe("jest3", () => {
		const schema = {
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
		} as JSONSchema7;

		test("should not set defaults for nested obj", () => {
			const result = applySchemaDefaultValues({
				schema,
				value: makeJSON({}),
			});
			const expected = {};
			expect(result).toStrictEqual(expected);
		});

		test("should set defaults for nested obj", () => {
			const result = applySchemaDefaultValues({
				schema,
				value: makeJSON({
					obj1: {},
				}),
			});
			const expected = {
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
