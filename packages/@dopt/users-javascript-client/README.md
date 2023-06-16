# Dopt users JavaScript client

## Overview

The Dopt users JavaScript client is a friendly server-side and client-side package for accessing the Dopt users API. This allows you to identify new users and update existing users with Dopt, so that they can interact with the flows created within the app.

The client lives in our open-source monorepo [odopt](https://github.com/dopt/odopt).

It is published to npm as [`@dopt/users-javascript-client`](https://www.npmjs.com/package/@dopt/users-javascript-client).

## Installation

Via npm:

```bash
npm install @dopt/users-javascript-client
```

Via Yarn:

```bash
yarn add @dopt/users-javascript-client
```

Via pnpm:

```bash
pnpm add @dopt/users-javascript-client
```

## Configuration

To configure the Users JavaScript Client you will need

1. A users API key (generated in Dopt)
1. An identifier for the user or group you wish to identify (the same identifier will be used in the React SDK)
1. The properties you wish to store and/or update for the given user or group

## Usage

### Initialization

```ts
import { IdentifyApi, Configuration } from '@dopt/users-javascript-client';

const doptUsersClient = new IdentifyApi(
  new Configuration({
    apiKey: 'USERS_API_KEY',
  })
);
```

### Users

Using the `identify` API.

```ts
const identifyUserRequestBody: IdentifyUserRequestBody = {
  identifier: "identifier_example",
  properties: {
    stringExample: "string",
    numberExample: 12345,
    booleanExample: true,
    nullExample: null,
  },
};

doptUsersClient.identifyUser(identifyUserRequestBody);
```

Using the `identifyBatch` API.

```ts
import { IdentifyBatchRequestBodyInner } from '@dopt/users-javascript-client';

const user1: IdentifyUserRequestBody = {
  identifier: "identifier_example",
  properties: {
    stringExample: "string",
    numberExample: 12345,
    booleanExample: true,
    nullExample: null,
  },
};
const user2: IdentifyUserRequestBody = {
  identifier: "user2_identifier",
  properties: {
    stringExample: "string",
  },
};

const batchPayload: IdentifyBatchRequestBodyInner[] = [
  user1,
  user2,
];


doptUsersClient.identifyBatch(identifyGroupRequestBody);
```

### Groups

Using the `identifyGroup` API.

```ts
import { IdentifyGroupRequestBody } from '@dopt/users-javascript-client';

const identifyGroupRequestBody: IdentifyGroupRequestBody = {
  identifier: "group_identifier_example",
  properties: {
    stringExample: "string",
    numberExample: 12345,
    booleanExample: true,
    nullExample: null,
  },
};

doptUsersClient.identifyGroup(identifyGroupRequestBody);
```
