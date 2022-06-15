# Dopt's React SDK

## Dopt Overview

Dopt is a growth-focused platform. For developers, this means a set of APIs and SDKs that help you build growth experience e.g. tailored onboarding, feature discovery, and announcements.

## Getting Started

The Dopt React SDK offers a convient framework-native client for accessing Dopt's Model API, allowing you to bind user journey state (defined in Dopt) to your UI.

### Installation

Via Yarn:

```
yarn add @dopt/react
```

Via NPM:

```bash
npm install @dopt/react
```

### Configuration

To configure the Dopt Provider you will need

1. A public API key
1. A user ID (user being an end-user you've identified to us)

### Usage

#### Initialization

You can initialize Dopt in your App by integrating the `<DoptProvider />` as follows:

```js
import { DoptProvider } from "@dopt/blocks-react";
import AcmeApp from "./AcmeApp";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <DoptProvider userId={userId} apiKey={apiKey}>
    <AcmeApp />
  </DoptProvider>,
  rootElement
);
```

#### Accessing Model State

Having integrated the Provider you can now access Dopt Model State from anywhere in your app (`<AcmeApp />` in this example) using our provided hook, described by the following types.

```ts
interface Block {
  active: boolean;
  started: boolean;
  finished: boolean;
}
interface Methods {
  start: () => void;
  finish: () => void;
  stop: () => void;
  exit: () => void;
}
declare const useDopt: (modelReferenceId: string) => [Block, Methods];
```

#### Example Usage

```js
import { useDopt } from "@dopt/react";

const WelcomeModal = () => {
  const [{ active }, { done, exit }] = useDopt("welcome-cf7230a");

  return (
    <Modal isOpen={active}>
      <ModalContent>
        <ModalCloseButton onClick={exit} />
        <ModalBody>
          I'm a modal whose existence/visibility is controlled by Dopt
        </ModalBody>
        <ModalFooter>
          <Button onClick={done}>Continue</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
```
