# Dopt React SDK

## Overview

The Dopt React SDK is a framework-specific client for accessing Dopt's blocks and flows APIs, allowing you to bind user flow state defined in Dopt to your UI to build onboarding and engagement flows.

The SDK lives in our open-source monorepo [odopt](https://github.com/dopt/odopt).

It is published to npm as [`@dopt/react`](https://www.npmjs.com/package/@dopt/react).

Check out our [TypeDoc docs](https://docs.dopt.com/sdks/react/modules/) for source code level documentation. For a more in-depth guide, check out the [React SDK guide](https://docs.dopt.com/build/react-sdk/) in our docs.

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

To configure the Dopt provider you will need:

1. A blocks API key (generated in Dopt)
1. The identifiers and version tags for the flows you want your end-users to experience
1. A user identifier (user being an end-user you've identified to Dopt)

## Usage

### Initialization

You can initialize Dopt in your app by integrating the `<DoptProvider />` as follows:

```js
import { DoptProvider } from '@dopt/react';
import Application from './application';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <DoptProvider
    userId={userId}
    apiKey={blocksAPIKey}
    flowVersions={{
      'new-user-onboarding': 2,
      'plan-upsell': 4,
    }}
  >
    <Application />
  </DoptProvider>,
  rootElement
);
```

Flow versions can be pegged to a fixed version by specifying a number. Alternately, using `"uncommitted"` will reference the uncommitted version in Dopt, and using `"latest"` will references the most recently created version in Dopt.

**⚠️ Warning ⚠️**: Using either `"uncommitted"` or `"latest"` for a flow version will cause updates made in Dopt to be reflected in the provider upon window reload without needing to update or deploy code.

**Note:** If `userId` is `undefined`, default objects with default states (e.g. all state values will default to `false`) will be returned from the associated hooks. Any subsequent updates to `userId` will trigger all hooks within the `DoptProvider` again and lead to fetching the appropriate states.

### Flows and blocks

The SDK gives you access to two related objects: flows and blocks. Flows are entities representing the flow you designed in Dopt. Blocks are a subset of the blocks in that flow.

Flow objects available through the SDK are represented by the following type definition:

```ts
interface Flow {
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
  readonly uid: string;
  readonly sid: string;
  readonly version: number;
  readonly state: {
    active: boolean;
    entered: boolean;
    exited: boolean;
  };
  readonly transitioned: Record<string, boolean> | undefined;
  field: <V extends string | number | boolean>(
    name: string
  ) => V | null | undefined;
}
```

Unlike flows, the states of a block are not all 1:1 with actions you can perform. The `entered` and `exited` states do have an associated action, but the `active` state is special.

**Key concept:** The `active` state of a block is controlled by Dopt and represents where the currently initialized user (specified by the `userId` prop) is in the flow. As you or other actors perform actions that implicitly transition the user through the flow, the `active` state is updated.

### Accessing flows and blocks

Now that you know what objects are available through the SDK, let's talk about how you access them.

By integrating the provider, all descendants of it can now access the flows configured in the [flowVersions](./src/types.ts#L77) prop, and their associated blocks using the following React hooks.

### Using transitions

Our hooks provide a transition function which you can use to progress and update the state of flows and blocks. The transition function accepts the path names you've defined on the flow canvas as inputs. These inputs will determine which paths the user will transition along.

This function is defined with a signature that explicitly does not return a value: `(...inputs: string[]) => void | undefined`. We do this because a transition may cause a flow and / or block transition along with other side effects. These changes will eventually propagate back to the client. Then, the client will reactively update and re-render the components which depend on these flow and block states. Calling an transition only means that at sometime in the future, the client's state will be updated.

### Understanding loading status

We expose two hooks which enable you to wait for Dopt to initialize, both at the larger `DoptProvider` level and at the granular flow level. To wait for the entire `DoptProvider` to initialize, you can use [useDoptInitialized](./src/use-dopt-initialized.ts). This hook returns a `boolean` which becomes `true` after the entire DoptProvider has finished loading.

If you would instead like to wait for specific flows, you can use the [useFlowStatus](./src/use-flow-status.ts) hook. This hook returns a `FlowStatus` object (`{ pending: boolean, failed: boolean }`) - when the flow has finished loading, `pending` will be false. If the flow fails to load, then `failed` will be true.

### Using React hooks

- [useFlow](./src/use-flow.ts)

```ts
interface FlowIntentions {
  start: (options?: { force?: boolean }) => void | undefined;
  reset: (options?: { force?: boolean }) => void | undefined;
  stop: () => void | undefined;
  finish: () => void | undefined;
}
declare const useFlow: (id: string) => [flow: Flow, intent: FlowIntentions];
```

- [useBlock](./src/use-block.ts)

```ts
type BlockTransition = (...inputs: string[]) => void | undefined;
declare const useBlock: (
  id: string
) => [block: Block, transition: BlockTransition];
```

### Example usage

#### Accessing blocks

Using the [useBlock](./src/use-block.ts) hook:

```tsx
import { useBlock } from '@dopt/react';
import { Modal } from '@your-company/modal';

export function Application() {
  const [block, transition] = useBlock<['complete']>(
    'new-user-onboarding.twenty-llamas-attack'
  );
  return (
    <main>
      <Modal isOpen={block.state.active}>
        <h1>👏 Welcome to our app!</h1>
        <p>This is your onboarding experience!</p>
        <button onClick={() => transition('complete')}>Close me</button>
      </Modal>
    </main>
  );
}
```

#### Accessing flows

Using the [useFlow](./src/use-flow.ts) hook:

```tsx
import { useFlow } from '@dopt/react';
import { Modal } from '@your-company/modal';

export function Application() {
  const [flow, intent] = useFlow('new-user-onboarding');
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

### Optimistic updates

The `DoptProvider` accepts an `optimisticUpdates` (`boolean`) prop that will optimistically update the state of a block when the complete intention method is called. This defaults to `true`. As of right now, only a step block's `complete` intention can be optimistically updated.

## Feedback

Looking to provide feedback or report a bug? [Open an issue](https://github.com/dopt/odopt/issues/new?title=[@dopt/react]%20) or contact us at [support@dopt.com](mailto:support@dopt.com).

## Contributing

All contributions are welcome! Feel free to open a [pull request](https://github.com/dopt/odopt/compare).
