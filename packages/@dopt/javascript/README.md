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
  apiKey: 'MY-BLOCKS-API-KEY',
  userId,
  flowVersions: {
    'new-user-onboarding': 3,
    'plan-upsell': 4,
  },
});
```

The Dopt constructor accepts the following parameters:

```ts
export interface DoptConfig {
  userId: string | undefined;
  groupId?: string | undefined;
  apiKey: string;
  flowVersions: Record<string, FlowParams['version']>;
}
```

Flow versions can be pegged to a fixed version by specifying a number. Alternately, using `"uncommitted"` will reference the uncommitted version in Dopt, and using `"latest"` will references the most recently created version in Dopt.

**⚠️ Warning ⚠️**: Using either `"uncommitted"` or `"latest"` for a flow version will cause updates made in Dopt to be reflected in the provider upon window reload without needing to update or deploy code.

If your `userId` isn't available at `Dopt` initialization time, you can instead pass: `userId: undefined`. Then, `Dopt` will wait until your `userId` is available before initializing.

Once your `userId` is available, you can use the `dopt.configure` method to update the plugin:

```js
dopt.configure({ userId });
```

This is useful in cases where you'd like to create a `Dopt` singleton but can only configure the singleton's user once some downstream asynchronous loading is complete.

### Flows, blocks, and components

The SDK gives you access to two related core classes: flows and blocks, and a set of higher-level component classes. Flows are entities representing the flow you designed in Dopt. Blocks are a subset of the blocks in that flow.

Flow objects available through the SDK are represented by the following pseudo-type definition (the actual implementation uses a class with getters):

```ts
interface Flow {
  uid: string;
  sid: string;
  version: number;
  state: {
    started: boolean;
    finished: boolean;
    stopped: boolean;
  };
  blocks: Block[];
  start(): void;
  finish(): void;
  stop(): void;
  reset(): void;
}
```

The states of a flow are 1:1 with the actions you can perform on a flow. Flows have blocks, which are represented through the following pseudo-type definition (the actual implementation uses a class with getters):

```ts
interface Block {
  uid: string;
  sid: string;
  version: number;
  state: {
    active: boolean;
    entered: boolean;
    exited: boolean;
  };
  transitioned: Record<string, boolean> | undefined;
  field: <V extends string | number | boolean>(
    name: string
  ) => V | null | undefined;
  transition(...input: string[]): void;
}
```

Unlike flows, the states of a block are not all 1:1 with actions you can perform. The `entered` and `exited` states do have an associated action, but the `active` state is special.

**Key concept:** The `active` state of a block is controlled by Dopt and represents where the initialized user (specified by the `userId` prop) is in the flow. As you or other actors perform actions that implicitly transition the user through the flow, the `active` state is updated.

In addition to flows and blocks, the JavaScript SDK also exposes headless component classes which map to the components you can define in Dopt. These components extend the interfaces outlined in: `@dopt/semantic-data-layer-*`. Components encapsulate a lot of the details that flows and blocks expose and allow you to perform simple, semantic actions instead of working with transitions, states, and fields. For example, here is the interface for a `TourItem`.

```ts
export interface TourItem {
  id: string;
  tour: Tour | undefined;
  index: number | null | undefined;
  title: string | null | undefined;
  body: Children | null | undefined;
  nextLabel: string | null | undefined;
  backLabel: string | null | undefined;
  active: boolean;
  completed: boolean;
  next: () => void;
  back: () => void;
}
```

**Key concept:** The `TourItem` converts internal fields and exposes values on the instance itself, like `body` which maps to the rich text within the item. Additionally, it also exposes important state parameters like `active` and `completed`, and it also exposes ways to transition state via `next()` and `back()`.

### Accessing flows and blocks

Now that you know what objects are available through the SDK, let's talk about how you access them.

You can use the `blocks()` method to access all blocks associated with the `flowVersions` specified to the SDK.

```js
const blocks = dopt.blocks();
/**
 * All returned instances are special, they are Block instances.
 * They contain internal attributes including data representations
 * which may be stale. Instead of relying on the internal properties of
 * these objects, using getters like block.state and block.transitioned will
 * always return up to date values.
 */
