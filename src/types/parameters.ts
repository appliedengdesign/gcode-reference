/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Applied Eng & Design All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 * -------------------------------------------------------------------------------------------- */
'use strict';

export type Parameter = {
    shortDesc: string;
    desc?: string;
    optional: boolean;
};

export interface Parameters extends Record<string, Parameter> {
    [parameter: string]: Parameter;
}
