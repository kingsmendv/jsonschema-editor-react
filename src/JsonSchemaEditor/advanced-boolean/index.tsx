import * as React from "react";
import { Flex, FormLabel, Select } from "@chakra-ui/react";

import { AdvancedItemStateProps } from "../../JsonSchemaEditor.types";
import { useState } from "@hookstate/core";

export const AdvancedBoolean: React.FunctionComponent<AdvancedItemStateProps> =
	(props: React.PropsWithChildren<AdvancedItemStateProps>) => {
		const { itemStateProp } = props;

		const item = useState(itemStateProp);

		return (
			<Flex wrap="nowrap" gap="20px" alignItems="center">
				<FormLabel m={0} htmlFor="default">
					Default
				</FormLabel>
				<Select
					variant="outline"
					value={(item.default.value as string) ?? ""}
					margin={2}
					placeholder="Choose data type"
					onChange={(evt: React.ChangeEvent<HTMLSelectElement>) => {
						item.default.set(evt.target.value);
					}}
				>
					<option key="true" value="true">
						true
					</option>
					<option key="false" value="false">
						false
					</option>
				</Select>
			</Flex>
		);
	};
