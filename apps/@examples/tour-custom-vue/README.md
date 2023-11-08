# Custom @dopt/vue tour example

A demo app showcasing how to build a custom tour on top of `@dopt/vue`'s [`useTourItem and useTour`](https://github.com/dopt/odopt/blob/main/packages/%40dopt/vue/src/tour.ts).

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

Update line 9 in [`src/main.ts`](./src/main.ts#L9) with the flow's identifier and version number.

Update lines 7-30 in [`src/pages/HomePage.vue`](./src/pages/HomePage.vue#L7-L30) with the identifiers of the tour block items.

## Starting the app

Run `pnpm dev` to start the demo and navigate to [http://localhost:5633/](http://localhost:5633/). Any code changes you make will immediately be reflected.
