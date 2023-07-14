import { JSONSchema7 } from "../JsonSchemaEditor.types";
import { getRequiredMap } from "./hasNewRequiredValues";

describe("getRequiredMap", () => {
	test("1", () => {
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

		const result = getRequiredMap({
			schema,
		});
		const expected = { root: ["objProp1"] };
		expect(result).toStrictEqual(expected);
	});

	test("2", () => {
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

		const result = getRequiredMap({ schema });
		const expected = { "root.field_qcn6": ["arryObjProp1"] };
		expect(result).toStrictEqual(expected);
	});

	test("3", () => {
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

		const result = getRequiredMap({ schema });
		const expected = {
			"root.obj1": ["intProp", "obj2"],
			"root.obj1.obj2": ["boolProp", "boolPropFalse"],
		};
		expect(result).toStrictEqual(expected);
	});
});
