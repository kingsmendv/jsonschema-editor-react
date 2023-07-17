import { JSONSchema7 } from "../JsonSchemaEditor.types";
declare type Map = Record<string, {
    required?: string[];
    defaults?: Record<string, any>;
}>;
declare function getRequiredAndDefaultsMap(params: {
    schema: JSONSchema7;
    propPath?: string;
    map?: Map;
}): Record<string, {
    required?: string[] | undefined;
    defaults?: Record<string, any> | undefined;
}>;
declare type isEditedSchemaValidProps = {
    oldSchema: JSONSchema7;
    editedSchema: JSONSchema7;
};
declare function isEditedSchemaValid({ oldSchema, editedSchema, }: isEditedSchemaValidProps): boolean;
export { isEditedSchemaValid, getRequiredAndDefaultsMap };
