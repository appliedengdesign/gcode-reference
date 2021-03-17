/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Applied Eng & Design All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 * -------------------------------------------------------------------------------------------- */
'use strict';

import { GReference, MachineTypes } from '../index';

const g = new GReference(MachineTypes.Mill);

process.stdout.write(`${g.getShortDescByCode('G00')}\n`);
process.stdout.write(`${g.getDescByCode('G00')}\n`);
// process.stdout.write(`${g.getDescByCode('M00')}\n`);
