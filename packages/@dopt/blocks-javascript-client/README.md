# Dopt blocks JavaScript client

## Overview

The Dopt blocks JavaScript client is a friendly server-side and client-side package for accessing the Dopt blocks API to get and mutate block and flow state for a particular user in Dopt.

The client lives in our open-source monorepo [odopt](https://github.com/dopt/odopt).

It is published to npm as [`@dopt/blocks-javascript-client`](https://www.npmjs.com/package/@dopt/blocks-javascript-client).

## Installation

Via npm:

```bash
npm install @dopt/blocks-javascript-client
```

Via Yarn:

```bash
yarn add @dopt/blocks-javascript-client
```

Via pnpm:

```bash
pnpm add @dopt/blocks-javascript-client
```

## Configuration

To configure the blocks JavaScript client you will need

1. A blocks API key (generated in Dopt)
1. A block uid

## Usage

### Initialization

```ts
import { Configuration, BlocksApi } from "@dopt/blocks-javascript-client";

const doptBlocksClient = new BlocksApi(
  new Configuration({
    apiKey: "BLOCKS_API_KEY",
  })
);
```

### Blocks

Get block data using the `findBlocks` method:

```ts
const version = 3;
const userId = "example-user-idenitifer";
const uid = "xqC0wpZgoaYXbAPk8W0sk";

doptBlocksClient.findBlocks(
  version,
  userId,
  uid
);
```

Transition a block using the `blockTransitions` method:

```ts
const transitions = new Set(['complete']);
const version = 3;
const userId = "example-user-identifier";
const uid = "xqC0wpZgoaYXbAPk8W0sk";

doptBlocksClient.blockTransitions(
  transitions,
  version,
  userId,
  uid
);
```

### Flows

Get flow data using the `getFlow` method:

```ts
const version = 3;
const userId = "example-user-identifier";
const sid = "example-flow-identifier";

doptBlocksClient.getFlow(
  version,
  userId,
  sid
);
```

Transition a flow using the `flowIntent` method:

```ts
const version = 3;
const userId = "example-user-identifier";
const sid = "example-flow-identifier";
const intent = "finish";

doptBlocksClient.flowIntent(
  version,
  userId,
  sid,
  intent
);
```
