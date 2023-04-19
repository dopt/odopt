## Please

A CLI for developing in monorepos - not building them

### Why

Because developing in monorepos can be challenging. There are great tools for building them (e.g. [turbo](https://turborepo.org/), [bazel](https://bazel.build/), [rush](https://rushjs.io/), [gradle](https://gradle.org/), etc) but the experience of developing in them often involves lots of manual effort.

By developing, I mean, running/executing code. For example, consider our own experience at Dopt. A typical workflow for basic feature development in our application involved running commands across 10+ packages to start various services and their databases.

Depending on what you were focused on, certain packages would need to be started in different ways, e.g., w/ file-watchers versus without.

In practice, this meant lots of windows and lots of commands. A situation that made it easy to miss an error stack or an important log.

### Introducing `please`

A concise CLI for running package scripts across packages with interleaved output. The above scenario was transofmred into the following

```
please start:service-x,service-y,service-z dev:{app-*} up:{database-*}
```

### Install

```bash
# w/ pnpm
pnpm add -Dw please

# w/ yarn
yarn add -D please

# w/ npm
npm install -D please
```

### Usage

Basic:

```
  $ please dev:@scope/package-1 run:@scope/package-2

  $ please dev:@scope/package-1 run:@scope/package-2,@scope/package-3

  $ please dev:@scope/package-1,@scope/package-2 run:@scope/package-3,@scope/package-4
```

Advanced:

```
  $ please dev:{@scope/*}

  $ please dev:{@scope/*} run:package-1,package-2
```
