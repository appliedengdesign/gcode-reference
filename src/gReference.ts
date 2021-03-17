/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Applied Eng & Design All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 * -------------------------------------------------------------------------------------------- */
'use strict';

import { ICode, MachineType } from './types';
import * as codes from './json';

export class GReference {
    private _gcodes: ICode = {};
    private _mcodes: ICode = {};
    private _machineType: MachineType;

    constructor(type: MachineType) {
        this._machineType = type;
        console.error(`Machine Type: ${this._machineType}`);

        // Build Dictionary from JSON
        this.buildReference();
    }

    private buildReference(): void {
        Object.assign(this._gcodes, codes.millingGCodes.codes);

        console.error(this._gcodes);
    }

    getDescByCode(code: string): string {
        return this._gcodes[code].desc;
    }

    getShortDescByCode(code: string): string {
        return this._gcodes[code].shortDesc;
    }
}
