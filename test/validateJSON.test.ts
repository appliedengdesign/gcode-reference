/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Applied Eng & Design All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 * -------------------------------------------------------------------------------------------- */
'use strict';

import { expect } from 'chai';
import Ajv from 'ajv/dist/2020';
import fs from 'fs';
import path from 'path';
import { MachineTypes } from '../src';
import { cncCodesJSONSchema } from '@appliedengdesign/cnccodes-json-schema';

const jpath = path.join('..', 'src', 'json');

// Load AJV
const ajv = new Ajv({ allErrors: true, verbose: true });
const validate = ajv.compile(cncCodesJSONSchema);

describe('Validating JSON', () => {
    Object.values(MachineTypes).forEach(type => {
        const files = fs.readdirSync(path.join(__dirname, jpath, type));
        files.forEach(file => {
            it(`validating ${type}:${file}`, () => {
                const data = fs.readFileSync(path.join(__dirname, jpath, type, file), 'utf-8');
                const code = JSON.parse(data);
                const valid = validate(code);
                expect(valid).to.be.true;
            });
        });
    });
});
