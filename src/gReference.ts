/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Applied Eng & Design All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 * -------------------------------------------------------------------------------------------- */
'use strict';

import { loadJSON } from './json';
import { Code, ICode, MachineType, MachineTypes, Parameters } from './types';

export class GReference {
    private _gcodes: ICode = {};
    private _mcodes: ICode = {};
    private _machineType: MachineType;

    constructor(private type: MachineType = MachineTypes.Mill) {
        // Default is Mill
        this._machineType = type;
        this.buildReference();
    }

    private buildReference() {
        const [g, m] = loadJSON(this._machineType);

        Object.assign(this._gcodes, g?.codes);
        Object.assign(this._mcodes, m?.codes);
    }

    private cleanCode(code: string): string {
        // Check for leading zero
        if (code.length === 2) {
            code = `${code[0]}0${code.substring(1)}`;
        }

        return code;
    }

    getType(): MachineType {
        return this._machineType;
    }

    setType(type: MachineType): void {
        this._machineType = type;
    }

    get(code: string): Code | undefined {
        code = this.cleanCode(code);

        if (code[0].toUpperCase() === 'G') {
            if (code in this._gcodes) {
                return this._gcodes[code];
            }
        } else {
            if (code in this._mcodes) {
                return this._mcodes[code];
            }
        }
    }

    getDesc(code: string): string | undefined {
        code = this.cleanCode(code);

        return this.get(code)?.desc;
    }

    getShortDesc(code: string): string | undefined {
        code = this.cleanCode(code);

        return this.get(code)?.shortDesc;
    }

    getParams(code: string, req?: boolean): Parameters | undefined {
        code = this.cleanCode(code);
        const c = this.get(code);

        if (req) {
            const params: Parameters = {};

            const p = c?.parameters;

            for (const key in p) {
                if (Object.prototype.hasOwnProperty.call(p, key)) {
                    if (!p[key].optional) {
                        params[key] = p[key];
                    }
                }
            }
            return params;
        } else {
            return c?.parameters;
        }
    }
}
