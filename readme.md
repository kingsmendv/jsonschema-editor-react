<p align="center">
  json-schema-editor - A React Component
</p>

<p align="center">
  <a href="https://github.com/xojs/xo"><img src="https://img.shields.io/badge/code_style-XO-5ed9c7.svg"></a>➕
  <a href="https://github.com/prettier/prettier"><img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square"></a>➕
  <a href="https://chakra-ui.com/"><img src="https://img.shields.io/badge/built%20with-chakra--ui-green"></a>➕
<a href="https://optum.github.io/jsonschema-editor-react/"><img src="https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg"></a>
</p>

## Description

> JSON Schema is hypermedia ready, and ideal for annotating your existing JSON-based HTTP API. JSON Schema documents are identified by URIs, which can be used in HTTP Link headers, and inside JSON Schema documents to allow recursive definitions. - [json-schema.org](https://json-schema.org/)

JsonSchemaEditor is a React component library that allows the easy generation of valid `Draft 07` JsonSchema from a UI, so that it can be easily persisted in a schema management system.

Benefits include:

- Describes your existing data format(s).
- Provides clear human- and machine- readable - documentation.
- Validates data which is useful for:
  - Automated testing.
  - Ensuring quality of client submitted data.

## Documentation

Control documentation and demo can be viewed [here](https://optum.github.io/jsonschema-editor-react/)

## Install

```shell
npm install @optum/json-schema-editor
```

or

```shell
yarn add @optum/json-schema-editor
```

## Props

| property       | type                               | description                                  | default               |
| -------------- | ---------------------------------- | -------------------------------------------- | --------------------- |
| data           | object                             | the initial data for the editor              | {}                    |
| readOnly       | boolean                            | make editor read only                        | false                 |
| onSchemaChange | callback (results: string) => void | callback method to capture changes to schema | required (no default) |

## Usage

```js
import { JsonSchemaEditor } from "@optum/json-schema-editor";

export const printIt = (schema) => {
	console.log(schema);
};

function App() {
	return (
		<div className="App">
			<JsonSchemaEditor onSchemaChange={printIt} />
		</div>
	);
}

export default App;
```

## License

jsonchema-editor-react is Copyright © 2021 Optum. It is free software and may be redistributed under the Apache 2.0 license.

## Development

### Commands

> Run storybook

```shell
npm run storybook
```

> Create docs and build for release

```shell
npm run build-storybook
```

> Run tests locally

```shell
npm test
```

> Build dist

```shell
npm run build
```
