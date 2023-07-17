import { JSONSchema7 } from "../JsonSchemaEditor.types";

type Map = Record<
	string,
	{
		required?: string[];
		defaults?: Record<string, any>;
	}
>;

function getRequiredAndDefaultsMap(params: {
	schema: JSONSchema7;
	propPath?: string;
	map?: Map;
}) {
	let { schema, propPath = "root", map = {} } = params;

	const type = schema.type;

	switch (type) {
		case "object":
			// We know what fields are required here so record it
			if (schema.required && schema.required.length) {
				map[propPath] = { required: schema.required, defaults: {} };
			}

			if (schema?.properties) {
				const propNames = Object.keys(schema.properties);
				propNames.forEach((propName) => {
					const props = schema.properties![propName] as JSONSchema7;

					const isRequired = schema.required?.includes(propName);
					if (isRequired) {
						if (props.default !== undefined && props.default !== "") {
							map[propPath].defaults![propName] = props.default;
						} else if (props.type === "object") {
							map[propPath].defaults![propName] = {};
						} else if (props.type === "array") {
							map[propPath].defaults![propName] = [];
						}
					}

					const childMap = getRequiredAndDefaultsMap({
						schema: props,
						propPath: `${propPath}.${propName}`,
					});

					map = { ...map, ...childMap };
				});
			}
			break;

		case "array":
			if (schema.items) {
				const childMap = getRequiredAndDefaultsMap({
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

type isEditedSchemaValidProps = {
	oldSchema: JSONSchema7;
	editedSchema: JSONSchema7;
};

// If there is a new required field, they must enter a defalt value.
function isEditedSchemaValid({
	oldSchema,
	editedSchema,
}: isEditedSchemaValidProps) {
	const oldRequiredAndDefaultsMap = getRequiredAndDefaultsMap({
		schema: oldSchema,
	});
	const editedRequiredAndDefaultsMap = getRequiredAndDefaultsMap({
		schema: editedSchema,
	});

	const propPaths = Object.keys(editedRequiredAndDefaultsMap);
	const propPathsLen = propPaths.length;
	let isValid = true;

	for (let i = 0; i < propPathsLen; i++) {
		const propPath = propPaths[i];
		const { required: editedRequired, defaults: editedDefaults } =
			editedRequiredAndDefaultsMap[propPath];
		const oldSchemaSettings = oldRequiredAndDefaultsMap[propPath];

		if (editedRequired?.length) {
			const newRequired = difference(
				editedRequired,
				oldSchemaSettings?.required || []
			);
			for (let j = 0; j < newRequired.length; j++) {
				const requiredProp = newRequired[j];

				if (!editedDefaults || editedDefaults[requiredProp] === undefined) {
					console.log(propPath, requiredProp, editedDefaults?.[requiredProp]);
					isValid = false;
					break;
				}
			}

			if (!isValid) break;
		}
	}

	return isValid;
}

// Returns things in arr1 that are not in arr2
function difference(arr1: string[] = [], arr2: string[] = []) {
	const arr2Map = arr2.reduce((map, next) => {
		map[next] = true;
		return map;
	}, {} as Record<string, boolean>);

	return arr1.filter((str) => !arr2Map[str]);
}

export { isEditedSchemaValid, getRequiredAndDefaultsMap };
