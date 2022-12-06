# Dopt React SDK

## Getting started

The Dopt React SDK is a framework-specific client for accessing Dopt's blocks API, allowing you to bind user flow state defined in Dopt to your UI to build onboarding and engagement flows.

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

1. A blocks API key (generated in Dopt)
1. The flow identifiers and versions you want your end-users to experience
1. (Optional) A user ID (user being an end-user you've identified to Dopt)

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

**Note:** If `userId` is `undefined`, all state values will default to `false`.

### Accessing block state and intentions

Having integrated the provider, you can now access Dopt block state from anywhere in your app (`<Application />` in this example) using the [useBlock](./src/use-block.ts) hook or [withBlock](./src/with-block.tsx) HOC.

### Example usage

Using the [useBlock](./src/use-block.ts) hook.

```tsx
import { useBlock } from "@dopt/react";
import { Modal } from "@your-company/modal";

export function Application() {
  const [
    { active, completed, started, stopped, exited },
    { start, complete, stop, exit },
  ] = useBlock("HNWvcT78tyTwygnbzU6SW");
  return (
    <main>
      <Modal isOpen={active}>
        <h1>👏 Welcome to our app!</h1>
        <p>This is your onboarding experience!</p>
        <button onClick={complete}>Close me</button>
      </Modal>
    </main>
  );
}
```

Using the [withBlock](./src/with-dopt.tsx) HOC

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

### Accessing flow state and intentions

You can also access Dopt flow state from anywhere in your app (`<Application />` in this example) using the [useFlow](./src/use-flow.ts) hook or [withFlow](./src/with-flow.tsx) HOC.

### Example usage

Using the [useFlow](./src/use-flow.ts) hook.

```tsx
import { useFlow } from "@dopt/react";
import { Modal } from "@your-company/modal";

export function Application() {
  const [flow, intent] = useFlow("new-user-onboarding", 1);
  return (
    <main>
      <Modal>
        <h1>👏 Your onboarding has finished!</h1>
        <p>Want to reset? click the button below.</p>
        <button onClick={intent.reset}>Reset onboarding</button>
      </Modal>
    </main>
  );
}
```

Using the [withFlow](./src/with-dopt.tsx) HOC

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
