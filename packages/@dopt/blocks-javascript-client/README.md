# Dopt's Blocks Javascript Client

## Getting Started

The Dopt Blocks JavaScript Client is a friendly server-side and client-side package for accessing the Dopt Blocks API. This allows you to identify new blocks and update existing blocks with Dopt, so that they can interact with the flows created within the app.

### Installation

Via Yarn:

```bash
yarn add @dopt/blocks-javascript-client
```

Via pnpm:

```bash
pnpm add @dopt/blocks-javascript-client
```

Via npm:

```bash
npm install @dopt/blocks-javascript-client
```

### Configuration

To configure the Blocks JavaScript Client you will need

1. A blocks API key (generated in Dopt)
1. A user ID for the user you wish to identify (the same ID will be used in the React SDK)
1. The properties you wish to store and/or update for the given user

### Usage

#### Initialization

```typescript
import { Configuration, BlocksApi } from "@dopt/blocks-javascript-client";

const doptBlocksClient = new BlocksApi(
  new Configuration({
    apiKey: "BLOCKS_API_KEY",
  })
);

```

#### Example Usage

Using the `flowIntent` API.

```typescript
const uid = "example-flow-uid";
const version = 2;
const userIdentifier = "example-identified-user-identifier";
const groupIdentifier = "example-identified-group-identifier";
const flowIntent = "complete";
const includeBlock = true;

doptBlocksClient.flowIntent(
  version,
  userIdentifier,
  uid,
  flowIntent,
  groupIdentifier,
  includeBlock
);
```

Using the `blockIntent` API.

```typescript
import { Configuration, BlocksApi } from "@dopt/blocks-javascript-client";

const doptBlocksClient = new BlocksApi(
  new Configuration({
    apiKey: "BLOCKS_API_KEY",
  })
);

const uid = "example-flow-uid";
const version = 2;
const userIdentifier = "example-identified-user-identifier";
const groupIdentifier = "example-identified-group-identifier";
const blockIntent = "complete";
const includeBlock = true;

doptBlocksClient.blockIntent(
  version,
  userIdentifier,
  uid,
  blockIntent,
  groupIdentifier
);
```