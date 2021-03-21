/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Applied Eng & Design All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 * -------------------------------------------------------------------------------------------- */
'use strict';

import { CNCCodes, MachineType } from '../types';
import fs from 'fs';
import path from 'path';

export function loadJSON(type: MachineType): [CNCCodes, CNCCodes] | [undefined, undefined] {
    // Load JSON by type
    try {
        const gfile = fs.readFileSync(path.join(__dirname, type, 'gcodes.json'), 'utf-8');
        const g: CNCCodes = <CNCCodes>JSON.parse(gfile);

        const mfile = fs.readFileSync(path.join(__dirname, type, 'mcodes.json'), 'utf-8');
        const m: CNCCodes = <CNCCodes>JSON.parse(mfile);

        return [g, m];
    } catch (err) {
        console.error('Error loading JSON file...', err);
    }

    return [undefined, undefined];
}
