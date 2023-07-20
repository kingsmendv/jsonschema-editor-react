import { JSONSchema7 } from "../JsonSchemaEditor.types";
declare function applySchemaDefaultValues(params: {
    schema: JSONSchema7;
    value: any;
    parentSchema?: JSONSchema7;
    name?: string;
}): any;
export { applySchemaDefaultValues };
