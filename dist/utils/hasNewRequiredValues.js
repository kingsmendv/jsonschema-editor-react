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
function hasNewRequiredValues(oldSchema, newSchema) { }
function getRequiredMap(params) {
    var schema = params.schema, _a = params.propPath, propPath = _a === void 0 ? "root" : _a, _b = params.map, map = _b === void 0 ? {} : _b;
    var type = schema.type;
    switch (type) {
        case "object":
            if (schema.required && schema.required.length) {
                map[propPath] = schema.required;
            }
            if (schema === null || schema === void 0 ? void 0 : schema.properties) {
                var propNames = Object.keys(schema.properties);
                propNames.forEach(function (propName) {
                    var childMap = getRequiredMap({
                        schema: schema.properties[propName],
                        propPath: "".concat(propPath, ".").concat(propName),
                    });
                    map = __assign(__assign({}, map), childMap);
                });
            }
            break;
        case "array":
            if (schema.items) {
                var childMap = getRequiredMap({
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
export { hasNewRequiredValues, getRequiredMap };
