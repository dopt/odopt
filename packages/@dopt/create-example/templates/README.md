# @dopt/create-example templates

This folder contains the templates supported by [`@dopt/create-example`](../).

## Template structure

```
template-name/
├── _package.json
└── README.md
```

Template folders should use kebab-case. This will be the name of the template that can be passed into `@dopt/create-example` via `--template`.

Each template should be a JavaScript/TypeScript-based project with a `_package.json` and `README.md` file.

The `_package.json` file should be a valid [`package.json`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json) file. It will be renamed to `package.json` when the template is initialized.

The `name` field in `package.json` should follow a convention of `dopt-example-{template-name}`. For example, if the template was named `react`, the `name` would be `dopt-example-react`.

## Initialization script

Optionally, an `init.js` file can be placed in at the root of the template which will be executed after the project's dependencies have been installed. Initialization scripts should clean themselves up after execution.

Arguments can be passed to `init.js` via `@dopt/create-example` by using `--templateArgs`. For example:

```sh
npm create @dopt/example --template react --templateArgs arg1,arg2
```

The above would pass `arg1` and `arg2` as arguments to [`templates/react/init.js`](./templates/react/init.js).
