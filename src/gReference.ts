/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Applied Eng & Design All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 * -------------------------------------------------------------------------------------------- */
'use strict';

import { ICode } from './types';
import * as codes from './json';

export class GReference {
    private _gcodes: ICode[] = [];

    constructor() {
        // Build Dictionary from JSON
        this.buildReference();
    }

    private buildReference(): void {
        console.error(codes.millingGCodes.codes);
    }

    getDescByCode(code: string): ICode {}
}
