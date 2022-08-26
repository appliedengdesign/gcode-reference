[![NPM Version](https://badgen.net/npm/v/@appliedengdesign/gcode-reference)](https://www.npmjs.com/package/@appliedengdesign/gcode-reference) [![NPM DL](https://badgen.net/npm/dt/@appliedengdesign/gcode-reference)](https://www.npmjs.com/package/@appliedengdesign/gcode-reference) [![GitHub Issues](https://badgen.net/github/open-issues/appliedengdesign/gcode-reference)](https://github.com/appliedengdesign/gcode-reference/issues)
[![Github Stars](https://badgen.net/github/stars/appliedengdesign/gcode-reference)](https://github.com/appliedengdesign/gcode-reference) [![MIT License](https://badgen.net/badge/license/MIT)](https://opensource.org/licenses/MIT)

[![CodeQL](https://github.com/appliedengdesign/gcode-reference/actions/workflows/codeql.yml/badge.svg)](https://github.com/appliedengdesign/gcode-reference/actions/workflows/codeql.yml) [![Node.js CI](https://github.com/appliedengdesign/gcode-reference/actions/workflows/nodejs-ci.yml/badge.svg)](https://github.com/appliedengdesign/gcode-reference/actions/workflows/nodejs-ci.yml)

[![Follow @appliedengdesign](https://badgen.net/twitter/follow/appliedengdes)](https://twitter.com/appliedengdes)

# G-Code Reference

This project aims to provide a JSON-backed reference to the G & M codes associated with CNC mills, lathes, 3D printers and more. This project was created to be consumed by our [VSCode G-Code Syntax](https://github.com/appliedengdesign/vscode-gcode-syntax) extension for hover information, but we think it can be of use for many different applications.

## Goals

Since this is still in very early stages of development, here are the goals outlined for the project:

- JSON Files
  - Provide a comprehensive & accurate source of information on G & M codes for CNC Mills & Lathes, as well as 3D Printers.
- Provide an API to be consumed by Typescript / Javascript / Node applications to retrieve the information.
- Ability to generate full pages of information in HTML or Markdown.
- Act as a single reseource via GitHub pages for all to read the documentation
- Provide a simple interface for contributors to add / modify the reference JSON.

## Install

To install the latest version:

`npm install @appliedengdesign/gcode-reference`

## Usage

Try it in the [Node.js REPL](https://npm.runkit.com/%40appliedengdesign%2Fgcode-reference) :)

Javascript:

```javascript
// Import Everything ESM/Typescript style
import * as GRef from 'gcode-reference';
// OR
const GRef = require('gcode-reference');

const gref = new GReference();
// OR
// initialize with a machine type
const gref = new GReference(GRef.MachineTypes.Mill);
// OR
// initalize with a machine type and variant
const gref = new GReference(GRef.MachineTypes.Mill, GRef.Variants.Mazak);

// Get Complete G-Code Object
const gcode = gref.get('G1');

// Get All Codes
const gcode = gref.getAllCodes(CodeTypes.G);

// Get Short Description
const shortDesc = gref.getShortDesc('G1');

// Get Full Description
const desc = gref.getDesc('G1');

// Get Current Machine Type
const type = gref.getType();

// Set Machine Type (Will rebuild reference)
gref.setType(GRef.MachineTypes.Mill);

// Set or Remove a Variant
gref.setVariant(Gref.MachineTypes.Mazak);
gref.removeVariant();

// Check if there is a variant
gref.isVariant();

// Get Parameters for a G/M Code
gref.getParams('G84');

// You can also import the types separately / individually
import {
  Categories,
  Category,
  CNCCodes,
  Code,
  CodeType,
  CodeTypes,
  ICode,
  MachineType,
  MachineTypes,
  Parameters,
  Variant,
  Variants,
} from 'gcode-reference';
```

## TODO

- Lathe G/M Codes
- 3D Printer G/M Codes
- Swiss G/M Codes
- EDM G/M Codes
- Laser G/M Codes
- Variants
- Export to Markdown
- Export to HTML

## Schema

The schema used for the JSON data is published in the repo [cnccodes-json-schema](https://github.com/appliedengdesign/cnccodes-json-schema) and was created specifically for this project.

## Issues

If you find any bugs or issues with the package, please create a [new GitHub issue](https://github.com/appliedengdesign/gcode-reference/issues).

## Contributing

### We Need Your Help

We need people to help add more G & M codes to the various machine tool bases as well as adding variants.

For information on contributing, please refer to the [CONTRIBUTING](https://github.com/appliedengdesign/gcode-reference/blob/master/CONTRIBUTING.md) doc for information on how to add to this project.

### Contributors

- Mike Centola ([@mikecentola](https://github.com/mikecentola)) - [contributions](https://github.com/appliedengdesign/gcode-reference/commits?author=mikecentola)
- Tyeth Gundry ([@tyeth](https://github.com/tyeth)) - [contributions](https://github.com/appliedengdesign/gcode-reference/commits?author=tyeth)

## About Applied Eng & Design

We are a full service engineering and design firm, specializing in CAD/CAM, CNC milling, rapid prototyping, training and more. We also like to dabble in Arudino / RaspberryPi projects, electronics, drones and robotics projects! Subscribe to our YouTube channel for videos on our projects, screencast tutorials, and more!

Follow us on [Twitter](https://twitter.com/appliedengdes) & [Instagram](https://instagram.com/appliedengdes), and like our [Facebook Page](https://facebook.com/appliedengdesign)!

## License

This extension is licensed under the [MIT License](https://opensource.org/licenses/MIT).
