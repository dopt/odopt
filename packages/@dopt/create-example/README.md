# @dopt/create-example

A CLI for scaffolding [Dopt](https://www.dopt.com/) example projects.

## Requirements

[Node.js](https://nodejs.org/) >= v16.0.0

## Usage

Run the following command depending on what package manager you use:

```sh
# npm
npm create @dopt/example

# Yarn
yarn create @dopt/example

# pnpm
pnpm create @dopt/example
```

And then follow the instructions printed in your terminal.

You can specify the path to initialize the example project and the template to use by running:

```sh
# npm
npm create @dopt/example path-to-project --template template-name

# Yarn
yarn create @dopt/example path-to-project --template template-name

# pnpm
pnpm create @dopt/example path-to-project --template template-name
```

Some templates can also take in arguments for enhanced functionality:

```sh
# npm
npm create @dopt/example --template react --templateArgs arg1,arg2

# Yarn
yarn create @dopt/example --template react --templateArgs arg1,arg2

# pnpm
pnpm create @dopt/example --template react --templateArgs arg1,arg2
```

## Templates

See [./templates] for the list of templates.

- [`react`](./templates/react)
