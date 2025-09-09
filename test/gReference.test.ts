/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Applied Eng & Design All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 * -------------------------------------------------------------------------------------------- */
'use strict';

import { CodeTypes, GReference, MachineTypes, Variants } from '../src';
import { expect } from 'chai';
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

        describe('Verifying Markdown Generation...', () => {
            it('generates the proper markdown for a code', () => {
                const g = new GReference();
                const md = g.getCodeAsMarkdown('G1');
                expect(md).to.equal(
                    '# G1 - Linear Interpolation Motion\n' +
                        '\n' +
                        '## Description\n' +
                        'G01 is used to move machine axes at specified feedrate.\n' +
                        '\n' +
                        '### Modal: true\n' +
                        '\n' +
                        '## Parameters\n' +
                        '\n' +
                        '| Parameter | Description | Optional |\n' +
                        '| X | X-Axis motion command | true |\n' +
                        '| Y | Y-Axis motion command | true |\n' +
                        '| Z | Z-Axis motion command | true |\n' +
                        '| A | A-Axis motion command | true |\n' +
                        '| B | B-Axis motion command | true |\n' +
                        '| C | C-Axis motion command | true |\n',
                );
            });
        });

        describe('Verifying HTML Generation...', () => {
            it('generates the proper html for a code', () => {
                const g = new GReference();
                const html = g.getCodeAsHTML('G1', false);
                expect(html).to.equal(
                    '<!DOCTYPE html>\n' +
                        '<html lang="en"\n' +
                        '<head>\n' +
                        '<meta charset="utf-8">\n' +
                        '</head>\n' +
                        '<h1>G1 - Linear Interpolation Motion</h1>\n' +
                        '\n' +
                        '<h2>Description</h2>\n' +
                        '\n' +
                        '<p>G01 is used to move machine axes at specified feedrate.</p>\n' +
                        '\n' +
                        '<h3>Modal: true</h3>\n' +
                        '\n' +
                        '<h2>Parameters</h2>\n' +
                        '\n' +
                        '<table>\n' +
                        '<thead>\n' +
                        '<tr>\n' +
                        '<th>Parameter</th>\n' +
                        '<th>Description</th>\n' +
                        '<th>Optional</th>\n' +
                        '</tr>\n' +
                        '</thead>\n' +
                        '<tbody>\n' +
                        '<tr>\n' +
                        '<td>X</td>\n' +
                        '<td>X-Axis motion command</td>\n' +
                        '<td>true\n' +
                        '</tr>\n' +
                        '<tr>\n' +
                        '<td>Y</td>\n' +
                        '<td>Y-Axis motion command</td>\n' +
                        '<td>true\n' +
                        '</tr>\n' +
                        '<tr>\n' +
                        '<td>Z</td>\n' +
                        '<td>Z-Axis motion command</td>\n' +
                        '<td>true\n' +
                        '</tr>\n' +
                        '<tr>\n' +
                        '<td>A</td>\n' +
                        '<td>A-Axis motion command</td>\n' +
                        '<td>true\n' +
                        '</tr>\n' +
                        '<tr>\n' +
                        '<td>B</td>\n' +
                        '<td>B-Axis motion command</td>\n' +
                        '<td>true\n' +
                        '</tr>\n' +
                        '<tr>\n' +
                        '<td>C</td>\n' +
                        '<td>C-Axis motion command</td>\n' +
                        '<td>true\n' +
                        '</tr>\n' +
                        '</html>',
                );
            });

            it('generates the proper partial html for a code', () => {
                const g = new GReference();
                const html = g.getCodeAsHTML('G1', true);
                expect(html).to.equal(
                    '<h1>G1 - Linear Interpolation Motion</h1>\n' +
                        '\n' +
                        '<h2>Description</h2>\n' +
                        '\n' +
                        '<p>G01 is used to move machine axes at specified feedrate.</p>\n' +
                        '\n' +
                        '<h3>Modal: true</h3>\n' +
                        '\n' +
                        '<h2>Parameters</h2>\n' +
                        '\n' +
                        '<table>\n' +
                        '<thead>\n' +
                        '<tr>\n' +
                        '<th>Parameter</th>\n' +
                        '<th>Description</th>\n' +
                        '<th>Optional</th>\n' +
                        '</tr>\n' +
                        '</thead>\n' +
                        '<tbody>\n' +
                        '<tr>\n' +
                        '<td>X</td>\n' +
                        '<td>X-Axis motion command</td>\n' +
                        '<td>true\n' +
                        '</tr>\n' +
                        '<tr>\n' +
                        '<td>Y</td>\n' +
                        '<td>Y-Axis motion command</td>\n' +
                        '<td>true\n' +
                        '</tr>\n' +
                        '<tr>\n' +
                        '<td>Z</td>\n' +
                        '<td>Z-Axis motion command</td>\n' +
                        '<td>true\n' +
                        '</tr>\n' +
                        '<tr>\n' +
                        '<td>A</td>\n' +
                        '<td>A-Axis motion command</td>\n' +
                        '<td>true\n' +
                        '</tr>\n' +
                        '<tr>\n' +
                        '<td>B</td>\n' +
                        '<td>B-Axis motion command</td>\n' +
                        '<td>true\n' +
                        '</tr>\n' +
                        '<tr>\n' +
                        '<td>C</td>\n' +
                        '<td>C-Axis motion command</td>\n' +
                        '<td>true\n' +
                        '</tr>',
                );
            });
        });
    });
});
