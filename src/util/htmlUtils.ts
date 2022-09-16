/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Applied Eng & Design All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 * -------------------------------------------------------------------------------------------- */
'use strict';

import { CNCCodes, Code } from '../types';

export class HTMLUtils {
    static codeToHTML(title: string, code: Code, partial: boolean = true): string {
        const html: Array<string> = [];
        if (!partial) {
            html.push('<!DOCTYPE html>\n<html lang="en"');
            html.push('<head>\n<meta charset="utf-8">\n</head>');
        }

        html.push(`<h1>${title.toUpperCase()} - ${code.shortDesc}</h1>\n`);

        if (code.desc) {
            html.push('<h2>Description</h2>\n');
            html.push(`<p>${code.desc}</p>\n`);
        }

        if (code.modal) {
            html.push(`<h3>Modal: ${code.modal ? 'true' : 'false'}</h3>\n`);
        }

        if (code.parameters) {
            html.push('<h2>Parameters</h2>\n');
            html.push(
                '<table>',
                '<thead>',
                '<tr>\n<th>Parameter</th>\n<th>Description</th>\n<th>Optional</th>\n</tr>',
                '</thead>',
            );
            html.push('<tbody>');

            for (const p in code.parameters) {
                html.push(
                    '<tr>',
                    `<td>${p}</td>`,
                    `<td>${code.parameters[p].shortDesc}</td>`,
                    `<td>${code.parameters[p].optional ? 'true' : 'false'}`,
                    '</tr>',
                );
            }
        }

        if (!partial) {
            html.push('</html>');
        }
        return html.join('\n');
    }

    static allCodesToHTML(codes: CNCCodes, partial: boolean = true): string {
        const html: Array<string> = [];
        if (!partial) {
            html.push('<!DOCTYPE html>\n<html lang="en"');
            html.push('<head>\n<meta charset="utf-8">\n</head>');
        }

        html.push(`<h1>${codes.title}</h1>`);
        html.push(`<p>${codes.description}</p>`);
        html.push('<hr />');

        for (const c in codes.codes) {
            html.push(HTMLUtils.codeToHTML(c, codes.codes[c]));
            html.push('<hr />');
        }

        if (!partial) {
            html.push('</html>');
        }
        return html.join('\n');
    }
}
