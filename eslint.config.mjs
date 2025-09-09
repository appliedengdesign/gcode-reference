/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Applied Eng & Design All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 * -------------------------------------------------------------------------------------------- */

import { defineConfig, globalIgnores } from 'eslint/config';
import _import from 'eslint-plugin-import';
import globals from 'globals';
import js from '@eslint/js';
import json from '@eslint/json';
import prettier from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';


export default defineConfig([
    
    js.configs.recommended,
    _import.flatConfigs.recommended,
    _import.flatConfigs.typescript,

    globalIgnores([
        'eslint.config.mjs',
        'out/*',
        'dist/*',
    ]),

    tseslint.configs.recommendedTypeChecked,
    {
        files: [
            'src/**/*.ts',
            'scripts/*.ts',
            'test/*.ts',
        ],

        languageOptions: {
            sourceType: 'module',
            parser: tseslint.parser,
            parserOptions: {
                ecmaVersion: 2024,
                ecmaFeatures: {
                    impliedStrict: true
                },
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
            globals: {
                ...globals.node,
                ...globals.mocha,
            }
        },

        rules: {
            '@typescript-eslint/naming-convention': [
				'warn',
				{
					'selector': 'class',
					'format': [
						'PascalCase'
					],
					'leadingUnderscore': 'allow'
				}
			],
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/no-unused-expressions': [
                'error', 
                {
                    'allowShortCircuit': true,
                    'allowTernary': true, 
                }
            ],
            'curly': ['error', 'all'],
            'eqeqeq': 'error',
            'max-len': ['error', {
                'code': 120, // needs to be in sync w/ .prettierrc printWidth
                'ignoreUrls': true,
            }],
            'no-duplicate-imports': 'error',
            'no-var': 'warn',
            'prefer-const': 'error',
            'quotes': ['error', 'ingle', {
                'allowTemplateLiterals': true,
                'avoidEscape': true,
            }],
            'sort-imports': ['error', {
                'ignoreCase': true,
            }],
            'yoda': 'error',
        },
    },

    {
        // Turn off rules that will cause errors with chai
        files: [
            'test/*.ts',
        ],

        rules: {
           'no-unused-expressions': 'off',
           '@typescript-eslint/no-unused-expressions': 'off',
        }
    },

    // Lint JSON
    {
        files: ['/**/*.json'],
        ignores: ['package-lock.json'],
        plugins: { json },
        language: 'json/json',
        ...json.configs.recommended,
        extends: [ tseslint.configs.disableTypeChecked],   
    },

    prettier,

]);
