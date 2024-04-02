# @dopt/react-contextual-help-hub

## Overview

## Installation

ℹ️ **If you are using a particular React framework like [Next.js](https://docs.dopt.com/components/react/frameworks/nextjs/), please check out our [framework specific docs](https://docs.dopt.com/components/react/frameworks/).**

```bash
# npm
npm install @dopt/react-help-hub

# Yarn
yarn add @dopt/react-help-hub

# pnpm
pnpm add @dopt/react-help-hub
```

## Usage

The default export from `@dopt/react-help-hub` is a collection of components that you can use to structure and compose a hints item.

```jsx
import HelpHub, { useHelpHub } from '@dopt/react-help-hub';

function MyHelpHubsStep({ children }) {
  const helpHub = useHelpHub('assistant-sid');

  if (!helpHub) {
    return children;
  }

  return (
    <HelpHub.Root active={hintItem.active}>
      <HelpHub.Activator>
        <button style={{ position: 'relative' }}>
          <HelpHub.Indicator
            onClick={() => helpHub.setOpen(!hintItem.open)}
            style={{
              bottom: -8,
              right: -8,
            }}
          />
        </button>
      </HelpHub.Activator>
      <HelpHub.Popover position="bottom" open={hintItem.open}>
        <HelpHub.Content>
          <HelpHub.Header>
            <HelpHub.Title>{hintItem.title}</HelpHub.Title>
            <HelpHub.CloseIcon onClick={() => hintItem.setOpen(false)} />
          </HelpHub.Header>
          <HelpHub.Body>{hintItem.body}</HelpHub.Body>
          <HelpHub.Footer>
            <HelpHub.CompleteButton onClick={hintItem.complete}>
              {hintItem.completeLabel}
            </HelpHub.CompleteButton>
            <HelpHub.DismissAllButton>
              {hintItem.dismissAllLabel}
            </HelpHub.DismissAllButton>
          </HelpHub.Footer>
        </HelpHub.Content>
      </HelpHub.Popover>
    </HelpHub.Root>
  );
}
```
