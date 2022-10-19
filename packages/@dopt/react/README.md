# Dopt React SDK

## Getting Started

The Dopt React SDK offers a convenient framework-native client for accessing Dopt's blocks API, allowing you to bind user journey state (defined in Dopt) to your UI.

Check out our [type doc](https://paka.dev/npm/@dopt/react) for source code level documentation!

For a more in-depth guide, check out the [React SDK guide](https://docs.dopt.com/guides/react-sdk) in our docs.

### Installation

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

### Configuration

To configure the Dopt provider you will need

1. A blocks API key (generated in Dopt)
1. A user ID (user being an end-user you've identified to Dopt)
1. The flow identifiers and versions you want your end-users to experience

### Usage

#### Initialization

You can initialize Dopt in your app by integrating the `<DoptProvider />` as follows:

```js
import { DoptProvider } from "@dopt/react";
import Application from "./application";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <DoptProvider
    flowVersions={{ "user-onboarding": 2, "upsell-flow": 4 }}
    userId={userId}
    apiKey={blockAPIKey}
  >
    <Application />
  </DoptProvider>,
  rootElement
);
```

#### Accessing block state

Having integrated the provider, you can now access Dopt block state from anywhere in your app (`<Application />` in this example) using the [useDopt](./src/use-dopt.ts) hook or [withDopt](./src/with-dopt.tsx) HOC.

#### Example usage

Using the [useDopt](./src/use-dopt.ts) hook.

```tsx
import { useDopt } from "@dopt/react";
import { Modal } from "@your-company/modal";

export function Application() {
  const [
    { active, completed, started, stopped, exited },
    { start, complete, stop, exit },
  ] = useDopt("HNWvcT78tyTwygnbzU6SW");
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

Using the [withDopt](./src/with-dopt.tsx) HOC

```tsx
import { withDopt } from "@dopt/react";
import { WelcomeModal } from "./welcome-modal";

export function Application() {
  const WelcomeModalWithDopt = withDopt(WelcomeModal, "j0zExxZDVKCPXPzB2ZgpW");
  return (
    <main>
      <WelcomeModalWithDopt />
    </main>
  );
}
```
