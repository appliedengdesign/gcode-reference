/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Applied Eng & Design All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 * -------------------------------------------------------------------------------------------- */
'use strict';

import { ICode } from '../types';

interface CNCCodes {
    type: string;
    machineType: string;
    title: string;
    codes: ICode;
}

// Milling
import millGCodes from './mill/gcodes.json';
import millMCodes from './mill/mcodes.json';

// Exports
export const millingGCodes: CNCCodes = millGCodes;
export const millingMCodes: CNCCodes = millMCodes;
