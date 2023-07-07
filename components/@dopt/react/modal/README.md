# @dopt/react-modal

## Overview

A React modal component for building experiences with Dopt.

You can use the modal component out of the box as a pre-built component or break out and use it headlessly with your own UI component.

[Learn more about how to use this component with Dopt →](https://docs.dopt.com/components/modal/)

## Installation

```bash
# npm
npm install @dopt/react-modal

# Yarn
yarn add @dopt/react-modal

# pnpm
pnpm add @dopt/react-modal
```

## Usage

### Pre-built component

Compose and style the modal component to fit your needs.

```jsx
import Modal, { useModal } from '@dopt/react-modal';

function MyModal() {
  const modal = useModal('my-flow.four-pandas-jam');

  return (
    <Modal.Root active={modal.active}>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>{modal.title}</Modal.Title>
          <Modal.DismissIcon onClick={modal.dismiss} />
        </Modal.Header>
        <Modal.Body>{modal.body}</Modal.Body>
        <Modal.Footer>
          <Modal.DismissButton onClick={modal.dismiss}>
            {modal.dismissLabel}
          </Modal.DismissButton>
          <Modal.CompleteButton onClick={modal.complete}>
            {modal.completeLabel}
          </Modal.CompleteButton>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
}
```

### Headless

Break out completely and leverage `useModal` to access the modal headlessly.
Returned values from `useModal` implement the `Modal` interface in [@dopt/semantic-data-layer-modal](https://www.npmjs.com/package/@dopt/semantic-data-layer-modal).

```jsx
import { useModal } from '@dopt/react-modal';
import RichText from '@dopt/react-rich-text';

function MyModal() {
  const {
    id,
    title,
    body,
    completeLabel,
    dismissLabel,
    active,
    completed,
    dismissed,
    complete,
    dismiss,
  } = useModal('my-flow.four-pandas-jam');

  return (
    <div>
      <div id="states">
        <div>modal.active: {active}</div>
        <div>modal.completed: {completed}</div>
        <div>modal.dismissed: {dismissed}</div>
      </div>
      <div id="actions">
        <button onClick={complete}>{completeLabel}</button>
        <button onClick={dismiss}>{dismissLabel}</button>
      </div>
      <div id="content">
        <div>modal.title: {title}</div>
        <div>
          modal.body: <RichText.Root>{body}</RichText.Root>
        </div>
        <div>modal.completeLabel: {completeLabel}</div>
        <div>modal.dismissLabel: {dismissLabel}</div>
      </div>
    </div>
  );
}
```

## Styling API

[Learn more about styling and theming →](https://docs.dopt.com/components/styling/)

| Name           | Selector                       | Description                                    |
| -------------- | ------------------------------ | ---------------------------------------------- |
| root           | `.dopt-modal`                  | Root element                                   |
| overlay        | `.dopt-modal__overlay`         | Overlay shown underneath content               |
| content        | `.dopt-modal__content`         | Content container                              |
| header         | `.dopt-modal__header`          | Header containing title and dismiss icon       |
| title          | `.dopt-modal__title`           | Title heading                                  |
| dismissIcon    | `.dopt-modal__dismiss-icon`    | Dismiss icon button                            |
| body           | `.dopt-modal__body`            | Body content                                   |
| footer         | `.dopt-modal__footer`          | Footer containing dismiss and complete buttons |
| dismissButton  | `.dopt-modal__dismiss-button`  | Dismiss button                                 |
| completeButton | `.dopt-modal__complete-button` | Complete button                                |
