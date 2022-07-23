/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Applied Eng & Design All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 * -------------------------------------------------------------------------------------------- */
'use strict';

import { CNCCodes, CodeType, CodeTypes, MachineType, Variant } from '../types';
import fs from 'fs';
import path from 'path';
import { constants } from '../util/constants';

export function loadJSON(codeType: CodeType, machineType: MachineType, variant?: Variant): CNCCodes | undefined {
    const fname = `${codeType[0]}${constants.jsonExt}`;

    switch (codeType) {
        // G Code
        case CodeTypes.G:
            {
                try {
                    const gFile = fs.readFileSync(path.join(__dirname, machineType, fname), { encoding: 'utf-8' });
                    const g: CNCCodes = <CNCCodes>JSON.parse(gFile);

                    if (variant) {
                        const variantName = `${codeType[0]}.${variant}${constants.jsonExt}`;
                        if (!fs.existsSync(path.join(__dirname, machineType, 'variants', variantName))) {
                            return g;
                        }
                        try {
                            const vFile = fs.readFileSync(
                                path.join(__dirname, machineType, 'variants', variantName),
                                'utf-8',
                            );

                            // Overlay variant codes over original
                            const v: CNCCodes = <CNCCodes>JSON.parse(vFile);
                            const newCodes = { ...g.codes, ...v.codes };
                            g.codes = newCodes;

                            // Remove codes from object
                            v.variant.remove.forEach(c => {
                                delete g.codes[c];
                            });

                            return g;
                        } catch (err) {
                            console.error(`Error loading ${variant} G-Code JSON File`);
                        }
                    }
                    return g;
                } catch (err) {
                    console.error(`Error loading JSON file ${fname}...`, err);
                }
            }
            break;

        // M Code
        case CodeTypes.M:
            {
                try {
                    const mFile = fs.readFileSync(path.join(__dirname, machineType, fname), { encoding: 'utf-8' });
                    const m: CNCCodes = <CNCCodes>JSON.parse(mFile);

                    if (variant) {
                        const variantName = `${codeType[0]}.${variant}${constants.jsonExt}`;
                        if (!fs.existsSync(path.join(__dirname, machineType, 'variants', variantName))) {
                            return m;
                        }
                        try {
                            const vFile = fs.readFileSync(
                                path.join(__dirname, machineType, 'variants', variantName),
                                'utf-8',
                            );

                            // Overlay variant codes over original
                            const v: CNCCodes = <CNCCodes>JSON.parse(vFile);
                            const newCodes = { ...m.codes, ...v.codes };
                            m.codes = newCodes;

                            // Remove codes from object
                            v.variant.remove.forEach(c => {
                                delete m.codes[c];
                            });

                            return m;
                        } catch (err) {
                            console.error(`Error loading ${variant} M-Code JSON File`);
                        }
                    }
                    return m;
                } catch (err) {
                    console.error(`Error loading JSON file ${fname}...`, err);
                }
            }
            break;

        default: {
            return undefined;
        }
    }

    return undefined;
}
