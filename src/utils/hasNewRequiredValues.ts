import { JSONSchema7 } from "../JsonSchemaEditor.types";

function hasNewRequiredValues(oldSchema: JSONSchema7, newSchema: JSONSchema7) {}

function getRequiredMap(params: {
	schema: JSONSchema7;
	propPath?: string;
	map?: Record<string, String[]>;
}) {
	let { schema, propPath = "root", map = {} } = params;

	const type = schema.type;

	switch (type) {
		case "object":
			if (schema.required && schema.required.length) {
				map[propPath] = schema.required;
			}

			if (schema?.properties) {
				const propNames = Object.keys(schema.properties);
				propNames.forEach((propName) => {
					const childMap = getRequiredMap({
						schema: schema.properties![propName] as JSONSchema7,
						propPath: `${propPath}.${propName}`,
					});

					map = { ...map, ...childMap };
				});
			}
			break;

		case "array":
			if (schema.items) {
				const childMap = getRequiredMap({
					schema: schema.items as JSONSchema7,
					propPath: `${propPath}`,
				});

				map = { ...map, ...childMap };
			}
			break;

		default:
			break;
	}

	return map;
}

export { hasNewRequiredValues, getRequiredMap };
