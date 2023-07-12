import { createContext } from "react";
import { JSONSchema7 } from "../../JsonSchemaEditor.types";

const InitialSchemaContext = createContext<{ schema?: JSONSchema7 }>({});

export { InitialSchemaContext };
