/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Applied Eng & Design All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 * -------------------------------------------------------------------------------------------- */
'use strict';

import { expect } from 'chai';
import { CodeTypes, GReference, MachineTypes, Variants } from '../src';
import { loadJSON } from '../src/json';

describe('GReference Object', () => {
    describe('Initilization...', () => {
        it('can be initialized without a type.', () => {
            const g = new GReference();
            expect(g.getType()).to.equal(MachineTypes.Mill);
        });

        it('can be initialized with a type.', () => {
            const g = new GReference(MachineTypes.Lathe);
            expect(g.getType()).to.equal(MachineTypes.Lathe);
        });

        it('can be initialized with a variant.', () => {
            const g = new GReference(MachineTypes.Mill, Variants.Mazak);
            expect(g.isVariant()).to.be.true;
            expect(g.getVariant()).to.be.equal(Variants.Mazak);
        });
    });

    describe('Modifying Reference...', () => {
        it('can set the machine type.', () => {
            const g = new GReference();
            expect(g.getType()).to.equal(MachineTypes.Mill);
            g.setType(MachineTypes.Lathe);
            expect(g.getType()).to.equal(MachineTypes.Lathe);
        });

        it('can set the variant.', () => {
            const g = new GReference();
            expect(g.isVariant()).to.be.false;
            g.setVariant(Variants.Mazak);
            expect(g.isVariant()).to.be.true;
            expect(g.getVariant()).to.equal(Variants.Mazak);
        });

        it('can remove the variant.', () => {
            const g = new GReference(MachineTypes.Mill, Variants.Mazak);
            expect(g.isVariant()).to.be.true;
            g.removeVariant();
            expect(g.isVariant()).to.be.false;
        });
    });

    describe('Verifying code usage...', () => {
        it('returns undefined for a wrong code.', () => {
            const g = new GReference();
            expect(g.get('G1234')).to.be.undefined;
        });

        it('returns correct short desc for G Code.', () => {
            const g = new GReference();
            const gc = loadJSON(CodeTypes.G, MachineTypes.Mill);
            expect(g.getShortDesc('G00')).to.equal(gc?.codes.G00.shortDesc);
        });

        it('returns correct short desc for M Code', () => {
            const g = new GReference();
            const mc = loadJSON(CodeTypes.M, MachineTypes.Mill);
            expect(g.getShortDesc('M00')).to.equal(mc?.codes.M00.shortDesc);
        });

        it('returns the complete object.', () => {
            const g = new GReference();
            const gc = loadJSON(CodeTypes.G, MachineTypes.Mill);
            const mc = loadJSON(CodeTypes.M, MachineTypes.Mill);
            expect(g.get('G1')).to.deep.equal(gc?.codes.G01);
            expect(g.get('M0')).to.deep.equal(mc?.codes.M00);
        });

        it('returns all codes', () => {
            const g = new GReference();
            const gc = loadJSON(CodeTypes.G, MachineTypes.Mill);
            const mc = loadJSON(CodeTypes.M, MachineTypes.Mill);
            expect(g.getAllCodes(CodeTypes.G)).to.deep.equal(gc?.codes);
            expect(g.getAllCodes(CodeTypes.M)).to.deep.equal(mc?.codes);
        });

        describe('Verifying Parameters...', () => {
            it('returns correct parameters.', () => {
                const g = new GReference();
                const gc = loadJSON(CodeTypes.G, MachineTypes.Mill);
                const mc = loadJSON(CodeTypes.M, MachineTypes.Mill);
                expect(g.getParams('G84')).to.deep.equal(gc?.codes.G84.parameters);
                expect(g.getParams('M97')).to.deep.equal(mc?.codes.M97.parameters);
            });

            it('returns only required with req flag.', () => {
                const g = new GReference();
                const gc = loadJSON(CodeTypes.G, MachineTypes.Mill);
                const rp = { F: gc?.codes.G74.parameters.F };
                expect(g.getParams('G74', true)).to.deep.equal(rp);
            });

            it('returns undefined for a code w/o parameters.', () => {
                const g = new GReference();
                expect(g.getParams('G17')).to.be.undefined;
            });
        });

        describe('Verifying variant code...', () => {
            it('returns the correct variant code', () => {
                const g = new GReference(MachineTypes.Mill, Variants.Mazak);
                const mc = loadJSON(CodeTypes.M, MachineTypes.Mill);
                const mcv = loadJSON(CodeTypes.M, MachineTypes.Mill, Variants.Mazak);
                expect(g.get('M10')).to.deep.equal(mcv?.codes.M10);
                expect(g.get('M10')).to.not.deep.equal(mc?.codes.M10);
                expect(g.get('M46')).to.deep.equal(mcv?.codes.M46);
            });

            it('returns the correct variant short desc', () => {
                const g = new GReference(MachineTypes.Mill, Variants.Mazak);
                const mcv = loadJSON(CodeTypes.M, MachineTypes.Mill, Variants.Mazak);
                expect(g.getShortDesc('M10')).to.equal(mcv?.codes.M10.shortDesc);
            });

            it('removes codes listed in remove object', () => {
                const g = new GReference(MachineTypes.Mill, Variants.Mazak);
                expect(g.get('M12')).to.be.undefined;
                expect(g.get('M13')).to.be.undefined;
            });
        });
    });
});
