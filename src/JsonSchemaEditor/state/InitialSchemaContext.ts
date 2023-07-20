import { createContext } from "react";
import { JSONSchema7 } from "../../JsonSchemaEditor.types";

type InitialSchemaVal = {
	schema?: JSONSchema7;
	defaultsOnNewRequired?: boolean;
};

const InitialSchemaContext = createContext<InitialSchemaVal>({});

export { InitialSchemaContext };
