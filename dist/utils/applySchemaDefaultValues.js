function applySchemaDefaultValues(params) {
    var _a;
    var schema = params.schema, value = params.value, parentSchema = params.parentSchema, _b = params.name, name = _b === void 0 ? "" : _b;
    var newJson = value ? JSON.parse(JSON.stringify(value)) : undefined;
    var type = schema.type;
    switch (type) {
        case "object":
            if (!newJson && ((_a = parentSchema === null || parentSchema === void 0 ? void 0 : parentSchema.required) === null || _a === void 0 ? void 0 : _a.includes(name))) {
                newJson = {};
            }
            if (newJson && (schema === null || schema === void 0 ? void 0 : schema.properties)) {
                var propNames = Object.keys(schema.properties);
                propNames.forEach(function (propName) {
                    var propValue = applySchemaDefaultValues({
                        schema: schema.properties[propName],
                        value: newJson[propName],
                        parentSchema: schema,
                        name: propName,
                    });
                    if (propValue !== undefined)
                        newJson[propName] = propValue;
                });
            }
            break;
        case "array":
            if (schema === null || schema === void 0 ? void 0 : schema.items) {
                if (!newJson)
                    newJson = [];
                newJson = newJson.map(function (item) {
                    return applySchemaDefaultValues({
                        schema: schema.items,
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
                    newJson = JSON.parse(schema.default);
                }
            }
            break;
        default:
            break;
    }
    return newJson;
}
export { applySchemaDefaultValues };
