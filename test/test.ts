/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Applied Eng & Design All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 * -------------------------------------------------------------------------------------------- */
'use strict';

import { GReference, MachineTypes } from '../src';

const g = new GReference(MachineTypes.Mill);

process.stdout.write(`${g.getShortDesc('G00') ?? 'Cannot find G-Code'}\n`);
process.stdout.write(`${g.getDesc('G0') ?? 'Cannot find G-Code'}\n`);
process.stdout.write(`${g.getDesc('G00') ?? 'Cannot find G-Code'}\n`);
process.stdout.write(`${g.getShortDesc('M00') ?? 'Cannot find M-Code'}\n`);
process.stdout.write(`${g.getShortDesc('G1') ?? 'Cannot find G-Code'}\n`);
console.error(g.get('G1'));
console.error(g.getParams('G84'));
const p = g.getParams('G84', true);
console.error(p);
