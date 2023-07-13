import * as React from "react";
import {
	Flex,
	FormLabel,
	Stack,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	Checkbox,
	Textarea,
} from "@chakra-ui/react";

import {
	AdvancedItemStateProps,
	JSONSchema7,
} from "../../JsonSchemaEditor.types";
import { none, useState } from "@hookstate/core";

export const AdvancedNumber: React.FunctionComponent<AdvancedItemStateProps> = (
	props: React.PropsWithChildren<AdvancedItemStateProps>
) => {
	const { itemStateProp } = props;

	const changeEnumOtherValue = (value: string): string[] | null => {
		const array = value.split("\n");
		if (array.length === 0 || (array.length === 1 && !array[0])) {
			return null;
		}

		return array;
	};

	const itemState = useState(itemStateProp);

	const isEnumChecked = (itemState.value as JSONSchema7).enum !== undefined;
	const enumData = (itemState.value as JSONSchema7).enum
		? (itemState.enum.value as string[])
		: [];
	const enumValue = enumData?.join("\n");

	const defaultVal = (itemState.default.value || "") as string;
	const defaultMinVal = (itemState.minimum.value || "") as string;
	const defaultMaxVal = (itemState.maximum.value || "") as string;

	return (
		<Flex direction="column" wrap="nowrap">
			{/* {props.isRetroactiveValueRequired && (
				<Stack
					isInline
					alignItems="center"
					justifyContent="center"
					alignContent="center"
					m={1}
				>
					<FormLabel mr={2}>Retroactive Value: </FormLabel>
					<NumberInput
						size="sm"
						id="retroactiveValue"
						placeholder="Value"
						onChange={(value: number | string) => {
							// itemState.default.set(evt.target.value);
						}}
					>
						<NumberInputField value={defaultVal} />
						<NumberInputStepper>
							<NumberIncrementStepper />
							<NumberDecrementStepper />
						</NumberInputStepper>
					</NumberInput>
				</Stack>
			)} */}

			<Stack
				isInline
				alignItems="center"
				justifyContent="center"
				alignContent="center"
				m={1}
			>
				<FormLabel mr={2}>Default: </FormLabel>

				<NumberInput
					size="sm"
					defaultValue={defaultVal}
					placeholder="Default value"
					onChange={(value: number | string) => {
						itemState.default.set(Number(value));
					}}
				>
					<NumberInputField value={defaultVal} />
					<NumberInputStepper>
						<NumberIncrementStepper />
						<NumberDecrementStepper />
					</NumberInputStepper>
				</NumberInput>
			</Stack>

			<Stack
				isInline
				alignItems="center"
				justifyContent="center"
				alignContent="center"
				m={1}
			>
				<FormLabel mr={2}>Min Value: </FormLabel>
				<NumberInput
					size="sm"
					defaultValue={defaultMinVal}
					onChange={(value: number | string) => {
						itemState.minimum.set(Number(value));
					}}
				>
					<NumberInputField value={defaultMinVal} />
					<NumberInputStepper>
						<NumberIncrementStepper />
						<NumberDecrementStepper />
					</NumberInputStepper>
				</NumberInput>
				<FormLabel mr={2}>Max Value: </FormLabel>
				<NumberInput
					size="sm"
					defaultValue={defaultMaxVal}
					onChange={(value: number | string) => {
						itemState.maximum.set(Number(value));
					}}
				>
					<NumberInputField value={defaultMaxVal} />
					<NumberInputStepper>
						<NumberIncrementStepper />
						<NumberDecrementStepper />
					</NumberInputStepper>
				</NumberInput>
			</Stack>
			<Stack
				isInline
				alignItems="center"
				justifyContent="center"
				alignContent="center"
				m={1}
			>
				<FormLabel mr={2}>Enum: </FormLabel>
				<Checkbox
					isChecked={isEnumChecked}
					onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
						if (!evt.target.checked) {
							itemState.enum.set(none);
						} else {
							itemState.enum.set(Array<string>());
						}
					}}
				/>
				<Textarea
					value={enumValue}
					isDisabled={!isEnumChecked}
					placeholder="ENUM Values - One Entry Per Line"
					// type={"number"}
					onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
						const re = /^[0-9\n]+$/;
						if (evt.target.value === "" || re.test(evt.target.value)) {
							const update = changeEnumOtherValue(evt.target.value);
							if (update === null) {
								itemState.enum.set(none);
							} else {
								itemState.enum.set(update as string[]);
							}
						}
					}}
				/>
			</Stack>
		</Flex>
	);
};
