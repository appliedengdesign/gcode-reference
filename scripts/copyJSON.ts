/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Applied Eng & Design All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 * -------------------------------------------------------------------------------------------- */
'use strict';

const start = process.hrtime();

import fs from 'fs';
import { MachineTypes } from '../src';
import path from 'path';

const jpath = path.join(__dirname, '..', 'src', 'json');
const distJPath = path.join(__dirname, '..', 'dist', 'json');

// Create folder structure
process.stdout.write('Creating JSON folder...');
if (!fs.existsSync(distJPath)) {
    fs.mkdirSync(distJPath, { recursive: true });
}
process.stdout.write('Done!\n');

Object.values(MachineTypes).forEach(type => {
    // Create folder
    process.stdout.write(`Creating ${type} folder...`);
    if (!fs.existsSync(path.join(distJPath, type))) {
        fs.mkdirSync(path.join(distJPath, type), { recursive: true });
        process.stdout.write('Done!\n');
    } else {
        process.stdout.write('Exists!\n');
    }

    // Copy G/M JSON File
    process.stdout.write('Copying G/M JSON Files....');
    fs.copyFileSync(path.join(jpath, type, 'g.cncc.json'), path.join(distJPath, type, 'g.cncc.json'));
    fs.copyFileSync(path.join(jpath, type, 'm.cncc.json'), path.join(distJPath, type, 'm.cncc.json'));
    process.stdout.write('Done!\n');

    // Variants
    // Create folder
    process.stdout.write('Creating Variants Folder...');
    if (!fs.existsSync(path.join(distJPath, type, 'variants'))) {
        fs.mkdirSync(path.join(distJPath, type, 'variants'), { recursive: true });
        process.stdout.write('Done!\n');
    } else {
        process.stdout.write('Exists!\n');
    }

    const files = fs.readdirSync(path.join(jpath, type, 'variants'));

    process.stdout.write('Copying Variant G/M Files...\n');
    files.forEach(file => {
        if (fs.statSync(path.join(jpath, type, 'variants', file)).isDirectory() || /^..*/.test(file)) {
            return;
        }

        // Copy files
        process.stdout.write(`...${file}\n`);
        fs.copyFileSync(path.join(jpath, type, 'variants', file), path.join(distJPath, type, 'variants', file));
    });
    process.stdout.write('Done!\n');
});

const [secs, nanosecs] = process.hrtime(start);
process.stdout.write(`\nFinished Copying JSON in ${secs * 1000 + nanosecs / 1000000} ms\n`);
