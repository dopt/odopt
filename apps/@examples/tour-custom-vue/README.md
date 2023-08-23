# Custom @dopt/javascript tour example with Vue

A demo app showcasing how a custom tour built on top of `@dopt/javascript`'s [`Tour`](https://github.com/dopt/odopt/blob/main/packages/%40dopt/javascript/src/tour.ts) works.

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

Create a Dopt flow with a [tour block](https://docs.dopt.com/concepts/blocks/tour/). Note the flow and tour block's identifiers.

Update line 32 in [`src/pages/App.vue`](./src/pages/App.vuetsx#L32) with the flow's identifier and version number.

Update lines 11-60 in [`src/pages/HomePage.vue`](./src/pages/index.tsx#L11-L60) with the identifiers of the tour block items.

## Starting the app

Run `pnpm dev` to start the demo and navigate to [http://localhost:5633/](http://localhost:5633/). Any code changes you make will immediately be reflected.
