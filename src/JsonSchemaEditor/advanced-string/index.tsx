import * as React from "react";
import {
	Box,
	Input,
	FormLabel,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	Checkbox,
	Textarea,
	Select,
	DividerProps,
} from "@chakra-ui/react";
import {
	AdvancedItemStateProps,
	JSONSchema7,
} from "../../JsonSchemaEditor.types";
import { none, useState } from "@hookstate/core";
import { StringFormat } from "../utils";

export const AdvancedString: React.FunctionComponent<AdvancedItemStateProps> = (
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

	const layoutStyle: DividerProps["style"] = {
		display: "grid",
		gridTemplateColumns: "auto 1fr auto 1fr",
		gap: "15px 20px",
		width: "100%",
		alignItems: "center",
	};

	return (
		<div style={layoutStyle}>
			<FormLabel m={0}>Default</FormLabel>
			<Input
				id="default"
				placeholder="Default value"
				value={(itemState.default.value as string) ?? ""}
				onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
					itemState.default.set(evt.target.value);
				}}
				gridColumn="2/5"
			/>

			<FormLabel m={0}>Min Length</FormLabel>
			<NumberInput
				defaultValue={
					itemState.minLength.value === undefined
						? undefined
						: Number(itemState.minLength.value)
				}
				onChange={(value: number | string) => {
					itemState.minLength.set(Number(value));
				}}
			>
				<NumberInputField value={Number(itemState.minLength.value)} />
				<NumberInputStepper>
					<NumberIncrementStepper />
					<NumberDecrementStepper />
				</NumberInputStepper>
			</NumberInput>
			<FormLabel m={0}>Max Length</FormLabel>
			<NumberInput
				defaultValue={
					itemState.maxLength.value === undefined
						? undefined
						: Number(itemState.maxLength.value)
				}
				onChange={(value: number | string) => {
					itemState.maxLength.set(Number(value));
				}}
			>
				<NumberInputField value={Number(itemState.maxLength.value)} />
				<NumberInputStepper>
					<NumberIncrementStepper />
					<NumberDecrementStepper />
				</NumberInputStepper>
			</NumberInput>

			<FormLabel m={0} htmlFor="pattern">
				Pattern
			</FormLabel>
			<Input
				id="pattern"
				placeholder="MUST be a valid regular expression."
				value={itemState.pattern.value ?? ""}
				onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
					itemState.pattern.set(evt.target.value);
				}}
				gridColumn="2/5"
			/>

			<FormLabel m={0}>Enum</FormLabel>
			<Box gridColumn="2/5" display="flex" gap="20px">
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
					value={enumValue || ""}
					isDisabled={!isEnumChecked}
					placeholder="ENUM Values - One Entry Per Line"
					onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
						const update = changeEnumOtherValue(evt.target.value);
						if (update === null) {
							itemState.enum.set(none);
						} else {
							itemState.enum.set(update as string[]);
						}
					}}
				/>
			</Box>

			<FormLabel m={0} htmlFor="format">
				Format
			</FormLabel>
			<Select
				variant="outline"
				value={itemState.format.value ?? ""}
				placeholder="Choose data type"
				onChange={(evt: React.ChangeEvent<HTMLSelectElement>) => {
					if (evt.target.value === "") {
						itemState.format.set(none);
					} else {
						itemState.format.set(evt.target.value);
					}
				}}
				gridColumn="2/5"
			>
				{StringFormat.map((item, index) => {
					return (
						<option key={String(index)} value={item.name}>
							{item.name}
						</option>
					);
				})}
			</Select>
		</div>
	);
};
