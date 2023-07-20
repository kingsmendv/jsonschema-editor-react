var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function getRequiredAndDefaultsMap(params) {
    var schema = params.schema, _a = params.propPath, propPath = _a === void 0 ? "root" : _a, _b = params.map, map = _b === void 0 ? {} : _b;
    var type = schema.type;
    switch (type) {
        case "object":
            // We know what fields are required here so record it
            if (schema.required && schema.required.length) {
                map[propPath] = { required: schema.required, defaults: {} };
            }
            if (schema === null || schema === void 0 ? void 0 : schema.properties) {
                var propNames = Object.keys(schema.properties);
                propNames.forEach(function (propName) {
                    var _a;
                    var props = schema.properties[propName];
                    var isRequired = (_a = schema.required) === null || _a === void 0 ? void 0 : _a.includes(propName);
                    if (isRequired) {
                        if (props.default !== undefined && props.default !== "") {
                            map[propPath].defaults[propName] = props.default;
                        }
                        else if (props.type === "object") {
                            map[propPath].defaults[propName] = {};
                        }
                        else if (props.type === "array") {
                            map[propPath].defaults[propName] = [];
                        }
                    }
                    var childMap = getRequiredAndDefaultsMap({
                        schema: props,
                        propPath: "".concat(propPath, ".").concat(propName),
                    });
                    map = __assign(__assign({}, map), childMap);
                });
            }
            break;
        case "array":
            if (schema.items) {
                var childMap = getRequiredAndDefaultsMap({
                    schema: schema.items,
                    propPath: "".concat(propPath),
                });
                map = __assign(__assign({}, map), childMap);
            }
            break;
        default:
            break;
    }
    return map;
}
// If there is a new required field, they must enter a defalt value.
function isEditedSchemaValid(_a) {
    var oldSchema = _a.oldSchema, editedSchema = _a.editedSchema;
    var oldRequiredAndDefaultsMap = getRequiredAndDefaultsMap({
        schema: oldSchema,
    });
    var editedRequiredAndDefaultsMap = getRequiredAndDefaultsMap({
        schema: editedSchema,
    });
    var propPaths = Object.keys(editedRequiredAndDefaultsMap);
    var propPathsLen = propPaths.length;
    var isValid = true;
    for (var i = 0; i < propPathsLen; i++) {
        var propPath = propPaths[i];
        var _b = editedRequiredAndDefaultsMap[propPath], editedRequired = _b.required, editedDefaults = _b.defaults;
        var oldSchemaSettings = oldRequiredAndDefaultsMap[propPath];
        if (editedRequired === null || editedRequired === void 0 ? void 0 : editedRequired.length) {
            var newRequired = difference(editedRequired, (oldSchemaSettings === null || oldSchemaSettings === void 0 ? void 0 : oldSchemaSettings.required) || []);
            for (var j = 0; j < newRequired.length; j++) {
                var requiredProp = newRequired[j];
                if (!editedDefaults || editedDefaults[requiredProp] === undefined) {
                    isValid = false;
                    break;
                }
            }
            if (!isValid)
                break;
        }
    }
    return isValid;
}
// Returns things in arr1 that are not in arr2
function difference(arr1, arr2) {
    if (arr1 === void 0) { arr1 = []; }
    if (arr2 === void 0) { arr2 = []; }
    var arr2Map = arr2.reduce(function (map, next) {
        map[next] = true;
        return map;
    }, {});
    return arr1.filter(function (str) { return !arr2Map[str]; });
}
export { isEditedSchemaValid, getRequiredAndDefaultsMap };
