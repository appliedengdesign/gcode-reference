# Contribute to G-Code Reference

Thank you for your interest in contributing to this g-code reference package. Here are a couple guidelines to get you started...

## Getting Started

To contribute to [G-Code Reference](https://github.com/appliedengdesign/gcode-reference), you need to fork this repository and submit a pull request for the JSON that you want to add to or change.

* [How to fork a repository](https://help.github.com/articles/fork-a-repo)
* [How to make a pull request](https://help.github.com/articles/creating-a-pull-request/)
* [Changing a commit message](https://help.github.com/articles/changing-a-commit-message/)
* [How to squash commits](https://help.github.com/articles/about-pull-request-merges/)

### Repository Organization

The content in this repository is as follows:

* `/src` - Main Source Files of npm package
  * `/src/json/` - Location of JSON files
    * `/src/json/schema` - Location of schema file. ( [cnccodes-json-schema](https://github.com/appliedengdesign/cnccodes-json-schema) )
    * `/src/json/lathe/` - Lathe JSON Files ( Separated into `gcodes.json` and `mcodes.json` )
    * `/src/json/mill` - Mill JSON Files
    * `/src/json/printer` - 3D Printer JSON Files
  * `/src/test/` - Typescript files for testing package
* `/scripts` - Utility scripts for validation, workflow, etc.

### Branches

Create a local working branch that is specific to the scope of the changes that you want to make and then submit a pull request when your changes are ready. Each branch you create should be as specific as possible to streamline work flow and to reduce the possibility of merge conflicts. For instance, consider create a branch to work on a specifc machine's `gcodes.json` or `mcodes.json`.

### Authoring Tools

[Visual Studio Code](https://code.visualstudio.com) is a preferred tool to work on this project.

### Submitting Changes

* Push your changes to the branch in your fork of the repository.
* Submit a pull request to the [development branch](https://github.com/appliedengdesign/gcode-reference/tree/dev) of the [gcode-reference](https://github.com/appliedengdesign/gcode-reference) respository.
* Make sure to explicitly say not to complete pull request if you are still making changes.

## Additional Resources

* [GitHub Docs](http://help.github.com/)
* [GitHub Pull Request Docs](http://help.github.com/send-pull-requests/)
* [Successful Git Branching Model](http://nvie.com/posts/a-successful-git-branching-model/)
  