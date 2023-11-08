# Custom @dopt/vue card example

A demo app showcasing how to build a custom card on top of `@dopt/vue`'s [`useCard`](https://github.com/dopt/odopt/blob/main/packages/%40dopt/vue/src/card.ts).

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

Create a Dopt flow with a [card block](https://docs.dopt.com/concepts/blocks/card/). Note the flow and card block's identifiers.

Update line 9 in [`src/main.ts`](./src/main.ts#L9) with the flow's identifier and version number.

Update line 10 in [`src/pages/HomePage.vue`](./src/pages/HomePage.vue#L10) with the identifier of the card block.

## Starting the app

Run `pnpm dev` to start the demo and navigate to [http://localhost:5633/](http://localhost:5633/). Any code changes you make will immediately be reflected.
