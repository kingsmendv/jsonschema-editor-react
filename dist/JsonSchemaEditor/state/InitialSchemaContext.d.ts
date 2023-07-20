/// <reference types="react" />
import { JSONSchema7 } from "../../JsonSchemaEditor.types";
declare type InitialSchemaVal = {
    schema?: JSONSchema7;
    defaultsOnNewRequired?: boolean;
};
declare const InitialSchemaContext: import("react").Context<InitialSchemaVal>;
export { InitialSchemaContext };
