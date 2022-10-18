# Dopt's Users Javascript Client

## Getting Started

The Dopt Users JavaScript Client is a friendly server-side and client-side package for accessing the Dopt Users API. This allows you to identify new users and update existing users with Dopt, so that they can interact with the flows created within the app.

### Installation

Via Yarn:

```bash
yarn add @dopt/users-javascript-client
```

Via pnpm:

```bash
pnpm add @dopt/users-javascript-client
```

Via npm:

```bash
npm install @dopt/users-javascript-client
```

### Configuration

To configure the Users JavaScript Client you will need

1. A users API key (generated in Dopt)
1. A user ID for the user you wish to identify (the same ID will be used in the React SDK)
1. The properties you wish to store and/or update for the given user

### Usage

#### Initialization

```typescript
import { IdentifyApi, Configuration } from '@dopt/users-javascript-client';

const doptUsersClient = new IdentifyApi(
  new Configuration({
    apiKey: 'USERS_API_KEY',
  })
);
```

#### Example Usage

Using the `identify` API.

```typescript
const identifier = 'identifier_example';
const properties = {
  stringExample: 'string',
  numberExample: 12345,
  booleanExample: true,
  nullExample: null,
}

doptUsersClient.identify(identifier, properties)
```

Using the `identifyBulk` API.

```typescript
import { IdentifyBulkRequestBodyInner } from '@dopt/users-javascript-client';

const identifyBulkRequestBody: IdentifyBulkRequestBodyInner[] = []
const identifyBulkUser_1 = {
  '__dopt_identifier': 'identifier_example_1',
  key: 'value',
}
identifyBulkRequestBody.push(identifyBulkUser_1)
const identifyBulkUser_2 = {
  '__dopt_identifier': 'identifier_example_2',
  key: 'value',
}
identifyBulkRequestBody.push(identifyBulkUser_2)

doptUsersClient.identifyBulk([])
```
