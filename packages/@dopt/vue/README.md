# Dopt Vue SDK

## Overview

The Dopt Vue SDK offers a convenient way to accessing, update, and subscribe to objects exposed via Dopt's blocks and flows APIs. You can use this SDK to bind user flow state (defined in Dopt) to your UI.

The SDK lives in our open-source monorepo [odopt](https://github.com/dopt/odopt).

It is published to npm as [`@dopt/vue`](https://www.npmjs.com/package/@dopt/vue).

Check out our [TypeDoc docs](https://docs.dopt.com/sdks/vue/modules/) for source code level documentation. For a more in-depth guide, check out the [Vue SDK guide](https://docs.dopt.com/build/vue-sdk/) in our docs.

## Installation

Via npm:

```bash
npm install @dopt/vue
```

Via Yarn:

```bash
yarn add @dopt/vue
```

Via pnpm:

```bash
pnpm add @dopt/vue
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
import { DoptPlugin } from '@dopt/vue';
import App from './App.vue';

const app = createApp(App);

app.use(DoptPlugin, {
  apiKey: 'MY-BLOCKS-API-KEY',
  userId,
  flowVersions: {
    'new-user-onboarding': 3,
    'plan-upsell': 4,
  },
});
```

The Dopt plugin accepts the following options:

```ts
export interface DoptPluginOptions {
  userId: string | undefined;
  groupId?: string | undefined;
  apiKey: string;
  flowVersions: Record<string, FlowParams['version']>;
}
```

Flow versions can be pegged to a fixed version by specifying a number. Alternately, using `"uncommitted"` will reference the uncommitted version in Dopt, and using `"latest"` will references the most recently created version in Dopt.

**⚠️ Warning ⚠️**: Using either `"uncommitted"` or `"latest"` for a flow version will cause updates made in Dopt to be reflected in the provider upon window reload without needing to update or deploy code.

If your `userId` isn't available at `DoptPlugin` creation time, you can instead pass: `userId: undefined`. Then, the `DoptPlugin` will wait until your `userId` is available before initializing.

Once your `userId` is available, you can use the `useUpdateUser` composable to update the plugin:

```js
import { useUpdateUser } from '@dopt/vue';

/**
 * Within setup or in another appropriate place
 */
const updateUser = useUpdateUser();
updateUser(userId);
```

### Flows, blocks, and components

The SDK gives you access to two related core classes: flows and blocks, and a set of higher-level component classes. Flows are entities representing the flow you designed in Dopt. Blocks are a subset of the blocks in that flow.

Flow objects available through the SDK are represented by the following type definition:

```ts
interface Flow {
  uid: Ref<string>;
  sid: Ref<string>;
  version: Ref<number>;
  state: Ref<{
    started: boolean;
    finished: boolean;
    stopped: boolean;
  }>;
  start(): void;
  finish(): void;
  stop(): void;
  reset(): void;
}
```

The states of a flow are 1:1 with the actions you can perform on a flow. Flows have blocks, which are represented through the following type definition:

```ts
interface Block {
  uid: Ref<string>;
  sid: Ref<string>;
  version: Ref<number>;
  state: Ref<{
    active: boolean;
    entered: boolean;
    exited: boolean;
  }>;
  transitioned: Ref<Record<string, boolean>>;
  field: <V extends string | number | boolean>(
    name: string
  ) => V | null | undefined;
  transition(...input: string[]): void;
}
```

Unlike flows, the states of a block are not all 1:1 with actions you can perform. The `entered` and `exited` states do have an associated action, but the `active` state is special.

**Key concept:** The `active` state of a block is controlled by Dopt and represents where the initialized user (specified by the `userId` prop) is in the flow. As you or other actors perform actions that implicitly transition the user through the flow, the `active` state is updated.

In addition to flows and blocks, the Vue SDK also exposes headless component classes which map to the components you can define in Dopt. These components extend the interfaces outlined in: `@dopt/semantic-data-layer-*`. Components encapsulate a lot of the details that flows and blocks expose and allow you to perform simple, semantic actions instead of working with transitions, states, and fields. For example, here is the interface for a `TourItem`.

```ts
export interface TourItem {
  id: Ref<string>;
  tour: () => Tour | undefined;
  index: Ref<number | null | undefined>;
  title: Ref<string | null | undefined>;
  body: Ref<Children | null | undefined>;
  nextLabel: Ref<string | null | undefined>;
  backLabel: Ref<string | null | undefined>;
  active: Ref<boolean>;
  completed: Ref<boolean>;
  next: () => void;
  back: () => void;
}
```

**Key concept:** The `TourItem` converts internal fields and exposes values on the instance itself, like `body` which maps to the rich text within the item. Additionally, it also exposes important state parameters like `active` and `completed`, and it also exposes ways to transition state via `next()` and `back()`.

### Accessing flows and blocks

Now that you know what objects are available through the SDK, let's talk about how you access them.

You can access individual blocks via the `useBlock(identifier: string)` composable:

```tsx
/**
 * A Block instance.
 */
const block = useBlock('new-user-onboarding.twenty-llamas-attack');

/**
 * Note, many Block attributes are refs.
 * Depending on where you use them within Vue, they may or may not get unwrapped.
 */
const { state, sid, version } = block;

console.log(
  "I'm the 'twenty-llamas-attack' block in version 3 of the 'new-user-onboarding' flow",
  `${sid.value}@${version.value}`
);

/**
 * This will trigger whenever Dopt updates this block's state.
 */
watch(state, () => console.log(state.value));

/**
 * This template will render the `div` once state.active becomes true.
 */
<template>
  <div v-if="state.active">Hello, I'm active!</div>
</template>;
```

We also expose flow accessors. You can access individual flows via the `useFlow(id: string)` method:

```js
/**
 * A Flow instance.
 */
const flow = useFlow('new-user-onboarding');

/**
 * Note, many Block attributes are refs.
 * Depending on where you use them within Vue, they may or may not get unwrapped.
 */
const { state, sid, version } = flow;

console.log(
  "I'm version 3 of the 'new-user-onboarding' flow",
  `${sid.value}@${version.value}`
);

/**
 * This will trigger whenever Dopt updates this flow's state.
 */
watch(state, () => console.log(state.value));

/**
 * This template will render the `div` once state.active becomes true.
 */
<template>
  <div v-if="state.active">Hello, I'm active!</div>
</template>;
```

### Accessing components

As with flows and blocks, you can also access component blocks which you've defined within Dopt.

These component classes provide semantic interfaces which translate to actions you can perform on the component.

For example, the `TourItem` component maps to `@dopt/semantic-data-layer-tour`'s `TourItem` interface.
Instead of using lower-level accessors like `.state` and `.transitioned`, you can instead rely on `.active` and `.completed`.
Additionally, you can trigger transitions by calling `.next()` and `.back()` which will navigate the user
forward and backward in the tour.

These semantic accessors and functions provide a nice headless wrapper for building your own `TourItem` component.

The Vue SDK has built in headless composables for all Dopt provided components:

- `useTourItem` (maps to `@dopt/semantic-data-layer-tour`)
- `useTour` (maps to `@dopt/semantic-data-layer-tour`)
- `useHints` (maps to `@dopt/semantic-data-layer-hints`)
- `useHintsItem` (maps to `@dopt/semantic-data-layer-hints`)
- `useChecklist` (maps to `@dopt/semantic-data-layer-checklist`)
- `useChecklistItem` (maps to `@dopt/semantic-data-layer-checklist`)
- `useModal` (maps to `@dopt/semantic-data-layer-modal`)
- `useCard` (maps to `@dopt/semantic-data-layer-card`)

**🛈 Note 🛈**: As with flows and blocks, these composables also return interfaces which wrap primitives with `ref` so that you can rely on their returned values being stateful. The Vue SDK will update these values as Dopt loads and as state changes and transitions occur.

### Using transitions to trigger block state changes

Our `Block` interface provides a transition method which you can use to progress and update the state of a block. For example, when you need to progress a specific step in your onboarding flow, you can call `block.transition("complete")` to transition along the `complete` path as defined in your flow.

These the `block.transition` method is defined with a signature that explicitly does not return values: `(...inputs: string[]) => void`. We do this because each intention may cause a flow and / or block transition along with other side effects. These changes will eventually propagate back to the client. Then the client will reactively update and re-render components based on the `ref` attributes we return from our composables. Calling a transition only means that at sometime in the future, the client's state will be updated.

### Using intents to trigger flow state changes

Our `Flow` class provides intention methods which you can use to progress and update the state of a flow. For example, when you need to prematurely finish a flow, you can call `flow.finish()`.

These methods, like `flow.finish()` or `flow.reset()` are defined with signatures that explicitly do not return values: `() => void`. We do this because each intention may cause a flow and / or block transition along with other side effects. These changes will eventually propagate back to the client. Then the client will reactively update and re-render components based on the `ref` attributes we return from our composables. Calling an intention only means that at sometime in the future, the client's state will be updated.

### Understanding loading status

We expose two composables which enable you to wait for Dopt to initialize, both within the larger `Dopt` plugin context and at the granular `Flow` level. To wait for all of Dopt to initialize, you can use the `useDoptInitialized` composable. This composable returns a `Ref<boolean>` which will update to `true` once the plugin has finished loading.

If you would instead like to wait for specific flows, you can use the `useFlowStatus` composable instead. This composable returns an object: `{ pending: Ref<boolean>; failed: Ref<boolean> }`. When the flow has finished loading, `pending` will update to false. If the flow fails to load, then `failed` will update to true.

### Example usage

```tsx
<script setup lang="ts">
import { useTourItem } from '@dopt/vue';
const { id } = defineProps<{ id: string >();

/**
 * Most of these attributes have type Ref.
 * For example, `active` is Ref<boolean>.
 */
const { active, title, index, tour } =
  useTourItem(id);
</script>

<template>
  <div class="tour" :class="{ 'tour--active': active }">
    <div class="tour__anchor"><slot></slot></div>
    <div v-if="active" class="tour__popover" :data-position="position">
      <header class="tour__popover-header">
        <h1 class="tour__popover-title">{{ title }}</h1>
        <a
          class="tour__popover-dismiss"
          title="Exit tour"
          @click="() => tour()?.dismiss()"
          >✖</a
        >
      </header>
    </div>
  </div>
</template>
```

### Debugging

The SDK accepts a `logLevel` parameter that allows you to set the minimum log level you would like to print into the console. This defaults to `'silent'`.

```ts
app.use(DoptPlugin, {
  apiKey,
  userId,
  logLevel: 'warn', // 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'silent'
  flowVersions: { 'new-user-onboarding': 3 },
});
```

### Optimistic updates

The `DoptPlugin` also accepts an `optimisticUpdates` (`boolean`) prop that will optimistically update the state of a block when the complete intent method is called. This defaults to `true`. As of right now, only a step block's `complete` intent can be optimistically updated.

## Feedback

Looking to provide feedback or report a bug? [Open an issue](https://github.com/dopt/odopt/issues/new?title=[@dopt/vue]%20) or contact us at [support@dopt.com](mailto:support@dopt.com).

## Contributing

All contributions are welcome! Feel free to open a [pull request](https://github.com/dopt/odopt/compare).
