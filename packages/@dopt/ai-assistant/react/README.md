# Dopt AI Assistant React SDK

## Overview

The Dopt AI Assistant React SDK is a framework-specific client for accessing Dopt's AI API, allowing you to bind user flow state defined in Dopt to your UI to build onboarding and engagement flows.

The SDK lives in our open-source monorepo [odopt](https://github.com/dopt/odopt).

It is published to npm as [`@dopt/ai-assistant-react`](https://www.npmjs.com/package/@dopt/ai-assistant-react).

## Installation

Via npm:

```bash
npm install @dopt/ai-assistant-react
```

Via Yarn:

```bash
yarn add @dopt/ai-assistant-react
```

Via pnpm:

```bash
pnpm add @dopt/ai-assistant-react
```

## Configuration

To configure the Dopt provider you will need:

1. A AI API key (generated in Dopt)
1. A user identifier (user being an end-user you've identified to Dopt)

## Usage

### Initialization

You can initialize Dopt in your app by integrating the `<DoptAiProvider />` as follows:

```js
import { DoptAiProvider } from '@dopt/ai-assistant-react';
import Application from './application';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <DoptAiProvider userId={userId} apiKey={aiApiKey}>
    <Application />
  </DoptAiProvider>,
  rootElement
);
```

### Hooks

- [useAssitant](./src/use-assistant.ts)

```ts
interface AssistantProps {
  query: string | undefined;
  context: AssistantContextProps;
}

declare const useAssistant: (sid: string, { query, context }: AssistantProps): {
  answer: string | null;
  content: string | null;
  documents: {
    title: string;
    url: string;
    id: number;
  }[] | null;
  status: "searching" | "summarizing" | "answering" | "citing" | null;
};
```

### Example usage

#### Accessing an AI Assistant

Using the [useAssitant](./src/use-assistant.ts) hook:

```tsx
import { useAssistant } from '@dopt/ai-assistant-react';
import { Modal } from '@your-company/modal';

export function Application() {
  const assistant = useAssistant('dopt-assistant', {
    query,
    context
  });

  return (
    <Modal>
      <div className='ai-assistant-content'>
        {assistant.content}
      <div>
      <div className='ai-assistant-documents'>
        {assistant.documents}
      <div>
    </Modal>
  );
}
```

## Feedback

Looking to provide feedback or report a bug? [Open an issue](https://github.com/dopt/odopt/issues/new?title=[@dopt/ai-assistant-react]%20) or contact us at [support@dopt.com](mailto:support@dopt.com).

## Contributing

All contributions are welcome! Feel free to open a [pull request](https://github.com/dopt/odopt/compare).
