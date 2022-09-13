/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Applied Eng & Design All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 * -------------------------------------------------------------------------------------------- */
'use strict';

import { loadJSON } from './json';
import { CNCCodes, Code, CodeTypes, ICode, MachineType, MachineTypes, Parameters, Variant } from './types';
import { MDUtils } from './util/mdUtils';

export class GReference {
    private _gcode: CNCCodes | undefined;
    private _mcode: CNCCodes | undefined;
    private _machineType: MachineType;
    private _variant: Variant | undefined;

    constructor(private machineType?: MachineType, private variant?: Variant) {
        // Default is Mill, No Variant
        machineType !== undefined ? (this._machineType = machineType) : (this._machineType = MachineTypes.Mill);
        variant !== undefined ? (this._variant = variant) : undefined;
        this._buildReference();
    }

    private _buildReference() {
        // Load G Codes from JSON
        this._gcode = loadJSON(CodeTypes.G, this._machineType, this._variant);

        // Load M Codes from JSON
        this._mcode = loadJSON(CodeTypes.M, this._machineType, this._variant);
    }

    private _cleanCode(code: string): string {
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
        if (this._machineType === type) {
            return;
        } else {
            this._machineType = type;
            this._buildReference();
        }
    }

    isVariant(): boolean {
        if (this._variant) {
            return true;
        } else {
            return false;
        }
    }

    getVariant(): Variant | undefined {
        return this._variant;
    }

    setVariant(variant: Variant | undefined): void {
        if (this._variant === variant) {
            return;
        } else {
            this._variant = variant;
            this._buildReference();
        }
    }

    removeVariant(): void {
        this._variant = undefined;
        this._buildReference();
    }

    get(code: string): Code | undefined {
        code = this._cleanCode(code);

        if (code[0].toUpperCase() === 'G') {
            if (this._gcode) {
                const codes = this._gcode.codes;

                if (code in codes) {
                    return codes[code];
                } else {
                    return undefined;
                }
            } else {
                return undefined;
            }
        } else if (code[0].toUpperCase() === 'M') {
            if (this._mcode) {
                const codes = this._mcode.codes;
                if (code in codes) {
                    return codes[code];
                } else {
                    return undefined;
                }
            } else {
                return undefined;
            }
        }

        return undefined;
    }

    getDesc(code: string): string | undefined {
        return this.get(code)?.desc;
    }

    getShortDesc(code: string): string | undefined {
        return this.get(code)?.shortDesc;
    }

    getParams(code: string, req?: boolean): Parameters | undefined {
        const c = this.get(code);

        if (c) {
            if (req) {
                const params: Parameters = {};

                const p = c.parameters;

                for (const key in p) {
                    if (Object.prototype.hasOwnProperty.call(p, key)) {
                        if (!p[key].optional) {
                            params[key] = p[key];
                        }
                    }
                }
                return params;
            } else {
                return c.parameters;
            }
        } else {
            return undefined;
        }
    }

    getAllCodes(codeType: CodeTypes): ICode | undefined {
        if (codeType === CodeTypes.G) {
            return this._gcode?.codes;
        } else if (codeType === CodeTypes.M) {
            return this._mcode?.codes;
        }

        return undefined;
    }

    getCodeAsMarkdown(code: string): string | undefined {
        const c = this.get(code);

        if (c) {
            return MDUtils.codeToMarkdown(code, c);
        } else {
            return undefined;
        }
    }

    getAllCodesAsMarkdown(codeType: CodeTypes): string | undefined {
        if (codeType === CodeTypes.G && this._gcode) {
            return MDUtils.allCodesToMarkdown(this._gcode);
        } else if (codeType === CodeTypes.M && this._mcode) {
            return MDUtils.allCodesToMarkdown(this._mcode);
        }

        return undefined;
    }
}
