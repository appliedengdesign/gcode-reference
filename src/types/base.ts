/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Applied Eng & Design All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 * -------------------------------------------------------------------------------------------- */
'use strict';

import { CodeType, ICode } from './codes';
import { MachineType } from './machinetypes';
import { Variant } from './variants';

export interface CNCCodes {
    type: CodeType;
    machineType: MachineType;
    variant: {
        name: Variant;
        remove: Array<string>;
    };
    title: string;
    description: string;
    keywords: Array<string>;
    codes: ICode;
}
