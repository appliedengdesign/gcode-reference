/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Applied Eng & Design All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 * -------------------------------------------------------------------------------------------- */
'use strict';

import { expect } from 'chai';
import { GReference, MachineTypes } from '../src';
import { loadJSON } from '../src/json';

describe('GReference Object', () => {
    it('can be initialized without a type.', () => {
        const g = new GReference();
        expect(g.getType()).to.equal(MachineTypes.Mill);
    });

    it('can be initialized with a type.', () => {
        const g = new GReference(MachineTypes.Lathe);
        expect(g.getType()).to.equal(MachineTypes.Lathe);
    });

    it('can set the machine type.', () => {
        const g = new GReference();
        g.setType(MachineTypes.Lathe);
        expect(g.getType()).to.equal(MachineTypes.Lathe);
    });

    it('returns undefined for a wrong code.', () => {
        const g = new GReference();
        expect(g.get('G1234')).to.be.undefined;
    });

    it('returns correct short desc for G & M.', () => {
        const g = new GReference();
        const [gc, mc] = loadJSON(MachineTypes.Mill);
        expect(g.getShortDesc('G00')).to.equal(gc!.codes.G00.shortDesc);
        expect(g.getShortDesc('M00')).to.equal(mc!.codes.M00.shortDesc);
    });

    it('returns the complete object.', () => {
        const g = new GReference();
        const [gc, mc] = loadJSON(MachineTypes.Mill);
        expect(g.get('G1')).to.deep.equal(gc!.codes.G01);
        expect(g.get('M0')).to.deep.equal(mc!.codes.M00);
    });

    it('returns correct parameters', () => {
        const g = new GReference();
        const [gc, mc] = loadJSON(MachineTypes.Mill);
        expect(g.getParams('G84')).to.deep.equal(gc!.codes.G84.parameters);
        expect(g.getParams('M97')).to.deep.equal(mc!.codes.M97.parameters);
    });
});
