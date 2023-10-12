# @dopt/react-checklist

## Overview

A React checklist component for building experiences with Dopt.

You can use the checklist component out of the box as a pre-built component or break out and use it headlessly with your own UI component.

[Learn more about how to use this component with Dopt →](https://docs.dopt.com/components/react/checklist/)

## Installation

ℹ️ **If you are using a particular React framework like [Next.js](https://docs.dopt.com/components/react/frameworks/nextjs/), please check out our [framework specific docs](https://docs.dopt.com/components/react/frameworks/).**

```bash
# npm
npm install @dopt/react-checklist

# Yarn
yarn add @dopt/react-checklist

# pnpm
pnpm add @dopt/react-checklist
```

## Usage

The default export from `@dopt/react-checklist` is a collection of components that you can use to structure and compose a checklist.

```jsx
import Checklist, { useChecklist } from '@dopt/react-checklist';

function MyChecklist() {
  const checklist = useChecklist('checklist.pink-crews-clap');

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
          <Checklist.Item key={i}>
            <Checklist.ItemIcon>
              {item.completed ? (
                <Checklist.IconCompleted />
              ) : item.skipped ? (
                <Checklist.IconSkipped />
              ) : (
                <Checklist.IconActive />
              )}
            </Checklist.ItemIcon>
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

Check out our [checklist example](https://www.dopt.com/examples/checklist) and our [headless checklist example](https://www.dopt.com/examples/checklist-custom) for more in-depth usage.

## Props

### Root

The root element of the checklist. Extends `HTMLElement`.

| Name      | Type                                                                     | Description                                   |
| --------- | ------------------------------------------------------------------------ | --------------------------------------------- |
| children? | ReactNode                                                                | The contents of the component                 |
| theme?    | [Theme](https://docs.dopt.com/components/react/styling/#theme-interface) | A theme definition to attach to the component |

### Header

The header of the checklist. Extends `HTMLElement`.

| Name      | Type                                                                     | Description                                   |
| --------- | ------------------------------------------------------------------------ | --------------------------------------------- |
| children? | ReactNode                                                                | The contents of the component                 |
| theme?    | [Theme](https://docs.dopt.com/components/react/styling/#theme-interface) | A theme definition to attach to the component |

### Title

The title of the checklist. Extends `HTMLHeadingElement`.

| Name      | Type                                                                     | Description                                   |
| --------- | ------------------------------------------------------------------------ | --------------------------------------------- |
| children? | ReactNode                                                                | The contents of the component                 |
| theme?    | [Theme](https://docs.dopt.com/components/react/styling/#theme-interface) | A theme definition to attach to the component |

### DismissIcon

The dismiss icon of the checklist. Extends `HTMLButtonElement`.

| Name   | Type                                                                     | Description                                   |
| ------ | ------------------------------------------------------------------------ | --------------------------------------------- |
| theme? | [Theme](https://docs.dopt.com/components/react/styling/#theme-interface) | A theme definition to attach to the component |

### Body

The body of the tour item popover. Extends `HTMLDivElement`.

| Name      | Type                                                                     | Description                                   |
| --------- | ------------------------------------------------------------------------ | --------------------------------------------- |
| children? | [RichText](https://docs.dopt.com/components/rich-text/#richtext-1)       | The rich text contents of the component       |
| theme?    | [Theme](https://docs.dopt.com/components/react/styling/#theme-interface) | A theme definition to attach to the component |

### Progress

The progress meter of the checklist. Extends `HTMLDivElement`.

| Name   | Type                                                                     | Description                                        |
| ------ | ------------------------------------------------------------------------ | -------------------------------------------------- |
| max    | number                                                                   | The maximum number of items that can be progressed |
| theme? | [Theme](https://docs.dopt.com/components/react/styling/#theme-interface) | A theme definition to attach to the component      |
| value  | number                                                                   | The current number of items progressed             |

### Items

The items of the checklist. Extends `HTMLUListElement`.

| Name      | Type                                                                     | Description                                   |
| --------- | ------------------------------------------------------------------------ | --------------------------------------------- |
| children? | ReactNode                                                                | The contents of the component                 |
| theme?    | [Theme](https://docs.dopt.com/components/react/styling/#theme-interface) | A theme definition to attach to the component |

### Item

A checklist item. Extends `HTMLLIElement`.

| Name      | Type                                                                     | Description                                   |
| --------- | ------------------------------------------------------------------------ | --------------------------------------------- |
| children? | ReactNode                                                                | The contents of the component                 |
| index?    | number                                                                   | The index of the item                         |
| theme?    | [Theme](https://docs.dopt.com/components/react/styling/#theme-interface) | A theme definition to attach to the component |

### ItemIcon

The icon of a checklist item. Extends `HTMLDivElement`.

| Name      | Type                                                                     | Description                                   |
| --------- | ------------------------------------------------------------------------ | --------------------------------------------- |
| children? | ReactNode                                                                | The contents of the component                 |
| theme?    | [Theme](https://docs.dopt.com/components/react/styling/#theme-interface) | A theme definition to attach to the component |

### IconActive

The active icon. Extends `SVGSVGElement`.

### IconCompleted

The completed icon. Extends `SVGSVGElement`.

### IconSkipped

The skipped icon. Extends `SVGSVGElement`.

### ItemContent

The content of a checklist item. Extends `HTMLDivElement`.

| Name      | Type                                                                     | Description                                   |
| --------- | ------------------------------------------------------------------------ | --------------------------------------------- |
| children? | ReactNode                                                                | The contents of the component                 |
| theme?    | [Theme](https://docs.dopt.com/components/react/styling/#theme-interface) | A theme definition to attach to the component |

### ItemTitle

The title of a checklist item. Extends `HTMLDivElement`.

| Name      | Type                                                                     | Description                                   |
| --------- | ------------------------------------------------------------------------ | --------------------------------------------- |
| children? | ReactNode                                                                | The contents of the component                 |
| theme?    | [Theme](https://docs.dopt.com/components/react/styling/#theme-interface) | A theme definition to attach to the component |

### ItemBody

The body of a checklist item. Extends `HTMLDivElement`.

| Name      | Type                                                                     | Description                                                   |
| --------- | ------------------------------------------------------------------------ | ------------------------------------------------------------- |
| children? | [RichText](https://docs.dopt.com/components/react/rich-text/#richtext-1) | The rich text contents of the component                       |
| theme?    | [Theme](https://docs.dopt.com/components/react/styling/#theme-interface) | A theme definition to attach to the component                 |
| disabled? | boolean                                                                  | Determines if the body is show as disabled (default: `false`) |

### CompleteButton

The complete button of a checklist item. Extends `HTMLButtonElement`.

| Name      | Type                                                                     | Description                                   |
| --------- | ------------------------------------------------------------------------ | --------------------------------------------- |
| children? | ReactNode                                                                | The contents of the component                 |
| theme?    | [Theme](https://docs.dopt.com/components/react/styling/#theme-interface) | A theme definition to attach to the component |

### SkipIcon

The skip icon of a checklist item. Extends `HTMLButtonElement`.

| Name   | Type                                                                     | Description                                   |
| ------ | ------------------------------------------------------------------------ | --------------------------------------------- |
| theme? | [Theme](https://docs.dopt.com/components/react/styling/#theme-interface) | A theme definition to attach to the component |

## Hooks

If you are planning to only use the checklist headlessly, you can import the hooks alone using `@dopt/react-checklist/hooks`.

### useChecklist

- **useChecklist**(`id`: string): [Checklist](#checklist)

A React hook for managing a checklist's state and content.

```tsx
import { useChecklist } from '@dopt/react-checklist';
import RichText from '@dopt/react-rich-text';

export function MyChecklist() {
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
  } = useChecklist('onboarding-checklist.checklist-component');

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

### useChecklistItem

- **useChecklistItem**(`id`: string): [ChecklistItem](#checklistitem)

A React hook for managing a checklist item's state and content.

```tsx
import { useChecklistItem } from '@dopt/react-checklist';
import RichText from '@dopt/react-rich-text';

export function MyChecklistItem() {
  const {
    id,
    index,
    title,
    body,
    completeLabel,
    done,
    active,
    skipped,
    completed,
    complete,
    skip,
  } = useChecklistItem("onboarding-checklist.item-1");

  return (
    <div>
      <div id="states">
        <div>checklistItem.active: {active}</div>
        <div>checklistItem.skipped: {skipped}</div>
        <div>checklistItem.completed: {completed}</div>
        <div>checklistItem.done: {done}</div>
      </div>
      <div id="actions">
        <button onClick={complete}>{completeLabel}</button>
        <button onClick={skip}>Skip</button>
      </div>
      <div id="content">
        <div>checklistItem.title: {title}</div>
        <div>checklistItem.body: <RichText.Root>{body}</RichText.Root></div>
        <div>checklistItem.completeLabel: {completeLabel}</div>
      </div>
      <div id="metadata">
        <div>checklistItem.index: {checklistItem.index}</div>
      </div>
    <div>
  )
}
```

## Styling API

[Learn more about styling and theming →](https://docs.dopt.com/components/react/styling/)

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
| item               | `.dopt-checklist__item--$index`         | Item by index (starting at 1)                       |
| itemIcon           | `.dopt-checklist__item-icon`            | State icon                                          |
| itemContent        | `.dopt-checklist__item-content`         | Content containing title, body, and complete button |
| itemTitle          | `.dopt-checklist__item-title`           | Title heading                                       |
| itemBody           | `.dopt-checklist__item-body`            | Body content                                        |
| itemCompleteButton | `.dopt-checklist__item-complete-button` | Complete button                                     |
| itemSkipIcon       | `.dopt-checklist__item-skip-icon`       | Skip icon button                                    |

### Icon

| Name      | Selector                          | Description    |
| --------- | --------------------------------- | -------------- |
| icon      | `.dopt-checklist__icon`           | Icon element   |
| active    | `.dopt-checklist__icon-active`    | Active icon    |
| completed | `.dopt-checklist__icon-completed` | Completed icon |
| skipped   | `.dopt-checklist__icon-skipped`   | Skipped icon   |

## Types

### Checklist

A stateful container for checklist items.

```ts
interface Checklist {
  id: string;

  title: string | null | undefined;
  body: RichText | null | undefined;

  items: ChecklistItem[];

  active: boolean;

  completed: boolean;
  dismissed: boolean;

  complete: () => void;
  dismiss: () => void;

  size: number;

  filter(on: FilterableField): ChecklistItem[];
  count(where: CountableField): number;
}
```

### ChecklistItem

A child of the Checklist. Includes state accessors and methods for updating state along with content configured in Dopt.

```ts
interface ChecklistItem {
  id: string;

  index: number | null | undefined;

  title: string | null | undefined;
  body: RichText | null | undefined;

  completeLabel: string | null | undefined;

  done: boolean;

  active: boolean;

  skipped: boolean;
  completed: boolean;

  complete: () => void;
  skip: () => void;
}
```

### FilterableField

```ts
type FilterableField =
  | 'completed'
  | 'not-completed'
  | 'skipped'
  | 'not-skipped'
  | 'active'
  | 'not-active'
  | 'done'
  | 'not-done';
```

### CountableField

```ts
type CountableField = FilterableField;
```
