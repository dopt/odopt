# Dopt React SDK

## Getting started

The Dopt React SDK is a framework-specific client for accessing Dopt's Block API, allowing you to bind user flow state defined in Dopt to your UI to build onboarding and engagement flows.

The SDK lives in our open-source monorepo [odopt](https://github.com/dopt/odopt).

It is published to npm as [`@dopt/react`](https://www.npmjs.com/package/@dopt/react).

Check out our [TypeDoc docs](https://docs.dopt.com/sdks/react/modules/) for source code level documentation. For a more in-depth guide, check out the [React SDK guide](https://docs.dopt.com/guides/react-sdk/) in our docs.

## Installation

Via npm:

```bash
npm install @dopt/react
```

Via Yarn:

```bash
yarn add @dopt/react
```

Via pnpm:

```bash
pnpm add @dopt/react
```

## Configuration

To configure the Dopt provider you will need

1. A Blocks API key (generated in Dopt)
1. The flow identifiers and versions you want your end-users to experience
1. A user ID (user being an end-user you've identified to Dopt)

## Usage

### Initialization

You can initialize Dopt in your app by integrating the `<DoptProvider />` as follows:

```js
import { DoptProvider } from "@dopt/react";
import Application from "./application";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <DoptProvider
    userId={userId}
    apiKey={blocksAPIKey}
    flowVersions={{ "user-onboarding": 2, "upsell-flow": 4 }}
  >
    <Application />
  </DoptProvider>,
  rootElement
);
```

**Note:** If `userId` is `undefined`, default objects with default states (e.g. all state values will default to `false`) will be returned from the associated hooks.

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
  size: number;
  blocks: Step[];
  ordered: boolean;
}
type Block = Group | Step;
```

Unlike Flows, the states of a Block are not all 1:1 with actions you can perform. The `completed` does have an associated action, but the `active` state is special.

**Key Concept:** The `active` state of a Block is controlled by Dopt and represents where the currently logged in user (specified by the `userId` prop) is in the Flow. As you or other actors perform actions that implicitly transition the user through the Flow, the `active` state is updated.

### Accessing Flows and Blocks

Now that you know what objects are available through the SDK, let's talk about how you access them.

By integrating the provider, all descendants of it can now access the Flows configured in the [flowVersions](./src/types.ts#L23) prop, and their associated blocks using the following React hooks and HOCs.

##### Hooks

- [useFlow](./src/use-flow.ts)

```ts
interface FlowIntentions {
  reset: () => void;
  exit: () => void;
  complete: () => void;
}
declare const useFlow: (sid: string) => [flow: Flow, intent: FlowIntentions];
```

- [useBlock](./src/use-block.ts)

```ts
interface BlockIntentions {
  complete: () => void;
}
declare const useBlock: (
  uid: string
) => [block: Block, intent: BlockIntentions];
```

- [useOrderedGroup](./src/use-ordered-group.tsx)

```ts
interface BlockIntentions {
  complete: () => void;
  prev: () => void;
  next: () => void;
  goTo: (index: number) => void;
}

export interface Group extends Set {
  getCompleted: () => Element[];
  getUncompleted: () => Element[];
  getActive: () => Element[];
  getInactive: () => Element[];
}

declare const useOrderedGroup: (
  uid: string
) => [block: Group, intent: BlockIntentions];
```

- [useUnorderedGroup](./src/use-unordered-group.tsx)

```ts
interface BlockIntentions {
  complete: () => void;
}

declare const useOrderedGroup: (
  uid: string
) => [block: Group, intent: BlockIntentions];
```

##### HOCS

We offer analogous functionality through HOCs for those who are limited by their version of React or prefer that pattern.

- [withFlow](./src/with-flow.tsx)
- [withBlock](./src/with-block.tsx)
- [withOrderedGroup](./src/with-ordered-group.tsx)
- [withUnorderedGroup](./src/with-unordered-group.tsx)

### Example usage

#### Accessing Blocks

Using the [useBlock](./src/use-block.ts) hook.

```tsx
import { useBlock } from "@dopt/react";
import { Modal } from "@your-company/modal";

export function Application() {
  const [block, intent] = useBlock("HNWvcT78tyTwygnbzU6SW");
  return (
    <main>
      <Modal isOpen={block.state.active}>
        <h1>👏 Welcome to our app!</h1>
        <p>This is your onboarding experience!</p>
        <button onClick={intent.complete}>Close me</button>
      </Modal>
    </main>
  );
}
```

Using the [withBlock](./src/with-block.tsx) HOC

```tsx
import { withBlock } from "@dopt/react";
import { WelcomeModal } from "./welcome-modal";

export function Application() {
  const WelcomeModalWithDopt = withBlock(WelcomeModal, "j0zExxZDVKCPXPzB2ZgpW");
  return (
    <main>
      <WelcomeModalWithDopt />
    </main>
  );
}
```

#### Accessing Flows

Using the [useFlow](./src/use-flow.ts) hook.

```tsx
import { useFlow } from "@dopt/react";
import { Modal } from "@your-company/modal";

export function Application() {
  const [flow, intent] = useFlow("new-user-onboarding");
  return (
    <main>
      <Modal isOpen={flow.state.completed}>
        <h1>👏 Your onboarding has finished!</h1>
        <p>Want to reset? click the button below.</p>
        <button onClick={intent.reset}>Reset onboarding</button>
      </Modal>
    </main>
  );
}
```

Using the [withFlow](./src/with-flow.tsx) HOC

```tsx
import { withFlow } from "@dopt/react";
import { Modal } from "@your-company/modal";

export function Application() {
  const WelcomeModalWithFlow = withFlow(Modal, "new-user-onboarding", 1);
  return (
    <main>
      <WelcomeModalWithFlow />
    </main>
  );
}
```

#### Accessing Ordered Groups

Using the [useOrderedGroup](./src/use-ordered-group.tsx) hook.

```tsx
import { useOrderedGroup } from "@dopt/react";
import { Modal } from "@your-company/modal";

export function Application() {
  const [group, groupIntent] = useOrderedGroup("HNWvcT78tyTwygnbzU6SW");
  const [block, blockIntent] = useBlock("HJDdinfT60yywdls893");

  return (
    <main>
      <Modal isOpen={block.state.active}>
        <h1>👏 Welcome to our app!</h1>
        <p>This is your onboarding experience!</p>
        <p>You are on step {group.getCompleted() + 1}</p>
        <button onClick={group.next}>Next me</button>
        <button onClick={groupIntent.complete}>Exit</button>
      </Modal>
    </main>
  );
}
```

Using the [withOrderedGroup](./src/with-ordered-group.tsx) HOC

```tsx
import { withOrderedGroup } from "@dopt/react";
import { WelcomeModal } from "./welcome-modal";

export function Application() {
  const WelcomeModalWithDopt = withOrderedGroup(
    WelcomeModal,
    "j0zExxZDVKCPXPzB2ZgpW"
  );
  return (
    <main>
      <WelcomeModalWithDopt />
    </main>
  );
}
```

#### Accessing Unordered Groups

Using the [useUnorderedGroup](./src/use-unordered-group.tsx) hook.

```tsx
export function Application() {
  const [group, groupIntent] = useUnorderedGroup("HNWvcT78tyTwygnbzU6SW");
  const [block, blockIntent] = useBlock("HJDdinfT60yywdls893");

  return (
    <main>
      <Modal isOpen={block.state.active}>
        <h1>👏 Welcome to our app!</h1>
        <p>This is your onboarding experience!</p>
        <p>You are on step {group.getCompleted() + 1}</p>
        <button onClick={blockIntent.complete}>Next</button>
        <button onClick={groupIntent.complete}>Exit</button>
      </Modal>
    </main>
  );
}
```

Using the [withUnorderedGroup](./src/with-unordered-group.tsx) HOC

```tsx
import { withUnorderedGroup } from "@dopt/react";
import { WelcomeModal } from "./welcome-modal";

export function Application() {
  const WelcomeModalWithDopt = withUnorderedGroup(
    WelcomeModal,
    "j0zExxZDVKCPXPzB2ZgpW"
  );
  return (
    <main>
      <WelcomeModalWithDopt />
    </main>
  );
}
```

### Debugging

The `DoptProvider` accepts a `logLevel` prop that allows you to set the minimum log level you would like to print into the console. This defaults to `'silent'`.

```tsx
<DoptProvider
  userId={userId}
  apiKey={blocksAPIKey}
  flowVersions={flowVersions}
  logLevel="warn" // 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'silent'
>
  <Application />
</DoptProvider>
```

### Optimistic updates (experimental)

The `DoptProvider` accepts a `optimisticUpdates` (`boolean`) prop that will optimistically update the state of a block when an intent method is called. This defaults to `true`.

## Feedback

Looking to provide feedback or report a bug? [Open an issue](https://github.com/dopt/odopt/issues/new?title=[@dopt/react]%20) or contact us at [support@dopt.com](mailto:support@dopt.com).

## Contributing

All contributions are welcome! Feel free to open a [pull request](https://github.com/dopt/odopt/compare).
