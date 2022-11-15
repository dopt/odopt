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

### Accessing blocks

You can use the `blocks()` method to access all blocks associated with the `flowVersions` specified to the SDK.

```js
const blocks = dopt.blocks();

blocks.forEach((block) => console.log(block));
```

You can access individual blocks via the `block(identifier: string)` method e.g.

```js
const block = dopt.block("HNWvcT78tyTwygnbzU6SW");
console.log(
  "I'm on particular block in version 3 of the `welcome-to-dopt` flow",
  block
);
```

The dopt object exposes asn `initialized` method which you can use to guard calls to any block accessors e.g.

```js
dopt.initialized().then(() => {
  // Safely access block(s)!
  const blocks = dopt.blocks();
  const block = dopt.block("HNWvcT78tyTwygnbzU6SW");
});
```

### Subscribing to block state change

You can use the `subscribe()` method on the block object to listen for changes to an individual block e.g.

```js
const block = dopt.block("HNWvcT78tyTwygnbzU6SW");

block.subscribe((block: Block) =>
  console.log(`Block ${block.uuid} has updated`, block)
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
