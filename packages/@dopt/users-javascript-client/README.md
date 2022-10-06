# Dopt Users JavaScript Client

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

```javascript
import DoptUsersApi from '@dopt/users-javascript-client';

let defaultClient = DoptUsersApi.ApiClient.instance;
// Configure API key authorization: ApiKeyAuth
let ApiKeyAuth = defaultClient.authentications['ApiKeyAuth'];
ApiKeyAuth.apiKey = 'USERS_API_KEY';

let doptUsersClient = new DoptUsersApi.IdentifyApi();
```

#### Example Usage

Using the `identify` API.

```javascript
let identifier = 'identifier_example'; // String
let opts = {
  'requestBody': {key: 'value'} // {String: String | Number | Boolean | Null}
};
doptUsersClient.identify(identifier, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

Using the `identifyBulk` API.

```javascript
let identifyBulkUser_1 = {
  '__dopt_identifier': 'identifier_example_1',
  key: 'value',
};
let identifyBulkUser_2 = {
  '__dopt_identifier': 'identifier_example_2',
  key: 'value',
}
let opts = {
  'identifyBulkRequestBodyInner': [identifyBulkUser_1, identifyBulkUser_2] // [IdentifyBulkRequestBodyInner]
};
doptUsersClient.identifyBulk(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```
