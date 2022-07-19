# Contribute to G-Code Reference

Thank you for your interest in contributing to this g-code reference package. Please note the [Code of Conduct](CODE_OF_CONDUCT.md) document and follow it in all of your interactions with this project.

There are a variety of ways you can contribute to this project.

* Edit descriptions of the G or M codes in the machine type JSON files
* Add new codes that have not yet been added to the machine tools
* Fix Typos! (I tend to make a lot of them)
* Add additional functionality to the main application (Advanced)
* Edit documentation

Here are a couple guidelines to get you started...

## Getting Started

To contribute to [G-Code Reference](https://github.com/appliedengdesign/gcode-reference), you need to fork this repository and submit a pull request for the JSON that you want to add to or change.

* [How to fork a repository](https://help.github.com/articles/fork-a-repo)
* [How to make a pull request](https://help.github.com/articles/creating-a-pull-request/)
* [Changing a commit message](https://help.github.com/articles/changing-a-commit-message/)
* [How to squash commits](https://help.github.com/articles/about-pull-request-merges/)

### Branches

Create a local working branch that is specific to the scope of the changes that you want to make and then submit a pull request when your changes are ready. Each branch you create should be as specific as possible to streamline work flow and to reduce the possibility of merge conflicts. For instance, consider create a branch to work on a specifc machine's `g.cncc.json` or `m.cncc.json`. You can also work on a machine-specific variant inside the variants folder.

### Repository Organization

The content in this repository is as follows:

* `/src` - Main Source Files of npm package
  * `/src/json/` - Location of JSON files
    * `/src/json/edm` - EDM JSON Files
    * `/src/json/laser` - Laser JSON Files
    * `/src/json/lathe/` - Lathe JSON Files
    * `/src/json/mill` - Mill JSON Files
    * `/src/json/printer` - 3D Printer JSON Files
    * `/src/json/[type]/variants/` - Variant files
  * `/src/test/` - Typescript files for testing package
* `/scripts` - Utility scripts for workflow, etc.

### JSON File Naming Scheme

In order to keep a consistent file naming scheme we have designated the following for the JSON files containing the G/M codes:

* G Code Files: `g.cncc.json`
* M Code Files: `m.cncc.json`

Starting in Version 0.0.4, the reference supports variants of the codes to allow for machine-tool specific codes. These variants should be placed inside of the variants folder within the type-specific (i.e laser, lathe mill) folder.

The naming scheme for the variant files shall include the variant-specific name as follows:

* G Code files `g.[variant].cncc.json`
* M Code files `m.[variant].cncc.json`

## Adding or Modifying G/M Code Files

The general framework has been created for all six of the main Machine Types.

The JSON files strictly follow the [CNC Codes JSON Schema](https://appliedengdesign.github.io/cnccodes-json-schema) format and all validation is done against that project. It would benefit you to take a glance over there to see how the format is designed and which keys and objects are required to validate.

### Example G Code Entry

```json
"G04": {
  "category": "other",
    "shortDesc": "Dwell",
      "desc": "G04 specifies a delay or dwell in the program. The block with G04 delays for the time specified by the P address code.",
      "modal": false,
      "parameters": {
        "P": {
          "shortDesc": "The dwell time in seconds or milliseconds",
            "optional": false
        }
    }
}
```

*For the most part, only `category` and `shortDesc` are required and if you add parameters, at leat one is required.*

### Adding a new variant

You can also add a new variant to the reference, but it needs to be done two-fold. First, add your G (`g.[variant].cncc.json`) or M (`m.[variant].cncc.json`) file into the `variants` folder of the Machine Type (`edm`, `laser`, `lathe`, `mill`, `printer`, or `swiss`) folder under `./src/json`. Make sure your file adheres to the [CNC Codes JSON Schema](https://appliedengdesign.github.io/cnccodes-json-schema) and has the additional property of `variant`. The variant name must be at least 3 characters long and no more than 8 characters, using only uppercase or lowercase alphabet and numbers.

Once, you've added your variant JSON file, you need to edit the `./src/types/variants.ts` file and add your new variant to the `Variants` enum. The name of it should be the camelCase, *spelled-out* version of your variant.

### Formatting

This project contains an [`.editorconfig`](https://github.com/appliedengdesign/gcode-reference/blob/main/.editorconfig) file. If your IDE or code editor doesn't natively support it, please install the [EditorConfig](https://editorconfig.org) plugin.

This project uses [prettier](https://prettier.io/) for code formatting. You can run prettier across the code by calling `npm run pretty` from a terminal.

To format the code as you make changes you can install the [Prettier - Code formatter](https://marketplace.visualstudio.com/items/esbenp.prettier-vscode) extension.

Add the following to your User Settings to run prettier:

`"editor.formatOnSave": true,`

### Linting

This project uses [ESLint](https://eslint.org/) for code linting. You can run ESLint across the code by calling `yarn run lint` from a terminal. Warnings from ESLint show up in the `Errors and Warnings` quick box and you can navigate to them from inside VS Code.

To lint the code as you make changes you can install the [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extension.

### Testing & Debugging

Depending on how you have contributed to the project, you can run tests in a variety of ways. By default, all tests are run before building the application, but you can call specific tests as follows:

#### Validate JSON

* `npm run test-validate-json` will validate all of the JSON files
  * To Validate specific machine type JSON add the environment variable `TEST=[type]` to the test line (i.e. `TEST=lathe npm run test-validate-json`)
  * To Validate specific G or M code for the machine type use the format `TEST=[type]:[gcode|mcode]` (i.e. `TEST=mill:mcode npm run test-validate-json`)
  * You can also add the environment variable `VARIANTS=no` to skip testing of any varient JSON files.

#### Application Testing

* To test the `GReference` class, use `npm run test-gref`

#### Test Everything

* To test everything in one, use `npm run test-all`

### Helper Scripts

There a couple helper scripts that help when working with the code.

`./scripts/copyJSON.ts`

* Used by the `prepack` script to copy relavant JSON files into the `./dist/` folder

`./scripts/getCodes.ts`

* Can be used with `npm run getCodes [type]:[gcode:mcode]:[variant]` to retrieve the codes object through the application (i.e. `npm run getCodes mill:mcode:mazak`)

### Authoring Tools

[Visual Studio Code](https://code.visualstudio.com) is a preferred tool to work on this project.

### Submitting a Pull Request

Please follow all instructions in the [PR template](.github/PULL_REQUEST_TEMPLATE.md).

* Push your changes to your branch in your fork of the repository.
* Submit a pull request to the [main](https://github.com/appliedengdesign/gcode-reference/tree/main) of the [gcode-reference](https://github.com/appliedengdesign/gcode-reference) respository.
* Make sure to explicitly say not to complete pull request if you are still making changes.

## Additional Resources

* [GitHub Docs](http://help.github.com/)
* [GitHub Pull Request Docs](http://help.github.com/send-pull-requests/)
* [Successful Git Branching Model](http://nvie.com/posts/a-successful-git-branching-model/)
  