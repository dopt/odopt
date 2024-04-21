# Dopt AI Assistant React SDK

## Overview

The Dopt AI Assistant React SDK is a React framework-specific client for accessing Dopt's AI API. This SDK is a thin abstraction on top of [`@dopt/ai-assistant-javascript`](https://www.npmjs.com/package/@dopt/ai-assistant-javascript) and is useful mainly for wrapping asynchronous and streaming javascript functions into meaningful React hooks.

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

- [useAssistant](./src/use-assistant.ts)

A hook for getting complete answers (and citations, if any) from an assistant given a `query` and / or `context`. This hook wraps the streaming API into a stateful abstraction which will be updated as more results are streamed from the AI API.

- [useSearch](./src/use-search.ts)

A hook for getting search results (a list of documents) from an assistant given a `query` and / or `context`. This hook wraps an async fetch request into a stateful abstraction which will be completed once the documents are returned from the search.

### Example usage

#### Accessing an AI Assistant

Using the [useAssistant](./src/use-assistant.ts) hook:

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
