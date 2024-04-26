# React hooks for Dopt's Users API

## Overview

The Dopt Users API hooks are React-specific utility for identifying users and groups to Dopt.

If you aren't using React and / or want a lower-level interface for identifying users and groups, check out [@dopt/users-javascript-client](https://github.com/dopt/blocks-javascript-client).

This package published to npm as [`@dopt/react-users`](https://www.npmjs.com/package/@dopt/react-users).

## Installation

Via npm:

```bash
npm install @dopt/react-users
```

Via Yarn:

```bash
yarn add @dopt/react-users
```

Via pnpm:

```bash
pnpm add @dopt/react-users
```

## Configuration

To configure the Dopt Users provider you will need:

1. A users API key (generated in Dopt)

## Usage

### Initialization

You can initialize Dopt in your app by integrating the `<DoptProvider />` as follows:

```js
import { DoptUsersProvider } from '@dopt/react-users';
import Application from './application';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <DoptUsersProvider apiKey={usersApiKey}>
    <Application />
  </DoptProvider>,
  rootElement
);
```

### Example usage

#### Identifying a user

Helpful when initializing the DoptProvider from [`@dopt/react`](https://www.npmjs.com/package/@dopt/react).

```tsx
import { useMemo } from 'react';
import { DoptProvider } from '@dopt/react';
import { useIdentifyUser } from '@dopt/react-users';

export function Application() {
  /**
   * You will probably retrieve your user in a different manner.
   * This is just a randomly generated user singleton for
   * example purposes.
   */
  const user = useMemo(() => ({
    identifier: Math.random().toString(),
    properties: {
      role: 'test-user',
      inTrial: true,
    },
  }), []);

  /**
   * Before the API request for identifying the user
   * has finished, `useIdentifyUser` will return undefined.
   * With an undefined `userId`, the DoptProvider will not
   * fetch flow and block state.
   *
   * After the call has finished, `useIdentifyUser` will return
   * the user's identifier and will trigger the DoptProvider
   * to fetch and update flow and block state.
   */
  const userId = useIdentifyUser(user);

  return (
    <DoptProvider
      userId={userId}
      apiKey={blocksAPIKey}
      flows={{
        'new-user-onboarding': 2,
        'plan-upsell': 4,
      }}
    >
      <Application />
    </DoptProvider>,
  );
}
```

#### Identifying a group

Helpful when initializing the DoptProvider from [`@dopt/react`](https://www.npmjs.com/package/@dopt/react) with a groupId.

```tsx
import { useIdentifyGroup } from '@dopt/react-users';

export function Application() {
  /**
   * You will probably retrieve your user and group
   * in a different manner. These are just randomly generated
   * user and group singletons for example purposes.
   */
  const user = useMemo(() => ({
    identifier: Math.random().toString(),
    properties: {
      role: 'test-user',
      inTrial: true,
    },
  }), []);

  const group = useMemo(() => ({
    identifier: Math.random().toString(),
    properties: {
      company: 'Dopt',
      paid: false,
    },
  }), []);

  const userId = useIdentifyUser(user);
  const groupId = useIdentifyGroup(group);

  return (
    <DoptProvider
      userId={userId}
      groupId={groupId}
      apiKey={blocksAPIKey}
      flows={{
        'new-user-onboarding': 2,
        'plan-upsell': 4,
      }}
    >
      <Application />
    </DoptProvider>,
  );
}
```

## Feedback

Looking to provide feedback or report a bug? [Open an issue](https://github.com/dopt/odopt/issues/new?title=[@dopt/react-users]%20) or contact us at [support@dopt.com](mailto:support@dopt.com).

## Contributing

All contributions are welcome! Feel free to open a [pull request](https://github.com/dopt/odopt/compare).
