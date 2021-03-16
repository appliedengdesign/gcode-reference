/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Applied Eng & Design All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 * -------------------------------------------------------------------------------------------- */
'use strict';

const enum MachineTypes {
    Mill = 1,
    Lathe,
    Printer,
}

export type MachineType = keyof typeof MachineTypes;

export interface ICode extends Record<string, any> {
    [code: string]: {
        category: string;
        shortDesc: string;
        desc: string;
    };
}

export interface Dictionary {
    gCodes: ICode[];
    mCodes: ICode[];
    machineType: MachineType;
}