blocks.forEach((block) => console.log(block));
```

You can access individual blocks via the `block(identifier: string)` method:

```js
/**
 * Also a Block instance.
 */
const block = dopt.block('new-user-onboarding.twenty-llamas-attack');
console.log(
  "I'm the 'twenty-llamas-attack' block in version 3 of the 'new-user-onboarding' flow",
  block
);
```

We also expose flow accessors. You can use the `flows()` method to access all flows associated with the `flowVersions` specified to the SDK.

```js
const flows = dopt.flows();
/**
 * Flow instances behave just like Block instances
 * though they may have different methods and getters.
 */
flows.forEach((flow) => console.log(flow));
```

Additionally, you can access individual flows via the `flow(id: string)` method:

```js
/**
 * Also a Flow instance.
 */
const flow = dopt.flow('new-user-onboarding');
console.log("I'm version 3 of the 'new-user-onboarding' flow", flow);
```

The `dopt` object exposes an `initialized` method which you can use to guard calls to any block accessors:

```js
dopt.initialized().then(() => {
  /**
   * Safely access Block instances (or Flow instances).
   */
  const blocks = dopt.blocks();
  const block = dopt.block('new-user-onboarding.twenty-llamas-attack');
});
```

### Accessing components

As with flows and blocks, you can also access component blocks which you've defined within Dopt.

These component classes provide semantic interfaces which translate to actions you can perform on the component.

For example, the `TourItem` component maps to `@dopt/semantic-data-layer-tour`'s `TourItem` interface.
Instead of using lower-level accessors like `.state` and `.transitioned`, you can instead rely on `.active` and `.completed`.
Additionally, you can trigger transitions by calling `.next()` and `.back()` which will navigate the user
forward and backward in the tour.

These semantic accessors and functions provide a nice headless wrapper for building your own `TourItem` component.

The JavaScript SDK has built in headless classes for all Dopt provided components:

- `TourItem` (defined in `@dopt/semantic-data-layer-tour`)
- `Tour` (defined in `@dopt/semantic-data-layer-tour`)
- `Hints` (defined in `@dopt/semantic-data-layer-hints`)
- `HintsItem` (defined in `@dopt/semantic-data-layer-hints`)
- `Checklist` (defined in `@dopt/semantic-data-layer-checklist`)
- `ChecklistItem` (defined in `@dopt/semantic-data-layer-checklist`)
- `Modal` (defined in `@dopt/semantic-data-layer-modal`)
- `Card` (defined in `@dopt/semantic-data-layer-card`)

### Subscribing to state change

You can use the `subscribe()` method on all Dopt JavaScript instances to listen for changes:

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

Our `Block` class provides a transition method which you can use to progress and update the state of a block. For example, when you need to progress a specific step in your onboarding flow, you can call `block.transition("complete")` to transition along the `complete` path as defined in your flow.

These the `block.transition` method is defined with a signature that explicitly does not return values: `(...inputs: string[]) => void`. We do this because each intention may cause a flow and / or block transition along with other side effects. These changes will eventually propagate back to the client. Then the client will reactively update and re-render components based on the subscriptions you've defined via `block.subscribe(...)`. Calling a transition only means that at sometime in the future, the client's state will be updated.

### Using intents to trigger flow state changes

Our `Flow` class provides intention methods which you can use to progress and update the state of a flow. For example, when you need to prematurely finish a flow, you can call `flow.finish()`.

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

`DoptConfig` and `Dopt` also accept an `optimisticUpdates` (`boolean`) prop that will optimistically update the state of a block when the complete intent method is called. This defaults to `true`. As of right now, only a step block's `complete` intent can be optimistically updated.

## Feedback

Looking to provide feedback or report a bug? [Open an issue](https://github.com/dopt/odopt/issues/new?title=[@dopt/javascript]%20) or contact us at [support@dopt.com](mailto:support@dopt.com).

## Contributing

All contributions are welcome! Feel free to open a [pull request](https://github.com/dopt/odopt/compare).
