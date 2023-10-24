# @dopt/react-hints

## Overview

A React hints component for building experiences with Dopt.

You can use the hints component out of the box as a pre-built component or break out and use it headlessly with your own UI component.

[Learn more about how to use this component with Dopt →](https://docs.dopt.com/components/hints/)

## Installation

ℹ️ **If you are using a particular React framework like [Next.js](https://docs.dopt.com/components/react/frameworks/nextjs/), please check out our [framework specific docs](https://docs.dopt.com/components/react/frameworks/).**

```bash
# npm
npm install @dopt/react-hints

# Yarn
yarn add @dopt/react-hints

# pnpm
pnpm add @dopt/react-hints
```

## Usage

The default export from `@dopt/react-hints` is a collection of components that you can use to structure and compose a hints item.

```jsx
import HintsItem, { useHintsItem } from '@dopt/react-hints';

function MyHintsStep({ children }) {
  const hintsItem = useHintsItem('hints.shaggy-horses-sniff');

  if (!hintsItem) {
    return children;
  }

  return (
    <HintsItem.Root active={hintsItem.active}>
      <HintsItem.Anchor>{children}</HintsItem.Anchor>
      <HintsItem.Popover>
        <HintsItem.Content>
          <HintsItem.Header>
            <HintsItem.Title>{hintsItem.title}</HintsItem.Title>
            <HintsItem.DismissIcon onClick={hintsItem.hints?.dismiss} />
          </HintsItem.Header>
          <HintsItem.Body>{hintsItem.body}</HintsItem.Body>
          <HintsItem.Footer>
            <HintsItem.BackButton>{hintsItem.backLabel}</HintsItem.BackButton>
            <HintsItem.NextButton onClick={hintsItem.next}>
              {hintsItem.nextLabel}
            </HintsItem.NextButton>
          </HintsItem.Footer>
          <HintsItem.Progress
            count={hintsItem.hints?.size || 1}
            index={hintsItem.index}
          />
        </HintsItem.Content>
      </HintsItem.Popover>
    </HintsItem.Root>
  );
}
```

Check out our [hints example](https://www.dopt.com/examples/hints) and our [headless hints example](https://www.dopt.com/examples/hints-custom) for more in-depth usage.

## Props

### Root

The root element of the hints item.

| Name      | Type                                                                     | Description                                                   |
| --------- | ------------------------------------------------------------------------ | ------------------------------------------------------------- |
| active?   | boolean                                                                  | Determines the visibility of the component (default: `false`) |
| children? | ReactNode                                                                | The contents of the component                                 |
| theme?    | [Theme](https://docs.dopt.com/components/react/styling/#theme-interface) | A theme definition to attach to the component                 |

### Anchor

The element to anchor the hints item to.

| Name     | Type         | Description                  |
| -------- | ------------ | ---------------------------- |
| children | ReactElement | A React element to anchor to |

### Popover

The hints item popover. Extends `HTMLDivElement`.

| Name       | Type                                                                     | Description                                                                                   |
| ---------- | ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| alignment? | [Alignment](#alignment)                                                  | Determines how the component should align relative to the anchor element (default: `center`)  |
| children?  | ReactNode                                                                | The contents of the component                                                                 |
| offset?    | number                                                                   | The distance in `px` to position the component relative to the anchor element (default: `10`) |
| position?  | [Side](#side)                                                            | The side that the component should position relative to the anchor element (default: `top`)   |
| theme?     | [Theme](https://docs.dopt.com/components/react/styling/#theme-interface) | A theme definition to attach to the component                                                 |

### Content

The content of the hints item popover. Extends `HTMLDivElement`.

| Name      | Type                                                                     | Description                                   |
| --------- | ------------------------------------------------------------------------ | --------------------------------------------- |
| children? | ReactNode                                                                | The contents of the component                 |
| theme?    | [Theme](https://docs.dopt.com/components/react/styling/#theme-interface) | A theme definition to attach to the component |

### Header

The header of the hints item popover. Extends `HTMLElement`.

| Name      | Type                                                                     | Description                                   |
| --------- | ------------------------------------------------------------------------ | --------------------------------------------- |
| children? | ReactNode                                                                | The contents of the component                 |
| theme?    | [Theme](https://docs.dopt.com/components/react/styling/#theme-interface) | A theme definition to attach to the component |

### Title

The title of the hints item popover. Extends `HTMLHeadingElement`.

| Name      | Type                                                                     | Description                                   |
| --------- | ------------------------------------------------------------------------ | --------------------------------------------- |
| children? | ReactNode                                                                | The contents of the component                 |
| theme?    | [Theme](https://docs.dopt.com/components/react/styling/#theme-interface) | A theme definition to attach to the component |

### Content

The content of the hints item popover. Extends `HTMLDivElement`.

| Name      | Type                                                                     | Description                                   |
| --------- | ------------------------------------------------------------------------ | --------------------------------------------- |
| children? | ReactNode                                                                | The contents of the component                 |
| theme?    | [Theme](https://docs.dopt.com/components/react/styling/#theme-interface) | A theme definition to attach to the component |

### DismissIcon

The dismiss icon of the hints item popover. Extends `HTMLButtonElement`.

| Name   | Type                                                                     | Description                                   |
| ------ | ------------------------------------------------------------------------ | --------------------------------------------- |
| theme? | [Theme](https://docs.dopt.com/components/react/styling/#theme-interface) | A theme definition to attach to the component |

### Body

The body of the hints item popover. Extends `HTMLDivElement`.

| Name      | Type                                                                     | Description                                   |
| --------- | ------------------------------------------------------------------------ | --------------------------------------------- |
| children? | [RichText](https://docs.dopt.com/components/react/rich-text/#richtext-1) | The rich text contents of the component       |
| theme?    | [Theme](https://docs.dopt.com/components/react/styling/#theme-interface) | A theme definition to attach to the component |

### Footer

The footer of the hints item popover. Extends `HTMLElement`.

| Name      | Type                                                                     | Description                                   |
| --------- | ------------------------------------------------------------------------ | --------------------------------------------- |
| children? | ReactNode                                                                | The contents of the component                 |
| theme?    | [Theme](https://docs.dopt.com/components/react/styling/#theme-interface) | A theme definition to attach to the component |

### NextButton

The next button of the hints item popover. Extends `HTMLButtonElement`.

| Name      | Type                                                                     | Description                                   |
| --------- | ------------------------------------------------------------------------ | --------------------------------------------- |
| children? | ReactNode                                                                | The contents of the component                 |
| theme?    | [Theme](https://docs.dopt.com/components/react/styling/#theme-interface) | A theme definition to attach to the component |

### BackButton

The back button of the hints item popover. Extends `HTMLButtonElement`.

| Name      | Type                                                                     | Description                                   |
| --------- | ------------------------------------------------------------------------ | --------------------------------------------- |
| children? | ReactNode                                                                | The contents of the component                 |
| theme?    | [Theme](https://docs.dopt.com/components/react/styling/#theme-interface) | A theme definition to attach to the component |

### Progress

The progress indicators of the hints item popover. Extends `HTMLOListElement`.

| Name   | Type                                                                     | Description                                   |
| ------ | ------------------------------------------------------------------------ | --------------------------------------------- |
| count  | number                                                                   | The total count of items                      |
| index  | number                                                                   | The current item index                        |
| theme? | [Theme](https://docs.dopt.com/components/react/styling/#theme-interface) | A theme definition to attach to the component |

## Hooks

If you are planning to only use the hints headlessly, you can import the hooks alone using `@dopt/react-hints/hooks`.

### useHints

- **useHints**(`id`: string): [Hints](#hints)

A React hook for accessing and updating a Hints's state.

```tsx
import { useHints } from '@dopt/react-hints';

export function MyHintsStep() {
  const {
    id,
    items,
    active,
    completed,
    dismissed,
    complete,
    dismiss,
    filter,
    count,
    size,
  } = useHints('onboarding-hints.hints-component');

  return (
    <div>
      <div id="states">
        <div>hints.active: {active}</div>
        <div>hints.completed: {completed}</div>
        <div>hints.dismissed: {dismissed}</div>
      </div>
      <div id="actions">
        <button onClick={complete}>Complete</button>
        <button onClick={dismiss}>Dismiss</button>
      </div>
      <div id="children">
        <div>hints.items: {JSON.stringify(items.map((item) => item.id))}</div>
      </div>
      <div id="filtering">
        <div id="active-items">{JSON.stringify(filter('active'))}</div>
        <div id="not-active-items">{JSON.stringify(filter('not-active'))}</div>
        <div id="completed-items">{JSON.stringify(filter('completed'))}</div>
        <div id="not-completed-items">
          {JSON.stringify(filter('not-completed'))}
        </div>
      </div>
      <div id="metadata">
        <div>hints.size: {size}</div>
      </div>
    </div>
  );
}
```

### useHintsItem

- **useHintsItem**(`id`): [HintsItem](#hintsitem)

A React hook for accessing and updating a hints item's state.

```tsx
import { useHintsItem } from '@dopt/react-hints';
import RichText from '@dopt/react-rich-text';

export function Application() {
  const {
    id,
    hints,
    index,
    title,
    body,
    nextLabel,
    backLabel,
    active,
    completed,
    next,
    back,
  } = useHintsItem('onboarding-hints.step-1');

  return (
    <div>
      <div id="states">
        <div>hintsItem.active: {active}</div>
        <div>hintsItem.completed: {completed}</div>
      </div>
      <div id="actions">
        <button onClick={next}>{nextLabel}</button>
        <button onClick={back}>{backLabel}</button>
      </div>
      <div id="content">
        <div>hintsItem.title: {title}</div>
        <div>
          hintsItem.body: <RichText>{body}</RichText>
        </div>
        <div>hintsItem.nextLabel: {nextLabel}</div>
        <div>hintsItem.backLabel: {backLabel}</div>
      </div>
      <div id="parent">
        <div>hintsItem.hints: {JSON.stringify(hints)}</div>
      </div>
      <div id="metadata">
        <div>hintsItem.index: {hintsItem.index}</div>
      </div>
    </div>
  );
}
```

## Styling API

[Learn more about styling and theming →](https://docs.dopt.com/components/react/styling/)

| Name         | Selector                          | Description                              |
| ------------ | --------------------------------- | ---------------------------------------- |
| popover      | `.dopt-hints-item`                | Popover element                          |
| content      | `.dopt-hints-item__content`       | Content container                        |
| header       | `.dopt-hints-item__header`        | Header containing title and dismiss icon |
| title        | `.dopt-hints-item__title`         | Title heading                            |
| dismissIcon  | `.dopt-hints-item__dismiss-icon`  | Disiss icon button                       |
| body         | `.dopt-hints-item__body`          | Body content                             |
| footer       | `.dopt-hints-item__footer`        | Footer containing back and next buttons  |
| backButton   | `.dopt-hints-item__back-button`   | Back button                              |
| nextButton   | `.dopt-hints-item__next-button`   | Next button                              |
| progress     | `.dopt-hints-item__progress`      | Progress indicators                      |
| progressItem | `.dopt-hints-item-progress__item` | Progress indicator item                  |

### Popover position

| Name   | Selector                   | Description       |
| ------ | -------------------------- | ----------------- |
| top    | `.dopt-hints-item--top`    | Positioned top    |
| top    | `[data-position="top"]`    | Positioned top    |
| right  | `.dopt-hints-item--right`  | Positioned right  |
| right  | `[data-position="right"]`  | Positioned right  |
| bottom | `.dopt-hints-item--bottom` | Positioned bottom |
| bottom | `[data-position="bottom"]` | Positioned bottom |
| left   | `.dopt-hints-item--left`   | Positioned left   |
| left   | `[data-position="left"]`   | Positioned left   |

### Popover alignment

| Name   | Selector                    | Description    |
| ------ | --------------------------- | -------------- |
| start  | `.dopt-hints-item--start`   | Aligned start  |
| start  | `[data-alignment="start"]`  | Aligned start  |
| center | `.dopt-hints-item--center`  | Aligned center |
| center | `[data-alignment="center"]` | Aligned center |
| end    | `.dopt-hints-item--end`     | Aligned end    |
| end    | `[data-alignment="end"]`    | Aligned end    |

### Progress item state

| Name   | Selector                                  | Description          |
| ------ | ----------------------------------------- | -------------------- |
| active | `.dopt-hints-item-progress__item--active` | Active progress item |

## Types

### Hints

A stateful container for hints items.

```ts
interface Hints {
  id: string;

  items: HintsItem[];

  active: boolean;

  completed: boolean;
  dismissed: boolean;

  complete: () => void;
  dismiss: () => void;

  size: number;

  filter(on: FilterableField): HintsItem[];
  count(where: CountableField): number;
}
```

### HintsItem

A child of the hints. Includes state accessors and methods for updating state along with content configured in Dopt.

```ts
interface HintsItem {
  id: string;

  hints: Hints | undefined;

  index: number | null | undefined;

  title: string | null | undefined;
  body: RichText | null | undefined;

  nextLabel: string | null | undefined;
  backLabel: string | null | undefined;

  active: boolean;

  completed: boolean;

  next: () => void;
  back: () => void;
}
```

### FilterableField

```ts
type FilterableField = 'completed' | 'not-completed' | 'active' | 'not-active';
```

### CountableField

```ts
type CountableField = FilterableField;
```

### Alignment

```ts
type Alignment = 'start' | 'center' | 'end';
```

### Position

```ts
type Side = 'top' | 'right' | 'bottom' | 'left';
```
