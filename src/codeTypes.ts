/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Applied Eng & Design All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 * -------------------------------------------------------------------------------------------- */
'use strict';

const enum MachineType {
    Mill = 1,
    Lathe,
    Printer,
}

export interface IGCode {
    [gCode: string]: {
        category: string;
        shortDesc: string;
        desc: string;
    };
}

export interface IMCode {
    [mCode: string]: {
        category: string;
        shortDesc: string;
        desc: string;
    };
}

export interface Dictionary {
    readonly gCodes: IGCode[];
    readonly mCodes: IMCode[];
    readonly machineType: MachineType;

    getShortDesc(): string;
    getDesc(): string;
    getCategory(): string;
    getAllAsHtml(): string;
}
