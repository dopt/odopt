# Dopt Demo

A demo app to showcase how Dopt works.

## Requirements

- [node.js](https://nodejs.org/) (v16.17.x)
- [pnpm](https://pnpm.io/) (v7.13.x)

Older versions may work, but have not been tested.

## Installation

Clone the repository and run `pnpm install` in the project directory.

## Setup

### Environment variables

There are two enviroment variables that store the Dopt users and blocks API keys.

Create a file at the root of the project called `.env.local` with the following content:

```
VITE_DOPT_USERS_API_KEY=$YOUR_USERS_API_KEY_HERE
VITE_DOPT_BLOCKS_API_KEY=$YOUR_BLOCKS_API_KEY_HERE
```

Replace the values prefixed with `$` with your API keys.

You can set up different variables for different environments as you see fit ([learn more](https://vitejs.dev/guide/env-and-mode.html)).

### Block IDs

## Starting the demo

Run `pnpm dev` to start the demo and navigate to [http://localhost:5173/](http://localhost:5173/). Any code changes you make will immediately be reflected.
