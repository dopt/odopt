# @dopt/ai-assistant-javascript

## Overview

The AI Assistant JavaScript package is a thin abstraction on top of [`@dopt/ai-javascript-client`](https://www.npmjs.com/package/@dopt/ai-javascript-client) that helps with context formation.

It is published to npm as [`@dopt/ai-assistant-javascript`](https://www.npmjs.com/package/@dopt/ai-assistant-javascript).

## Installation

Via npm:

```bash
npm install @dopt/ai-assistant-javascript
```

Via Yarn:

```bash
yarn add @dopt/ai-assistant-javascript
```

Via pnpm:

```bash
pnpm add @dopt/ai-assistant-javascript
```

## Configuration

To configure the Dopt provider you will need:

1. An AI API key (generated in Dopt)
1. The Assistant identifier
1. A user identifier (user being an end-user you've identified to Dopt)

## Usage

### Initialization

```ts
import { Assistant } from '@dopt/ai-assistant-javascript';

const assistant = new Assistant({
  apiKey: process.env.DOPT_AI_API_KEY as string,
  userId,
});
```

### Context

The AI Assistant API provides context-dependent completions, where context is information gathered from the web page the user is on.

The following types outline the context the API expects.

```ts
type DocumentContext = {
  type: 'document';
  value: {
    url: string;
    title: string;
    width: number;
    height: number;
  };
};

type ElementContext = {
  type: 'element';
  value: {
    position: {
      top: number;
      left: number;
    };
    content: string;
    tag: string;
  };
};

type VisualContext = {
  type: 'visual';
  value: string;
};

type SemanticContext = {
  type: 'semantic';
  value: {
    semanticContent: string;
    neighboringSemanticContent: string;
  };
};
```

Creating this context manually is onerous, so we've simplified context creation in this package. See #Completions below for usage.

### Completions

Stream completions for an Assistant

```ts
export interface AssistantContext {
  document?: boolean | DocumentContext['value'];
  element?: Element | ElementContext['value'];
  semantic?: boolean | SemanticContext['value'];
  visual?: boolean | VisualContext['value'];
}

const context: AssistantContext = {
  document: true,
  element, // An HTML element
  semantic: true,
  visual: true,
};

const events = await assistant.completions.stream(sid, {
  query: 'Some question?',
  context,
});

let content = '';
for await (const event of events) {
  switch (event.type) {
    case 'status':
      console.log(event.status);
      break;
    case 'answer':
      console.log(event.answer);
      break;
    case 'content':
      content += event.content;
      console.log(content);
      break;
  }
}
```
