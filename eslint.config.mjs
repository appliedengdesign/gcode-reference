/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Applied Eng & Design All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 * -------------------------------------------------------------------------------------------- */

import eslint from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";
import _import from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier/recommended";
import globals from "globals";


export default defineConfig([
    globalIgnores([
        'eslint.config.mjs',
        'out/*',
        'dist/*',
    ]),

    eslint.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    _import.flatConfigs.recommended,
    _import.flatConfigs.typescript,
    
    {
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
    },
    {
        files: [
            'src/**/*.ts',
            'scripts/*.ts',
            'test/*.ts',
        ],

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


        /* rules: {
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "@typescript-eslint/indent": "off",

            "@typescript-eslint/no-empty-function": ["warn", {
                allow: ["constructors"],
            }],

            "@typescript-eslint/no-empty-interface": "error",
            "@typescript-eslint/no-explicit-any": "off",

            "@typescript-eslint/no-inferrable-types": ["warn", {
                ignoreParameters: true,
                ignoreProperties: true,
            }],

            "@typescript-eslint/no-namespace": "off",
            "@typescript-eslint/no-non-null-assertion": "off",

            "@typescript-eslint/no-unused-vars": ["warn", {
                args: "after-used",
                argsIgnorePattern: "^_",
                ignoreRestSiblings: true,
                varsIgnorePattern: "^_$",
            }],

            "@typescript-eslint/no-use-before-define": "error",
            "@typescript-eslint/semi": "error",
            "@typescript-eslint/unbound-method": "off",
            "arrow-parens": ["error", "as-needed"],

            "brace-style": ["warn", "1tbs", {
                allowSingleLine: true,
            }],

            "comma-dangle": ["error", "only-multiline"],
            complexity: "off",
            "dot-notation": "error",
            eqeqeq: ["error", "smart"],
            "eol-last": "error",
            "import/no-dynamic-require": "error",
            "import/no-default-export": "error",
            "import/no-duplicates": "error",
            "import/no-self-import": "error",

            "import/no-unresolved": ["warn", {
                ignore: ["vscode"],
            }],

            "max-classes-per-file": ["error", 1],

            "no-bitwise": "error",
            "no-console": "off",
            
            "no-inner-declarations": "off",
            "no-invalid-this": "error",
            "no-trailing-spaces": "error",
            "no-var": "error",
            "prefer-arrow-callback": "error",
            "prefer-const": "error",
            "prefer-numeric-literals": "error",
            "prefer-object-spread": "error",
            "prefer-rest-params": "error",
            "prefer-spread": "error",
            "prefer-template": "error",
            "prettier/prettier": "error",
            semi: ["error", "always"],
            "semi-style": ["error", "last"],
            "spaced-comment": ["error", "always"],
            "space-in-parens": ["error", "never"],

            'sort-imports': ['error', {
                ignoreCase: true,
                ignoreMemberSort: false,
            }],

        } */
    },

    prettier,

]);
