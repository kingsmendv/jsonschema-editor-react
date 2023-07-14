import { JSONSchema7 } from "../JsonSchemaEditor.types";
declare function hasNewRequiredValues(oldSchema: JSONSchema7, newSchema: JSONSchema7): void;
declare function getRequiredMap(params: {
    schema: JSONSchema7;
    propPath?: string;
    map?: Record<string, String[]>;
}): Record<string, String[]>;
export { hasNewRequiredValues, getRequiredMap };
