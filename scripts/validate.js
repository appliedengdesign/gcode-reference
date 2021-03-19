/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-var-requires */
/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Applied Eng & Design All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 * -------------------------------------------------------------------------------------------- */
'use strict';

const start = process.hrtime();

const Ajv = require('ajv').default;
const path = require('path');
const fs = require('fs');
const schema = require('../src/json/schema/cnccodes.schema.json');

const mtypes = ['Mill', 'Lathe', 'Printer'];
const files = ['gcodes.json', 'mcodes.json'];
const jpath = path.join('.', 'src', 'json/');

process.stdout.write('Validating JSON...\n\n');

// Load AJV
process.stdout.write('Loading Schema...');
const ajv = new Ajv({ allErrors: true });
const validate = ajv.compile(schema);
process.stdout.write('Done.\n\n');

mtypes.forEach(mt => {
    process.stdout.write(`Checking ${mt} G-Codes...\n`);
    try {
        const file = fs.readFileSync(path.join(jpath, mt.toLowerCase(), files[0]), 'utf-8');

        const g = JSON.parse(file);

        const valid = validate(g);

        if (valid) {
            process.stdout.write('OK\n\n');
        } else {
            for (const err of validate.errors) {
                process.stdout.write(`${err.dataPath} ${err.message ?? ''}\n`);
            }
            process.stdout.write(`-- ${mt} G-Codes has errors --\n\n`);
        }
    } catch (err) {
        if (err instanceof Error && err.code === 'ENOENT') {
            process.stderr.write(err.message);
        }
    }

    process.stdout.write(`Checking ${mt} M-Codes...\n`);

    try {
        const file = fs.readFileSync(path.join(jpath, mt.toLowerCase(), files[1]), 'utf-8');

        const m = JSON.parse(file);

        const valid = validate(m);

        if (valid) {
            process.stdout.write('OK\n\n');
        } else {
            for (const err of validate.errors) {
                process.stdout.write(`${err.dataPath} ${err.message ?? ''}\n`);
            }
            process.stdout.write(`-- ${mt} M-Codes has errors --`);
        }
    } catch (err) {
        if (err instanceof Error && err.code === 'ENOENT') {
            process.stderr.write(err.message);
        }
    }
});

process.stdout.write('Done! ');

const [secs, nanosecs] = process.hrtime(start);

process.stdout.write(`Finished JSON validation in ${secs * 1000 + nanosecs / 1000000} ms.`);
