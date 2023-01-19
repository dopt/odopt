# Dopt Javascript SDK

## Getting Started

The Dopt Javascript SDK offers a convenient way to accessing, update, and subscribe to objects exposed via Dopt's blocks API. You can use this SDK to bind user flow state (defined in Dopt) to your UI.

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

To configure the Dopt provider you will need

1. A blocks API key (generated in Dopt)
1. The flow identifiers and versions you want your end-users to experience
1. A user ID (user being an end-user you've identified to Dopt)

## Usage

### Initialization

You can initialize Dopt in your app by integrating the `<DoptProvider />` as follows:

```js
const dopt = new Dopt({
  apiKey,
  userId,
  flowVersions: { "welcome-to-dopt": 3 },
});
```

### Flows and Blocks

The Dopt React SDK gives you access to two related objects, Flows and Blocks. Flows are entities representing the Flow you designed in Dopt. Blocks are a subset of the Blocks in that Flow.

Flows objects available through the SDK are represented by the following type definition.

```ts
interface Flow<T = "flow"> {
  readonly kind: "flow";
  readonly type: T;
  readonly uid: string;
  readonly sid: string;
  readonly version: number;
  readonly state: {
    started: boolean;
    completed: boolean;
    exited: boolean;
  };
  blocks: Block[];
}
```

The states of a Flow are 1:1 with the actions you can perform on a Flow. Flows have Blocks, which are represented through the following type definition.

```ts
interface Step {
  readonly kind: "block";
  readonly type: "model";
  readonly uid: string;
  readonly sid: string;
  readonly version: number;
  readonly state: {
    active: boolean;
    completed: boolean;
  };
}
interface Group {
  readonly kind: "block";
  readonly type: "set";
  readonly uid: string;
  readonly sid: string;
  readonly version: number;
  readonly state: {
    active: boolean;
    completed: boolean;
  };
  length: number;
  blocks: Step[];
  ordered: boolean;
}
type Block = Group | Step;
```

Unlike Flows, the states of a Block are not all 1:1 with actions you can perform. The `completed` does have an associated action, but the `active` state is special.

**Key Concept:** The `active` state of a Block is controlled by Dopt and represents where the currently logged in user (specified by the `userId` prop) is in the Flow. As you or other actors perform actions that implicitly transition the user through the Flow, the `active` state is updated.

### Accessing Flows and Blocks

Now that you know what objects are available through the SDK, let's talk about how you access them.

You can use the `blocks()` method to access all blocks associated with the `flowVersions` specified to the SDK.

```js
const blocks = dopt.blocks();

blocks.forEach((block) => console.log(block));
```

You can access individual blocks via the `block(identifier: string)` method e.g.

```js
const block = dopt.block("HNWvcT78tyTwygnbzU6SW");
console.log(
  "I'm on particular block in version 3 of the 'welcome-to-dopt' flow",
  block
);
```

We also expose flow accessors. You can use the `flows()` method to access all flows associated with the `flowVersions` specified to the SDK.

```js
const flows = dopt.flows();

flows.forEach((flow) => console.log(flow));
```

Additionally, you can access individual flows via the `flow(uid: string, version: number)` method e.g.

```js
const flow = dopt.flow("welcome-to-dopt", 3);
console.log("I'm version 3 of the `welcome-to-dopt` flow", flow);
```

The dopt object exposes an `initialized` method which you can use to guard calls to any block accessors e.g.

```js
dopt.initialized().then(() => {
  // Safely access block(s) or flow(s)!
  const blocks = dopt.blocks();
  const block = dopt.block("HNWvcT78tyTwygnbzU6SW");
});
```

### Subscribing to Flow or Block state change

You can use the `subscribe()` method on the Flow and Block classes to listen for changes to then underlying object e.g.

```js
const block = dopt.block("HNWvcT78tyTwygnbzU6SW");

block.subscribe((block: Block) =>
  console.log(`Block ${block.uid} has updated`, block)
);
```

```js
const flow = dopt.flow("welcome-to-dopt", 3);

flow.subscribe((flow: Flow) =>
  console.log(`Flow ${flow.uid} has updated`, flow)
);
```

### Example usage

```tsx
import { NewUserOnboarding } from "@/onboarding/new-user";

const dopt = new Dopt({
  apiKey,
  userId,
  flowVersions: { "welcome-to-dopt": 3 },
});

dopt.initialized().then(() => {
  const userOnboardingModal = new NewUserOnboardingModal();

  const block = dopt.block("HNWvcT78tyTwygnbzU6SW");

  block.subscribe(({ active }: Block) => {
    if (!active && userOnboardingModal.visible()) {
      userOnboardingModal.hide();
    } else {
      userOnboardingModal.render().show();
    }
  });

  if (block.state().active) {
    userOnboardingModal.render().show();
  }
});
```

### Debugging

The SDK accepts a `logLevel` parameter that allows you to set the minimum log level you would like to print into the console. This defaults to `'silent'`.

```tsx
const dopt = new Dopt({
  apiKey,
  userId,
  logLevel: "warn", // 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'silent'
  flowVersions: { "welcome-to-dopt": 3 },
});
```

### Optimistic updates (experimental)

The `DoptProvider` accepts a `optimisticUpdates` (`boolean`) parameter that will optimistically update the state of a block when an intent method is called. This defaults to `true`.
