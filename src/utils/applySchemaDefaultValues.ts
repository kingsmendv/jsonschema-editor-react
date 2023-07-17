import { JSONSchema7 } from "../JsonSchemaEditor.types";

function applySchemaDefaultValues(params: {
	schema: JSONSchema7;
	value: JSON;
	parentSchema?: JSONSchema7;
	name?: string;
}) {
	const { schema, value, parentSchema, name = "" } = params;

	let newJson = value ? JSON.parse(JSON.stringify(value)) : undefined;
	const type = schema.type;

	switch (type) {
		case "object":
			if (!newJson && parentSchema?.required?.includes(name)) {
				newJson = {};
			}

			if (newJson && schema?.properties) {
				const propNames = Object.keys(schema.properties);
				propNames.forEach((propName) => {
					const propValue = applySchemaDefaultValues({
						schema: schema.properties![propName] as JSONSchema7,
						value: newJson[propName],
						parentSchema: schema,
						name: propName,
					});
					if (propValue !== undefined) newJson[propName] = propValue;
				});
			}
			break;

		case "array":
			if (schema?.items) {
				if (!newJson) newJson = [];

				newJson = newJson.map((item: JSON) => {
					return applySchemaDefaultValues({
						schema: schema.items as JSONSchema7,
						value: item,
					});
				});
			}
			break;

		case "string":
			if (schema.default) {
				if (typeof newJson !== "string") {
					newJson = schema.default;
				}
			}
			break;

		case "number":
			if (schema.default) {
				if (typeof newJson !== "number") {
					newJson = schema.default;
				}
			}
			break;

		case "integer":
			if (schema.default) {
				if (typeof newJson !== "number") {
					newJson = schema.default;
				}
			}
			break;

		case "boolean":
			if (schema.default) {
				if (typeof newJson !== "boolean") {
					newJson = JSON.parse(schema.default as string);
				}
			}
			break;

		default:
			break;
	}

	return newJson;
}

export { applySchemaDefaultValues };
