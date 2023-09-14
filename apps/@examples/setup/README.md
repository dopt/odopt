# @dopt/react setup example

A demo app showcasing how a setup experience built on [`@dopt/react`](https://github.com/dopt/odopt/tree/main/packages/%40dopt/react) works.

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

Create a Dopt flow with four [custom component blocks](https://docs.dopt.com/concepts/blocks/custom/). Note the flow and each block's identifiers.

Update line 35 in [`src/pages/_app.tsx`](./src/pages/_app.tsx#L20) with the flow's identifier and version number.

Update line 7 and 8 in [`src/pages/index.tsx`](./src/pages/index.tsx#L7-L8) with the flow's identifier.

Update line 13 in [`src/components/setup/role.tsx`](./src/components/setup/role.tsx#L13) with the first custom component block's identifier.

Update line 12 in [`src/components/setup/use-case.tsx`](./src/components/setup/use-case.tsx#L12) with the second custom component block's identifier.

Update line 9 in [`src/components/setup/settings.tsx`](./src/components/setup/settings.tsx#L9) with the third custom component block's identifier.

Update line 8 in [`src/components/setup/invite.tsx`](./src/components/setup/invite.tsx#L8) with the fourth custom component block's identifier.

## Starting the app

Run `pnpm dev` to start the demo and navigate to [http://localhost:5633/](http://localhost:5633/). Any code changes you make will immediately be reflected.
