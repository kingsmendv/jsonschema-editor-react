import { JSONSchema7 } from "../JsonSchemaEditor.types";
import {
	isEditedSchemaValid,
	getRequiredAndDefaultsMap,
} from "./isEditedSchemaValid";

describe("getRequiredAndDefaultsMap", () => {
	test("should return map of the required property and default value for an object", () => {
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

		const result = getRequiredAndDefaultsMap({
			schema,
		});
		const expected = {
			root: {
				required: ["objProp1"],
				defaults: {
					objProp1: "abc123",
				},
			},
		};
		expect(result).toStrictEqual(expected);
	});

	test("should return map of the required property and default value for an object in an array", () => {
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

		const result = getRequiredAndDefaultsMap({ schema });
		const expected = {
			"root.field_qcn6": {
				required: ["arryObjProp1"],
				defaults: {
					arryObjProp1: 69,
				},
			},
		};
		expect(result).toStrictEqual(expected);
	});

	test("should return map of the required properties and defaults for nested objects", () => {
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

		const result = getRequiredAndDefaultsMap({ schema });
		const expected = {
			"root.obj1": {
				required: ["intProp", "obj2"],
				defaults: {
					intProp: 6969,
					obj2: {},
				},
			},
			"root.obj1.obj2": {
				required: ["boolProp", "boolPropFalse"],
				defaults: {
					boolProp: "true",
					boolPropFalse: "false",
				},
			},
		};
		expect(result).toStrictEqual(expected);
	});
});

describe("isEditedSchemaValid", () => {
	describe("shcema with an object", () => {
		const oldSchema = {
			$schema: "http://json-schema.org/draft-07/schema#",
			description: "",
			properties: {
				objProp1: {
					description: "",
					properties: {},
					title: "",
					type: "string",
				},
			},
			required: [],
			title: "title",
			type: "object",
		} as JSONSchema7;

		test("marking existing field as required field with a default", () => {
			const editedSchema = {
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
			expect(isEditedSchemaValid({ oldSchema, editedSchema })).toBe(true);
		});

		test("marking new field as required field with a default", () => {
			const editedSchema = {
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
					fruit: {
						default: "pineapple",
						description: "",
						properties: {},
						title: "",
						type: "string",
					},
				},
				required: ["fruit"],
				title: "title",
				type: "object",
			} as JSONSchema7;
			expect(isEditedSchemaValid({ oldSchema, editedSchema })).toBe(true);
		});

		test("marking new field as required field without a default", () => {
			const editedSchema = {
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
					fruit: {
						description: "",
						properties: {},
						title: "",
						type: "string",
					},
				},
				required: ["fruit"],
				title: "title",
				type: "object",
			} as JSONSchema7;
			expect(isEditedSchemaValid({ oldSchema, editedSchema })).toBe(false);
		});
	});

	describe("schema with an object in an array", () => {
		const oldSchema = {
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

		test("adding new field that is not required", () => {
			const editedSchema = {
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
								newField: {
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

			expect(isEditedSchemaValid({ oldSchema, editedSchema })).toBe(true);
		});

		test("adding nested required obj with new field that is not required", () => {
			const editedSchema = {
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
								newObj: {
									description: "",
									properties: {
										newStr: {
											description: "",
											properties: {},
											title: "",
											type: "string",
										},
									},
									title: "",
									type: "object",
								},
							},
							required: ["arryObjProp1", "newObj"],
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

			expect(isEditedSchemaValid({ oldSchema, editedSchema })).toBe(true);
		});

		test("adding nested required obj with new field that is required and has default", () => {
			const editedSchema = {
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
								newObj: {
									required: ["newStr"],
									description: "",
									properties: {
										newStr: {
											default: "ham",
											description: "",
											properties: {},
											title: "",
											type: "string",
										},
									},
									title: "",
									type: "object",
								},
							},
							required: ["arryObjProp1", "newObj"],
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

			expect(isEditedSchemaValid({ oldSchema, editedSchema })).toBe(true);
		});

		test("adding nested required obj with new field that is required and has no default", () => {
			const editedSchema = {
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
								newObj: {
									required: ["newStr"],
									description: "",
									properties: {
										newStr: {
											default: "",
											description: "",
											properties: {},
											title: "",
											type: "string",
										},
									},
									title: "",
									type: "object",
								},
							},
							required: ["arryObjProp1", "newObj"],
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

			expect(isEditedSchemaValid({ oldSchema, editedSchema })).toBe(false);
		});
	});

	describe("schema with nested obj", () => {
		const oldSchema = {
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

		test("add array of obj with a required prop with default value to nested obj", () => {
			const editedSchema = {
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
									newArr: {
										description: "",
										items: {
											description: "",
											properties: {
												newReqField: {
													default: "coooool",
													description: "",
													properties: {},
													title: "",
													type: "string",
												},
											},
											required: ["newReqField"],
											title: "",
											type: "object",
										},
										title: "",
										type: "array",
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

			expect(isEditedSchemaValid({ oldSchema, editedSchema })).toBe(true);
		});

		test("add array of obj with a required prop without default value to nested obj", () => {
			const editedSchema = {
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
									newArr: {
										description: "",
										items: {
											description: "",
											properties: {
												newReqField: {
													description: "",
													properties: {},
													title: "",
													type: "string",
												},
											},
											required: ["newReqField"],
											title: "",
											type: "object",
										},
										title: "",
										type: "array",
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

			expect(isEditedSchemaValid({ oldSchema, editedSchema })).toBe(false);
		});

		test("add required array of obj to nested obj", () => {
			const editedSchema = {
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
									newArr: {
										description: "",
										items: {
											description: "",
											properties: {
												newReqField: {
													default: "coooool",
													description: "",
													properties: {},
													title: "",
													type: "string",
												},
											},
											title: "",
											type: "object",
										},
										title: "",
										type: "array",
									},
								},
								required: ["boolProp", "boolPropFalse", "newArr"],
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

			expect(isEditedSchemaValid({ oldSchema, editedSchema })).toBe(true);
		});
	});
});
