/* eslint-disable @typescript-eslint/no-var-requires */
/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Applied Eng & Design All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 * -------------------------------------------------------------------------------------------- */
'use strict';

const start = process.hrtime();

const Ajv = require('ajv').default;
const schema = require('../src/json/schema/cnccodes.schema.json');

process.stdout.write('Validating JSON...\n\n');

// Load AJV
const ajv = new Ajv({ allErrors: true });
const validate = ajv.compile(schema);

// Validate Mill G-Codes
process.stdout.write('Mill G-Codes...');
const millG = require('../src/json/mill/gcodes.json');
let valid = validate(millG);

if (valid) {
    process.stdout.write('OK!\n\n');
} else {
    process.stderr.write(validate.errors);
}

// Validate Mill M-Codes
process.stdout.write('Mill M-Codes...');
const millM = require('../src/json/mill/mcodes.json');
valid = validate(millM);

if (valid) {
    process.stdout.write('OK!\n\n');
} else {
    process.stderr.write(validate.errors);
}

// Validate Lathe G-Codes
process.stdout.write('Lathe G-Codes...');
const latheG = require('../src/json/lathe/gcodes.json');
valid = validate(latheG);

if (valid) {
    process.stdout.write('OK!\n\n');
} else {
    process.stderr.write(validate.errors);
}

// Validate Lathe M-Codes
process.stdout.write('Lathe M-Codes...');
const latheM = require('../src/json/lathe/mcodes.json');
valid = validate(latheM);

if (valid) {
    process.stdout.write('OK!\n\n');
} else {
    process.stderr.write(validate.errors);
}

// Validate 3D Printer G-Codes
process.stdout.write('3D Printer G-Codes...');
const printerG = require('../src/json/printer/gcodes.json');
valid = validate(printerG);

if (valid) {
    process.stdout.write('OK!\n\n');
} else {
    process.stderr.write(validate.errors);
}

// Validate 3D Printer M-Codes
process.stdout.write('3D Printer M-Codes...');
const printerM = require('../src/json/printer/mcodes.json');
valid = validate(printerM);

if (valid) {
    process.stdout.write('OK!\n\n');
} else {
    process.stderr.write(validate.errors);
}

process.stdout.write('Done! ');

const [secs, nanosecs] = process.hrtime(start);

process.stdout.write(`Finished JSON validation in ${secs * 1000 + nanosecs / 1000000} ms.`);
