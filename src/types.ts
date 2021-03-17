/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Applied Eng & Design All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 * -------------------------------------------------------------------------------------------- */
'use strict';

export enum MachineTypes {
    Mill = 'Mill',
    Lathe = 'Lathe',
    Printer = 'Printer',
}

export type MachineType = MachineTypes;

type Code = {
    category: string;
    shortDesc: string;
    desc: string;
};
export interface ICode extends Record<string, Code> {
    [code: string]: Code;
}
