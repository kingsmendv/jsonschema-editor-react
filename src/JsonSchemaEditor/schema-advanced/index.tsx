import * as React from "react";
import { Flex } from "@chakra-ui/react";
import { AdvancedString } from "../advanced-string";
import { AdvancedNumber } from "../advanced-number";
import { AdvancedBoolean } from "../advanced-boolean";
import { JSONSchema7 } from "../../JsonSchemaEditor.types";
import { State, useState } from "@hookstate/core";

export interface AdvancedSettingsProps {
	itemStateProp: State<JSONSchema7>;
	isRetroactiveValueRequired?: boolean;
}

export const AdvancedSettings: React.FunctionComponent<AdvancedSettingsProps> = (
	props: React.PropsWithChildren<AdvancedSettingsProps>
) => {
	const itemState = useState(props.itemStateProp);

	const getAdvancedView = (
		item: State<JSONSchema7>
	): JSX.Element | undefined => {
		switch (itemState.type.value) {
			case "string":
				return (
					<AdvancedString
						itemStateProp={item}
						isRetroactiveValueRequired={props.isRetroactiveValueRequired}
					/>
				);
			case "number":
			case "integer":
				return (
					<AdvancedNumber
						itemStateProp={item}
						isRetroactiveValueRequired={props.isRetroactiveValueRequired}
					/>
				);
			case "boolean":
				return <AdvancedBoolean itemStateProp={item} />;
			default:
				return undefined;
		}
	};

	return <Flex>{getAdvancedView(itemState)}</Flex>;
};
