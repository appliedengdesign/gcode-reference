/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Applied Eng & Design All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 * -------------------------------------------------------------------------------------------- */
'use strict';

// To match the machineType definition in the CNCCodes JSON Schema
export enum MachineTypes {
    EDM = 'edm',
    Mill = 'mill',
    Lathe = 'lathe',
    Laser = 'laser',
    Printer = 'printer',
    Swiss = 'swiss',
}

export type MachineType = MachineTypes;
