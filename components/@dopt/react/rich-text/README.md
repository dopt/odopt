# @dopt/react-rich-text

## Overview

The rich text component is powered by a [rich text field](https://docs.dopt.com/concepts/fields/#types) and is great for rendering complex content containing spacing, alignment, images, links, and more.

It matches rich text types you might find in traditional content management systems and can be helpful for adding custom in-product content.

[Learn more about how to use this component with Dopt →](https://docs.dopt.com/components/rich-text/)

## Installation

ℹ️ **If you are using a particular React framework like [Next.js](https://docs.dopt.com/components/react/frameworks/nextjs/), please check out our [framework specific docs](https://docs.dopt.com/components/react/frameworks/).**

```bash
# npm
npm install @dopt/react-rich-text

# Yarn
yarn add @dopt/react-rich-text

# pnpm
pnpm add @dopt/react-rich-text
```

## Usage

The default export from `@dopt/react-rich-text` is a component that you can use to render the contents of Dopt's rich text field.

```tsx
import type Children as RichText from '@dopt/react-rich-text';
import RichText from '@dopt/react-rich-text';

function MyContent() {
  const block = useBlock('my-flow.rich-content-block');

  return <RichText>{block.field<RichText>('rich-body')}</RichText>;
}
```

## Props

### RichText

| Name      | Type                    | Description                                                                   |
| --------- | ----------------------- | ----------------------------------------------------------------------------- |
| children? | [RichText](#richtext-1) | The rich text content for the component                                       |
| noStyles? | boolean                 | Determines if Dopt specified styles are rendered alongside rich text elements |

## Styling API

[Learn more about styling and theming →](https://docs.dopt.com/components/react/styling/)

| Name         | Selector                         | Description                             |
| ------------ | -------------------------------- | --------------------------------------- |
| root         | `.dopt-rich-text`                | Root element                            |
| node         | `.dopt-rich-text__node`          | All nodes produced by rich text         |
| text         | `.dopt-rich-text__text`          | Text element                            |
| bold         | `.dopt-rich-text__bold`          | Bolded text                             |
| italic       | `.dopt-rich-text__italic`        | Italicized text                         |
| underline    | `.dopt-rich-text__underline`     | Underlined text                         |
| bulletedList | `.dopt-rich-text__bulleted-list` | Bulleted list                           |
| numberedList | `.dopt-rich-text__numbered-list` | Numbered list                           |
| listItem     | `.dopt-rich-text__list-item`     | Individual item                         |
| h1           | `.dopt-rich-text__heading-one`   | Heading level 1                         |
| h2           | `.dopt-rich-text__heading-two`   | Heading level 2                         |
| h3           | `.dopt-rich-text__heading-three` | Heading level 3                         |
| link         | `.dopt-rich-text__link`          | Link                                    |
| image        | `.dopt-rich-text__image`         | Image                                   |
| video        | `.dopt-rich-text__video`         | Video embed rendered within an `iframe` |

### Alignment

| Name    | Selector                               | Description         |
| ------- | -------------------------------------- | ------------------- |
| left    | `.dopt-rich-text__node--align-left`    | Left alignment      |
| center  | `.dopt-rich-text__node--align-center`  | Center alignment    |
| right   | `.dopt-rich-text__node--align-right`   | Right alignment     |
| justify | `.dopt-rich-text__node--align-justify` | Justified alignment |

## Types

### RichText

Rich text fields are made up of an array of elements each of which may have further properties including children.

[@dopt/core-rich-text](https://www.npmjs.com/package/@dopt/core-rich-text) contains type and schema definitions for Dopt's rich text field.

[Read the complete type definitions →](../../core/rich-text/src/index.ts)
