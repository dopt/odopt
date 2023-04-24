# Dopt JavaScript SDK

## Overview

The Dopt JavaScript SDK offers a convenient way to accessing, update, and subscribe to objects exposed via Dopt's blocks and flows APIs. You can use this SDK to bind user flow state (defined in Dopt) to your UI.

The SDK lives in our open-source monorepo [odopt](https://github.com/dopt/odopt).

It is published to npm as [`@dopt/javascript`](https://www.npmjs.com/package/@dopt/javascript).

Check out our [TypeDoc docs](https://docs.dopt.com/sdks/javascript/modules/) for source code level documentation.

## Installation

Via npm:

```bash
npm install @dopt/javascript
```

Via Yarn:

```bash
yarn add @dopt/javascript
```

Via pnpm:

```bash
pnpm add @dopt/javascript
```

## Configuration

To initialize the SDK, you will need:

1. A blocks API key (generated in Dopt)
1. The identifiers and version tags for the flows you want your end-users to experience
1. A user identifier (user being an end-user you've identified to Dopt)

## Usage

### Initialization

You can initialize Dopt in your app as follows:

```js
const dopt = new Dopt({
  blocksAPIKey,
  userId,
  flowVersions: {
    'new-user-onboarding': 3,
    'plan-upsell': 4,
  },
});
```

### Flows and blocks

The SDK gives you access to two related objects: flows and blocks. Flows are entities representing the flow you designed in Dopt. Blocks are a subset of the blocks in that flow.

Flow objects available through the SDK are represented by the following type definition:

```ts
interface Flow<T = 'flow'> {
  readonly kind: 'flow';
  readonly type: T;
  readonly uid: string;
  readonly sid: string;
  readonly version: number;
  readonly state: {
    started: boolean;
    finished: boolean;
    stopped: boolean;
  };
  blocks: Block[];
}
```

The states of a flow are 1:1 with the actions you can perform on a flow. Flows have blocks, which are represented through the following type definition:

```ts
interface Block {
  readonly kind: 'block';
  readonly type: 'model';
  readonly uid: string;
  readonly sid: string;
  readonly version: number;
  readonly state: {
    active: boolean;
    entered: boolean;
    exited: boolean;
  };
  readonly transitioned: Record<string, boolean> | undefined;
  field: <V>(name: string, defaultValue?: V) => V | null;
}
```

Unlike flows, the states of a block are not all 1:1 with actions you can perform. The `entered` and `exited` states do have an associated action, but the `active` state is special.

**Key concept:** The `active` state of a block is controlled by Dopt and represents where the initialized user (specified by the `userId` prop) is in the flow. As you or other actors perform actions that implicitly transition the user through the flow, the `active` state is updated.

### Accessing flows and blocks

Now that you know what objects are available through the SDK, let's talk about how you access them.

You can use the `blocks()` method to access all blocks associated with the `flowVersions` specified to the SDK.

```js
const blocks = dopt.blocks();

blocks.forEach((block) => console.log(block));
```

You can access individual blocks via the `block(identifier: string)` method:

```js
const block = dopt.block('new-user-onboarding.twenty-llamas-attack');
console.log(
  "I'm the 'twenty-llamas-attack' block in version 3 of the 'new-user-onboarding' flow",
  block
);
```

We also expose flow accessors. You can use the `flows()` method to access all flows associated with the `flowVersions` specified to the SDK.

```js
const flows = dopt.flows();

flows.forEach((flow) => console.log(flow));
```

Additionally, you can access individual flows via the `flow(id: string, version: number)` method:

```js
const flow = dopt.flow('new-user-onboarding');
console.log("I'm version 3 of the 'new-user-onboarding' flow", flow);
```

The `dopt` object exposes an `initialized` method which you can use to guard calls to any block accessors:

```js
dopt.initialized().then(() => {
  // Safely access block(s) or flow(s)!
  const blocks = dopt.blocks();
  const block = dopt.block('new-user-onboarding.twenty-llamas-attack');
});
```

### Subscribing to flow or block state change

You can use the `subscribe()` method on the flow and block classes to listen for changes to then underlying object:

```js
const block = dopt.block('new-user-onboarding.twenty-llamas-attack');

block.subscribe((block: Block) =>
  console.log(`Block ${block.sid} has updated`, block)
);
```

```js
const flow = dopt.flow('new-user-onboarding');

flow.subscribe((flow: Flow) =>
  console.log(`Flow ${flow.sid} has updated`, flow)
);
```

### Using transitions to trigger block state changes

Our block class provides a transition method which you can use to progress and update the state of a block. For example, when you need to progress a specific step in your onboarding flow, you can call `block.transition("complete")` to transition along the `complete` path as defined in your flow.

These the `block.transition` method is defined with a signature that explicitly does not return values: `(...inputs: string[]) => void`. We do this because each intention may cause a flow and / or block transition along with other side effects. These changes will eventually propagate back to the client. Then the client will reactively update and re-render components based on the subscriptions you've defined via `block.subscribe(...)`. Calling a transition only means that at sometime in the future, the client's state will be updated.

### Using intents to trigger flow state changes

Our flow class provides intention methods which you can use to progress and update the state of a flow. For example, when you need to prematurely finish a flow, you can call `flow.finish()`.

These methods, like `flow.finish()` or `flow.reset()` are defined with signatures that explicitly do not return values: `() => void`. We do this because each intention may cause a flow and / or block transition along with other side effects. These changes will eventually propagate back to the client. Then the client will reactively update and re-render components based on the subscriptions you've defined via `flow.subscribe(...)`. Calling an intention only means that at sometime in the future, the client's state will be updated.

### Understanding loading status

We expose two functions which enable you to wait for Dopt to initialize, both within the larger `Dopt` provider class and at the granular `Flow` class level. To wait for all of Dopt to initialize, you can use the `dopt.initialized()` function on an instance of the `Dopt` class. This function returns a promise which resolves after Dopt has completed loading.

If you would instead like to wait for specific flows, you can use the `flow.initialized()` function on an instance of the `Flow` class. This function returns a promise which resolves after that specific flow has completed loading; additionally, the promise will resolve to `true` if the loading was successful and `false` otherwise.

### Example usage

```tsx
import { NewUserOnboarding } from '@/onboarding/new-user';

const dopt = new Dopt({
  apiKey,
  userId,
  flowVersions: { 'new-user-onboarding': 3 },
});

dopt.initialized().then(() => {
  const userOnboardingModal = new NewUserOnboardingModal();

  const block = dopt.block('new-user-onboarding.twenty-llamas-attack');

  // subscribe to changes in your blocks's state
  // you can also unsubscribe the listener by calling the returned function
  const unsubscribe = block.subscribe((block: Block) => {
    if (!block.state.active) {
      userOnboardingModal.hide();
    } else {
      userOnboardingModal.render().show();
    }
  });

  // initially render your component, if it's active
  if (block.state.active) {
    userOnboardingModal.render().show();
    // complete the block where appropriate
    userOnboardingModal.on('done', block.transition('complete'));
  }
});
```

### Debugging

The SDK accepts a `logLevel` parameter that allows you to set the minimum log level you would like to print into the console. This defaults to `'silent'`.

```tsx
const dopt = new Dopt({
  apiKey,
  userId,
  logLevel: 'warn', // 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'silent'
  flowVersions: { 'new-user-onboarding': 3 },
});
```

### Optimistic updates

`DoptConfig` and `Dopt` also accept a `optimisticUpdates` (`boolean`) prop that will optimistically update the state of a block when the complete intent method is called. This defaults to `true`. As of right now, only a step block's `complete` intent can be optimistically updated.

## Feedback

Looking to provide feedback or report a bug? [Open an issue](https://github.com/dopt/odopt/issues/new?title=[@dopt/javascript]%20) or contact us at [support@dopt.com](mailto:support@dopt.com).

## Contributing

All contributions are welcome! Feel free to open a [pull request](https://github.com/dopt/odopt/compare).
