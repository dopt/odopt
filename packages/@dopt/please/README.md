## Please

A CLI for developing in monorepos - not building them

### Why

Because developing in monorepos can be challenging. There are great tools for building them (e.g. [turbo](https://turborepo.org/), [rush](https://rushjs.io/), [gradle](https://gradle.org/), etc) but the experience of developing in them often involves lots of manual effort. A typical workflow for basic feature development in our application looked something like this:

I need to spin up Service X and Service Y (no need for file-watchers, i'm not developing in these rn)
I need to bring the up the app server and client (w/ file-watchers - I want them to recompile/reload on change)

This involved the following

1. Create a new tmux window, cd to Service X, run `pnpm run start`
1. Create a new tmux window, cd to Service Y, run `pnpm run start`
1. Create a new tmux window, cd to App Server, run `pnpm run dev`
1. Create a new tmux window, cd to App Client, run `pnpm run dev`

I now have four terminals. I've not even started coding yet. I haven't opened the app in the browser. I need matrix-level monitors to observce the output of these commands while developing. What gives?!

Introducing `please`. A concise CLI for running arbitrary package scripts on arbitrary packages with interleaved output. The above debacle is transofmred into the following command

```
please start:service-x,service-y dev:app-server,app-client
```

The end.

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
