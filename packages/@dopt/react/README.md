# Dopt's React SDK

## Getting Started

The Dopt React SDK offers a convenient framework-native client for accessing Dopt's Block Model API, allowing you to bind user journey state (defined in Dopt) to your UI.

Check out our [type doc](https://paka.dev/npm/@dopt/react) for source code level documentation!

### Installation

Via Yarn:

```bash
yarn add @dopt/react
```

Via pnpm:

```bash
pnpm add @dopt/react
```

Via NPM:

```bash
npm install @dopt/react
```

### Configuration

To configure the Dopt Provider you will need

1. A Block API key (generated in Dopt)
1. A user ID (user being an end-user you've identified to Dopt)
1. The flow identifiers and versions you want your end-users to experience

### Usage

#### Initialization

You can initialize Dopt in your App by integrating the `<DoptProvider />` as follows:

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

#### Accessing Model State

Having integrated the Provider you can now access Dopt Model State from anywhere in your app (`<Application />` in this example) using our the [useDopt](./src/use-dopt.ts) Hook or [withDopt](./src/with-dopt.tsx) HOC.

#### Example Usage

Using the [useDopt](./src/use-dopt.ts) Hook.

```ts
import { useDopt } from "@dopt/react";
import { Modal } from "@your-company/modal";

export function Application() {
  const [{ active }, { complete }] = useDopt("HNWvcT78tyTwygnbzU6SW");
  return (
    <main>
      <Modal
        isOpen={active}
        title="👏 Welcome to your first journey!"
        footerItems={{
          primaryActions: [{ label: "Got it", onClick: complete }],
        }}
      >
        <Text>This is your onboarding experience!</Text>
      </Modal>
    </main>
  );
}
```

Using the [withDopt](./src/with-dopt.tsx) HOC

```ts
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
