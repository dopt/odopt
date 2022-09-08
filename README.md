# odopt: Open Dopt

Welcome to Odopt! A monorepo of Dopt's open source packages.

## Disclaimer

The [pull requests](https://github.com/dopt/odopt/pulls?q=is%3Apr+is%3Aclosed) and [commit history](https://github.com/dopt/odopt/commits/main) for this repository may look a bit odd. The reason is that we are syncing commits to open source packages in our primary/closed-source repository to this repository. While slightly complex to get setup, we love that this approach allows us to easily open source packages we think folks would benefit from while still enjoying the benefits of development in a monorepo. Additionally, we are going to generate quite a few SDKs for working with our APIs - all of which will be open source.

## Structure

We use [pnpm](https://pnpmpkg.com/) at Dopt. We switched from yarn to pnpm a year into developing because of how many times we'd been bit by phantom depdencies. We ❤️ the strictness and can't complain about the speed gains.

We utilize [pnpm workspaces](https://pnpm.io/workspaces). The [pnpm-workspace.yaml](https://github.com/dopt/odopt/blob/main/pnpm-workspace.yaml) defines the root of our workspace and allows us to define/constrain where packages can live in the monorepo. For odopt it looks something like this

```yaml
packages:
  - "packages/**/*"
```

Our package manager ([pnpm](https://pnpmpkg.com/)) and our build tool ([turbo](https://turborepo.org/docs)) will scan those directories and look for children `package.json` files. Their dependencies are used to define our workspace's topology.

While our private repository is app-centric in structure e.g.

```
├── apps          (apps that live on dopt.com)
├── services      (services used by app(s))
└── packages      (packages shared by apps)
```

this repository will be more package-centric i.e.

```
└── packages      (packages open sourced from dopt)
```

Any children directories of the packages directory correspond to package scopes

```
└── packages
    └── @dopt
```

and their children correspond to packages themselves

```
└── packages
    ├── @dopt
    ├─────── react-sdk
    ├─────── esbuild-plugins
    ├─────── please
    └─────── ...
```

#### Pacakges

- [@dopt/react-sdk](./packages/@dopt/react-sdk): our React SDK for accessing/manipulating user flow state. [README](./packages/@dopt/react-sdk/README.md)
- [@dopt/please](./packages/@dopt/please): a CLI for developing in monorepos - not building them. [README](./packages/@dopt/please/README.md)
- [@dopt/esbuild-plugins](./packages/@dopt/esbuild-plugins): esbuild plugins we've built in the process of developing dopt. [README](./packages/@dopt/esbuild-plugins/README.md)

## Contributing

#### General Prerequisites

1. Install make
1. [Install fnm](https://github.com/Schniz/fnm)
1. [Install husky](https://typicode.github.io/husky/#/)
   https://typicode.github.io/husky/#/
   - `pnpm --filter @dopt/cli exec husky install`
1. [Install pnpm](https://pnpm.io/installation)

#### General Setup

```bash
git clone git@github.com:dopt/odopt.git;
cd odopt;
```

#### Development

Node version management

```bash
#first time
$ fnm use `cat .nvmrc`

#subsequently
$ fnm use
```

Install all the dependencies of the monorepo

```bash
# install all dependencies in monorepo
$ pnpm i;

# build monorepo
$ make build;
```

If for any reason you need to start fresh you can run the following

```bash
  make clean # remove any build artifacts (e.g. dist/ directories)
  make uninstall # remove all node_modules directories
```
