/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Applied Eng & Design All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 * -------------------------------------------------------------------------------------------- */

import { defineConfig, globalIgnores } from 'eslint/config';
import importX from 'eslint-plugin-import-x';
import globals from 'globals';
import js from '@eslint/js';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import prettier from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';


export default defineConfig([

    globalIgnores([
        'out/*',
        'dist/*',
        'eslint.config.mjs',
    ]),

    {
        files: [
            'src/**/*.ts',
            'scripts/*.ts',
            'test/*.ts',
        ],
        ...js.configs.recommended,
        ...tseslint.configs.recommendedTypeChecked[0],

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

        plugins:{
            'import-x': importX, 
            '@typescript-eslint': tseslint.plugin
        },

        extends: [ 'import-x/flat/recommended', 'import-x/flat/typescript'],

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
            'import-x/no-dynamic-require': 'error',
            'import-x/no-default-export': 'error',
            'import-x/no-self-import': 'error',
            'max-len': ['error', {
                'code': 120, // needs to be in sync w/ .prettierrc printWidth
                'ignoreUrls': true,
            }],
            'no-duplicate-imports': 'error',
            'no-var': 'warn',
            'prefer-const': 'error',
            'quotes': ['error', 'single', {
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
        files: ['**/*.json'],
        ignores: ['package-lock.json'],
        plugins: { json },
        language: 'json/json',
        ...json.configs.recommended,
        //extends: [ tseslint.configs.disableTypeChecked],   
    },

    // Lint JSONC
    {
        files: ['**/*.jsonc', '.vscode/*.json'],
        plugins: { json },
        language: 'json/jsonc',
        ...json.configs.recommended,
    },

    // Lint Markdown
    {
        files: ['**/*.md'],
        plugins: { markdown },
        language: 'markdown/commonmark',
        extends: [ 'markdown/recommended' ],
    },

    //prettier,

]);
