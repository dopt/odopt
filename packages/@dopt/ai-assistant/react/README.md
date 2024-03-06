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

- [useAssistant](./src/use-assistant.ts)

````ts
/**
 * A React hook for accessing an AI assistant
 *
 * @example
 * ```tsx
 * import { useAssistant } from '@dopt/ai-assistant-react';
 *
 * export function Application() {
 *   const assistant = useAssistant("HNWvcT78tyTwygnbzU6SW", { query, context });
 * }
 * ```
 *
 * @param sid - {@link Assistant['sid']}
 * @param query - string, the query to be passed to the assistant
 * @param context.document - boolean, whether to use page level context like title and URL (default false)
 * @param context.element - the element the user is interacting with (default undefined)
 * @param context.visual - boolean, whether to use a screenshot of the page (default false)
 * this param accepts the user defined identifier (sid)
 * @param errorMessage - string, an optional Markdown-friendly error message in case the assistant fails to load
 * a system default is used otherwise
 *
 * @returns an object of: `answer`, `content`, `status`, and `documents`
 * Each value in the object maps to the current state of the assistant.
 * As the answer streams back, `content` will be updated.
 * Once the answer is completed, `answer` and `documents` will be updated.
 * `status` reflects either `searching` or `answering` depending on the state of the stream.
 */
declare function useAssistant(
  sid: string,
  {
    query,
    context: { document, element, visual },
  }: {
    query: AssistantCompletionsRequestBody['query'];
    context: {
      document?: boolean;
      element?: Element;
      visual?: boolean;
    };
  },
  {
    errorMessage,
  }: {
    errorMessage?: string;
  }
): {
  answer: string | null;
  content: string | null;
  documents:
    | {
        title: string;
        url: string;
        id: number;
        chunks: {
          text: string;
          chunkId: number;
          score: number;
        }[];
      }[]
    | null;
  status: 'searching' | 'answering' | null;
};
````

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
