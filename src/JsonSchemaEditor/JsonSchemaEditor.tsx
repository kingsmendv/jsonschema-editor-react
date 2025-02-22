import * as React from "react";
import { useState } from "@hookstate/core";
import { useSchemaState, defaultSchema } from "./state";
import { SchemaEditorProps } from "../JsonSchemaEditor.types";
import { Box, Flex, ChakraProvider, theme } from "@chakra-ui/react";

import { SchemaRoot } from "./schema-root";
import { Whoops } from "./whoops";
import { SchemaObject } from "./schema-object";
import { SchemaArray } from "./schema-array";
import { InitialSchemaContext } from "./state/InitialSchemaContext";

export * from "../JsonSchemaEditor.types";

export const JsonSchemaEditor = (props: SchemaEditorProps) => {
	const {
		onSchemaChange,
		readOnly,
		data,
		defaultsOnNewRequired = false,
	} = props;

	const schemaState = useSchemaState({
		jsonSchema: data ?? defaultSchema(),
		isReadOnly: readOnly ?? false,
		fieldId: 0,
	});

	const jsonSchemaState = useState(schemaState.jsonSchema);

	return (
		<ChakraProvider theme={theme}>
			<InitialSchemaContext.Provider
				value={{ defaultsOnNewRequired, schema: data }}
			>
				{schemaState.isValidSchema ? (
					<Flex m={2} direction="column">
						<Flex pr="96px" fontSize="12px" opacity={0.5} fontWeight={500}>
							<Box flexGrow={1} flexBasis="208" px="8px">
								Property
							</Box>
							<Box flexGrow={0} flexBasis="32px" textAlign="center">
								Req.
							</Box>
							<Box flexGrow={1} flexBasis="188" px="8px">
								Data Type
							</Box>
							<Box flexGrow={1} flexBasis="208" px="8px">
								Title
							</Box>
							<Box flexGrow={1} flexBasis="208" px="8px">
								Description
							</Box>
						</Flex>
						<SchemaRoot
							onSchemaChange={onSchemaChange}
							schemaState={schemaState.jsonSchema}
							isReadOnly={schemaState.isReadOnly}
						/>

						{jsonSchemaState.type.value === "object" && (
							<SchemaObject
								schemaState={jsonSchemaState}
								isReadOnly={schemaState.isReadOnly ?? false}
								initialSchema={
									data ? JSON.parse(JSON.stringify(data)) : undefined
								}
							/>
						)}

						{jsonSchemaState.type.value === "array" && (
							<SchemaArray
								schemaState={jsonSchemaState}
								isReadOnly={schemaState.isReadOnly ?? false}
								initialSchema={
									data ? JSON.parse(JSON.stringify(data)) : undefined
								}
							/>
						)}
					</Flex>
				) : (
					<Flex alignContent="center" justifyContent="center">
						<Whoops />
					</Flex>
				)}
				{/* <Modal
          isOpen={localState.isAdvancedOpen.get()}
          finalFocusRef={focusRef}
          size="lg"
          onClose={onCloseAdvanced}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign="center">Advanced Schema Settings</ModalHeader>

            <ModalBody>
              <AdvancedSettings itemStateProp={localState.currentItem} />
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                variant="ghost"
                mr={3}
                onClick={onCloseImport}
              >
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal> */}
			</InitialSchemaContext.Provider>
		</ChakraProvider>
	);
};
