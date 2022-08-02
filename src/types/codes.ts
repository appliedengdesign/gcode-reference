/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Applied Eng & Design All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 * -------------------------------------------------------------------------------------------- */
'use strict';

import { Category } from './categories';
import { Parameters } from './parameters';

export type Code = {
    category: Category;
    modal?: boolean;
    shortDesc: string;
    desc?: string;
    parameters: Parameters;
};
export interface ICode extends Record<string, Code> {
    [code: string]: Code;
}

export enum CodeTypes {
    G = 'gcode',
    M = 'mcode',
}

export type CodeType = CodeTypes;
