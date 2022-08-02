/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Applied Eng & Design All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 * -------------------------------------------------------------------------------------------- */
'use strict';

import { CodeTypes, GReference, MachineTypes, Variants } from '../src';

if (process.argv[2] !== undefined) {
    const type = process.argv[2].split(':');

    // Check for Machine Type
    if (!Object.values<string>(MachineTypes).includes(type[0])) {
        console.error(`Invalid Machine Type: ${type[0]}`);
        process.exit(1);
    } else if (type[1]) {
        // Check for specific code type
        if (!Object.values<string>(CodeTypes).includes(type[1])) {
            console.error(`Invalid Code Type: ${type[1]}`);
            process.exit(1);
        } else if (type[2]) {
            // Check for specific variant
            if (!Object.values<string>(Variants).includes(type[2])) {
                console.error(`Invalid Variant Type: ${type[2]}`);
                process.exit(1);
            } else {
                // Specific Code, Specific Variant
                const gref = new GReference(type[0] as MachineTypes, type[2] as Variants);
                console.log('GReference Object created...');
                console.log(`Type: ${gref.getType()}`);
                console.log(`Variant: ${gref.getVariant() || ''}`);

                // Output Codes
                console.log(gref.getAllCodes(type[1] as CodeTypes));
            }
        } else {
            // Specifc Code, No Variant
            const gref = new GReference(type[0] as MachineTypes);
            console.log('GReference Object created...');
            console.log(`Type: ${gref.getType()}`);

            // Output Codes
            console.dir(gref.getAllCodes(type[1] as CodeTypes), { depth: null });
        }
    } else {
        // No Specific Code
        console.error('Need to add gcode or mcode to arguments (i.e mill:gcode)');
        process.exit(1);
    }
} else {
    console.error('No Machine Type and code specified. (i.e. mill:gcode)');
    process.exit(1);
}
