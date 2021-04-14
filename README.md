[![GitHub Issues](https://badgen.net/github/open-issues/appliedengdesign/gcode-reference)](https://github.com/appliedengdesign/gcode-reference/issues)
![Github Stars](https://badgen.net/github/stars/appliedengdesign/gcode-reference)
![CodeQL](https://github.com/appliedengdesign/gcode-reference/actions/workflows/codeql-analysis.yml/badge.svg)
[![MIT License](https://badgen.net/badge/license/MIT)](https://opensource.org/licenses/MIT)

[![Follow @appliedengdesign](https://badgen.net/twitter/follow/appliedengdes)](https://twitter.com/appliedengdes)

# G-Code Reference

This project aims to provide a JSON-backed reference to the G & M codes associated with CNC mills, lathes, 3D printers and more. This project was created to be consumed by our [VSCode G-Code Syntax] extension for hover information, but we think it can be of use for many different applications.

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

`npm install gcode-reference`

## Usage

Try it in the [Node.js REPL](https://runkit.com/npm/gcode-reference) :)

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

// Get Complete G-Code Object
const gcode = gref.get('G1');

// Get Short Description
const shortDesc = gref.getShortDesc('G1');

// Get Full Description
const desc = gref.getDesc('G1');

// Get Current Machine Type
const type = gref.getType();

// Set Machine Type (Will rebuild reference)
gref.setType(GRef.MachineTypes.Mill);

// Get Parameters for a G/M Code
gref.getParams('G84');

// You can also import the types separately / individually
import { GReference, MachineTypes, Categories, Parameter, Code };

```

## TODO

- Lathe G-Codes
- 3D Printer G-Codes
- Export to Markdown
- Export to HTML

## Schema

The schema used for the JSON data is published in the repo [cnccodes-json-schema](https://github.com/appliedengdesign/cnccodes-json-schema) and was created specifically for this project.

## Issues

If you find any bugs or issues with the package, please create a [new GitHub issue](https://github.com/appliedengdesign/gcode-reference/issues).

## Contributing

For information on contributing, please refer to the [CONTRIBUTING](https://github.com/appliedengdesign/gcode-reference/blob/master/CONTRIBUTING.md) doc for workflows and best practices.

## About Applied Eng & Design

We are a full service engineering and design firm, specializing in CAD/CAM, CNC milling, rapid prototyping, training and more.  We also like to dabble in Arudino / RaspberryPi projects, electronics, drones and robotics projects! Subscribe to our YouTube channel for videos on our projects, screencast tutorials, and more!

Follow us on [Twitter](https://twitter.com/appliedengdes) & [Instagram](https://instagram.com/appliedengdes), and like our [Facebook Page](https://facebook.com/appliedengdesign)!

## License

This extension is licensed under the [MIT License](https://opensource.org/licenses/MIT).
