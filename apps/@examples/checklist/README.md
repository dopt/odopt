# @dopt/react-checklist example

A demo app showcasing how [`@dopt/react-checklist`](https://github.com/dopt/odopt/tree/main/components/%40dopt/react/checklist) works.

## Requirements

- [node.js](https://nodejs.org/) (v18.16.x)
- [pnpm](https://pnpm.io/) (v7.17.x)

Older versions may work, but have not been tested.

## Installation

Clone the repository and run `pnpm install` in the project directory.

## Setup

### API keys

There are two enviroment variables that store the Dopt users and blocks [API keys](https://docs.dopt.com/setup/api-keys/).

Create a file at the root of the project called `.env.local` with the following content:

```
VITE_DOPT_USERS_API_KEY=$YOUR_USERS_API_KEY_HERE
VITE_DOPT_BLOCKS_API_KEY=$YOUR_BLOCKS_API_KEY_HERE
```

Replace the values prefixed with `$` with your API keys.

### Dopt flow

Create a Dopt flow with a [checklist block](https://docs.dopt.com/concepts/blocks/checklist/). Add two additional items to the checklist block. Note the flow and checklist block's identifiers.

Update line 20 in [`src/pages/_app.tsx`](./src/pages/_app.tsx#L20) with the flow's identifier and version number.

Update line 10 in [`src/pages/index.tsx`](./src/pages/index.tsx#L10) with the checklist block's identifier.

Update line 14 in [`src/pages/index.tsx`](./src/pages/index.tsx#L14) with the identifier of the second item in the checklist block.

Update line 19 in [`src/pages/index.tsx`](./src/pages/index.tsx#L19) with the identifier of the third item in the checklist block.

## Starting the app

Run `pnpm dev` to start the demo and navigate to [http://localhost:5633/](http://localhost:5633/). Any code changes you make will immediately be reflected.
