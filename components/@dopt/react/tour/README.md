# @dopt/react-tour

## Overview

A React tour component for building experiences with Dopt.

You can use the tour component out of the box as a pre-built component or break out and use it headlessly with your own UI component.

[Learn more about how to use this component with Dopt →](https://docs.dopt.com/components/tour/)

## Installation

```bash
# npm
npm install @dopt/react-tour

# Yarn
yarn add @dopt/react-tour

# pnpm
pnpm add @dopt/react-tour
```

## Usage

### Pre-built component

Compose and style the tour component to fit your needs.

```jsx
import Tour, { useTourItem } from '@dopt/react-tour';

function MyTourStep() {
  const tourStep = useTourItem('my-flow.first-tour-step');

  return (
    <Tour.Root active={tourStep.active}>
      <Tour.Anchor>
        <button>ANCHOR #1</button>
      </Tour.Anchor>
      <Tour.Popover position="bottom">
        <Tour.Content>
          <Tour.Header>
            <Tour.Title>{tourStep.title}</Tour.Title>
            <Tour.DismissIcon onClick={tourStep.tour.dismiss} />
          </Tour.Header>
          <Tour.Body>{tourStep.body}</Tour.Body>
          <Tour.Footer>
            <Tour.BackButton>{tourStep.backLabel}</Tour.BackButton>
            <Tour.NextButton onClick={tourStep.next}>
              {tourStep.nextLabel}
            </Tour.NextButton>
          </Tour.Footer>
          <Tour.Progress
            count={tourStep.tour.size}
            index={tourStep.index || 0}
          />
        </Tour.Content>
      </Tour.Popover>
    </Tour.Root>
  );
}
```

### Headless

Break out completely and leverage `useTourItem` and `useTour` hooks to access tour items and tours headlessly.

Returned values from `useTourItem` and `useTour` implement the `TourItem` and `Tour` interfaces in [@dopt/semantic-data-layer-tour](https://www.npmjs.com/package/@dopt/semantic-data-layer-tour).

`TourItem` instances contain all state, data, and functions necessary to render and interact with tour steps. Each instance also has a reference to its parent `Tour`, and you can also access parent `Tour` instances via `useTour`. Using the parent can help perform actions on multiple items like dismissing the entire tour.

```jsx
import { useTourItem } from '@dopt/react-tour';
import RichText from '@dopt/react-rich-text';

function MyTourStep() {
  const {
    id,
    tour,
    index,
    title,
    body,
    nextLabel,
    backLabel,
    active,
    completed,
    next,
    back,
  } = useTourItem('my-flow.first-tour-step');

  return (
    <div>
      <div id="states">
        <div>tourItem.active: {active}</div>
        <div>tourItem.completed: {completed}</div>
      </div>
      <div id="actions">
        <button onClick={next}>{nextLabel}</button>
        <button onClick={back}>{backLabel}</button>
      </div>
      <div id="content">
        <div>tourItem.title: {title}</div>
        <div>
          tourItem.body: <RichText.Root>{body}</RichText.Root>
        </div>
        <div>tourItem.nextLabel: {nextLabel}</div>
        <div>tourItem.backLabel: {backLabel}</div>
      </div>
      <div id="parent">
        <div>tourItem.tour: {JSON.stringify(tour)}</div>
      </div>
      <div id="metadata">
        <div>tourItem.index: {tourItem.index}</div>
      </div>
    </div>
  );
}
```

## Styling API

[Learn more about styling and theming →](https://docs.dopt.com/components/styling/)

| Name         | Selector                         | Description                              |
| ------------ | -------------------------------- | ---------------------------------------- |
| popover      | `.dopt-tour-item`                | Popover element                          |
| content      | `.dopt-tour-item__content`       | Content container                        |
| header       | `.dopt-tour-item__header`        | Header containing title and dismiss icon |
| title        | `.dopt-tour-item__title`         | Title heading                            |
| dismissIcon  | `.dopt-tour-item__dismiss-icon`  | Disiss icon button                       |
| body         | `.dopt-tour-item__body`          | Body content                             |
| footer       | `.dopt-tour-item__footer`        | Footer containing back and next buttons  |
| backButton   | `.dopt-tour-item__back-button`   | Back button                              |
| nextButton   | `.dopt-tour-item__next-button`   | Next button                              |
| progress     | `.dopt-tour-item__progress`      | Progress indicators                      |
| progressItem | `.dopt-tour-item-progress__item` | Progress indicator item                  |

### Popover position

| Name   | Selector                   | Description       |
| ------ | -------------------------- | ----------------- |
| top    | `.dopt-tour-item--top`     | Positioned top    |
| top    | `[data-position="top"]`    | Positioned top    |
| right  | `.dopt-tour-item--right`   | Positioned right  |
| right  | `[data-position="right"]`  | Positioned right  |
| bottom | `.dopt-tour-item--bottom`  | Positioned bottom |
| bottom | `[data-position="bottom"]` | Positioned bottom |
| left   | `.dopt-tour-item--left`    | Positioned left   |
| left   | `[data-position="left"]`   | Positioned left   |

### Popover alignment

| Name   | Selector                    | Description    |
| ------ | --------------------------- | -------------- |
| start  | `.dopt-tour-item--start`    | Aligned start  |
| start  | `[data-alignment="start"]`  | Aligned start  |
| center | `.dopt-tour-item--center`   | Aligned center |
| center | `[data-alignment="center"]` | Aligned center |
| end    | `.dopt-tour-item--end`      | Aligned end    |
| end    | `[data-alignment="end"]`    | Aligned end    |

### Progress item state

| Name   | Selector                                 | Description          |
| ------ | ---------------------------------------- | -------------------- |
| active | `.dopt-tour-item-progress__item--active` | Active progress item |
