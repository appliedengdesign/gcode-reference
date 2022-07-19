# Change Log

All changes to the `gcode-reference` project will be documented here

## v0.0.4

### New Features

- *NEW* Support for JSON Variant files
- Added `getAllCodes` function to `GReference` class

### Fixes

- Renamed all JSON files to conform to `*.cncc.json`
- Changed Mitsubishi & Milltronics variant naming to conform to Schema
- Refactored type definitions to be cleaner
- Added `util` folder and `constants` export.

### Other

- Updated all dependencies
- Updated Typescript to ES2021
- Added Mocha testing w/ JSON Validation
- Updated Copyright year in license
- Added [CNCCodes JSON Schema](https://github.com/appliedengdesign/cnccodes-json-schema) dependency (2022-07).
- Added new scripts for building package
- Added tests to vscode launch
- Updated README
- Updated CONTRIBUTING
- Added `tsconfig.build.json` to exclude test and script folders

## v0.0.3

### Fixes

- Fixed scripts to include JSON in dist

## v0.0.2

### Fixes

- Fixed typo in README
- Fixed `tsconfig.json` includes

## v0.0.1

- Initial Version with minimal framework and schema
