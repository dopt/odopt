# @dopt/react-checklist

## Overview

A React checklist component for building experiences with Dopt.

You can use the checklist component out of the box as a pre-built component or break out and use it headlessly with your own UI component.

[Learn more about how to use this component with Dopt →](https://docs.dopt.com/components/checklist/)

## Installation

```bash
# npm
npm install @dopt/react-checklist

# Yarn
yarn add @dopt/react-checklist

# pnpm
pnpm add @dopt/react-checklist
```

## Usage

### Pre-built component

Compose and style the checklist component to fit your needs.

```jsx
import Checklist, { useChecklist } from '@dopt/react-checklist';

function MyChecklist() {
  const checklist = useChecklist('my-flow.onboarding-checklist');

  return (
    <Checklist.Root>
      <Checklist.Header>
        <Checklist.Title>{checklist.title}</Checklist.Title>
        <Checklist.DismissIcon onClick={checklist.dismiss} />
      </Checklist.Header>
      <Checklist.Body>{checklist.body}</Checklist.Body>
      <Checklist.Progress
        value={checklist.count('done')}
        max={checklist.size}
      />
      <Checklist.Items>
        {checklist.items.map((item, i) => (
          <Checklist.Item index={i} key={i}>
            {item.completed ? (
              <Checklist.IconCheck />
            ) : item.skipped ? (
              <Checklist.IconSkip />
            ) : (
              <Checklist.IconCircle />
            )}
            <Checklist.ItemContent>
              <Checklist.ItemTitle disabled={item.done}>
                {item.title}
              </Checklist.ItemTitle>

              <Checklist.ItemBody disabled={item.done}>
                {item.body}
              </Checklist.ItemBody>

              {!item.done && (
                <Checklist.ItemCompleteButton onClick={item.complete}>
                  {item.completeLabel}
                </Checklist.ItemCompleteButton>
              )}
            </Checklist.ItemContent>
            {!item.done && <Checklist.ItemSkipIcon onClick={item.skip} />}
          </Checklist.Item>
        ))}
      </Checklist.Items>
    </Checklist.Root>
  );
}
```

### Headless

Break out completely and leverage `useChecklist` and `useChecklistItem` hooks to access checklists and checklist items headlessly.

Returned values from `useChecklist` and `useChecklistItem` implement the `Checklist` and `ChecklistItem` interfaces in [@dopt/semantic-data-layer-checklist](https://www.npmjs.com/package/@dopt/semantic-data-layer-checklist).

`Checklist` instances contain all state, data, and functions necessary to render and interact with checklists. Each instance also access for all its child `ChecklistItem` instances, and you can also access individual `ChecklistItem` instances via `useChecklistItem`. Using the individual checklist items can help perform actions on specific items like skipping or completing an item separately from rendering a checklist.

```jsx
import { useChecklist } from '@dopt/react-checklist';
import RichText from '@dopt/react-rich-text';

function MyChecklist() {
  const {
    id,
    title,
    body,
    items,
    active,
    completed,
    dismissed,
    complete,
    dismiss,
    filter,
    count,
    size,
  } = useChecklist('my-flow.onboarding-checklist');

  return (
    <div>
      <div id="states">
        <div>checklist.active: {active}</div>
        <div>checklist.completed: {completed}</div>
        <div>checklist.dismissed: {dismissed}</div>
      </div>
      <div id="actions">
        <button onClick={complete}>Complete</button>
        <button onClick={dismiss}>Dismiss</button>
      </div>
      <div id="content">
        <div>checklist.title: {title}</div>
        <div>
          checklist.body: <RichText.Root>{body}</RichText.Root>
        </div>
      </div>
      <div id="children">
        <div>
          checklist.items: {JSON.stringify(items.map((item) => item.id))}
        </div>
      </div>
      <div id="filtering">
        <div id="f-completed">{filter('completed')}</div>
        <div id="f-not-completed">{filter('not-completed')}</div>
        <div id="f-skipped">{filter('skipped')}</div>
        <div id="f-not-skipped">{filter('not-skipped')}</div>
        <div id="f-active">{filter('active')}</div>
        <div id="f-not-active">{filter('not-active')}</div>
        <div id="f-done">{filter('done')}</div>
        <div id="f-not-done">{filter('not-done')}</div>
      </div>
      <div id="counting">
        <div id="c-completed">{count('completed')}</div>
        <div id="c-not-completed">{count('not-completed')}</div>
        <div id="c-skipped">{count('skipped')}</div>
        <div id="c-not-skipped">{count('not-skipped')}</div>
        <div id="c-active">{count('active')}</div>
        <div id="c-not-active">{count('not-active')}</div>
        <div id="c-done">{count('done')}</div>
        <div id="c-not-done">{count('not-done')}</div>
      </div>
      <div id="metadata">
        <div>checklist.size: {size}</div>
      </div>
    </div>
  );
}
```

## Styling API

[Learn more about styling and theming →](https://docs.dopt.com/components/styling/)

| Name             | Selector                              | Description                                     |
| ---------------- | ------------------------------------- | ----------------------------------------------- |
| root             | `.dopt-checklist`                     | Root element                                    |
| header           | `.dopt-checklist__header`             | Header containing title, body, and dismiss icon |
| title            | `.dopt-checklist__title`              | Title heading                                   |
| body             | `.dopt-checklist__body`               | Body content                                    |
| dismissIcon      | `.dopt-checklist__dismiss-icon`       | Dismiss icon button                             |
| progress         | `.dopt-checklist__progress`           | Progress container                              |
| progressMeter    | `.dopt-checklist__progress-meter`     | Progress meter                                  |
| progressMeterBar | `.dopt-checklist__progress-meter-bar` | Progress meter bar                              |
| progressContent  | `.dopt-checklist__progress-content`   | Progress content                                |
| items            | `.dopt-checklist__items`              | Items container                                 |

### Item

| Name               | Selector                                | Description                                         |
| ------------------ | --------------------------------------- | --------------------------------------------------- |
| item               | `.dopt-checklist__item`                 | Item containing icon, content, and skip icon        |
| itemIcon           | `.dopt-checklist__item-icon`            | State icon                                          |
| itemContent        | `.dopt-checklist__item-content`         | Content containing title, body, and complete button |
| itemTitle          | `.dopt-checklist__item-title`           | Title heading                                       |
| itemBody           | `.dopt-checklist__item-body`            | Body content                                        |
| itemCompleteButton | `.dopt-checklist__item-complete-button` | Complete button                                     |
| itemSkipIcon       | `.dopt-checklist__item-skip-icon`       | Skip icon button                                    |

### Item unique

| Name | Selector                        | Description                   |
| ---- | ------------------------------- | ----------------------------- |
| item | `.dopt-checklist__item--$index` | Item by index (starting at 1) |
| item | `[data-item-id="$id"]`          | Item by identifier            |

### Item state

| Name      | Selector                           | Description    |
| --------- | ---------------------------------- | -------------- |
| active    | `.dopt-checklist__item--active`    | Active item    |
| completed | `.dopt-checklist__item--completed` | Completed item |
