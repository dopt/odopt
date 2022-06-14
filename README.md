# odopt: Open Dopt

This is a polyglot monorepo that houses Dopt's open source code.

## Structure

We utilize [yarn workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/) to set up our package architecture. The root [package.json](https://github.com/dopt/dopt/blob/main/package.json) defines our workspaces.

```json5
{
  "name": "odopt",
  "workspaces": {
    "packages": [
      "packages/**/*"
    ]
}
```

The package manager ([yarn](https://yarnpkg.com/)) and our build tool ([turbo](https://turborepo.org/docs)) will scan those directories and look for children `package.json`. Their content is used to define our package topology.

We have one primary workspace in our monorepo, namely [./packages](./README.md#packages).

```
.
└── packages      (packages open source packages)
    ├── react-sdk   (our design system)
    └── ...         (etc)
```

#### Pacakges

- [packages/react-sdk](./packages/@dopt/react-sdk): our React SDK. [README](./packages/@dopt/react-sdk/README.md)

## Contributing

#### General Prerequisites

1. Install make
1. [Install nvm](https://github.com/nvm-sh/nvm)
1. [Install husky](https://typicode.github.io/husky/#/)
   https://typicode.github.io/husky/#/
   - `npx husky install`
1. [Install yarn](https://classic.yarnpkg.com/lang/en/docs/install)

#### General Setup

```bash
git clone git@github.com:dopt/odopt.git;
cd odopt;
```

#### Development

Configure your shell to use the correct node version.

```bash
  nvm use
```

Install all the dependencies of the monorepo

```bash
  make install
```

Build all packages

```bash
  make build
```

If for any reason you need to start fresh you can run the following

```bash
  make clean # remove any build artifacts (e.g. dist/ directories)
  make uninstall # remove all node_modules directories
```
