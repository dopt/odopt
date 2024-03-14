# @dopt/ai-assistant-react example

A demo app showcasing how [`@dopt/ai-assistant-react`](https://github.com/dopt/odopt/tree/main/packages/%40dopt/ai-assistant/react) can help users fix errors.

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
VITE_AI_EXTERNAL_API_KEY=$YOUR_AI_API_KEY_HERE
```

Replace the values prefixed with `$` with your API keys.

### Dopt assistant

Create a Dopt assistant and note the assistant's identifier.

Update line 19 and 33 in [`src/components/error/index.tsx`](./src/components/error/index.tsx) with the assistant's identifier.

## Starting the app

Run `pnpm dev` to start the demo and navigate to [http://localhost:5633/](http://localhost:5633/). Any code changes you make will immediately be reflected.
