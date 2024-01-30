# @dopt/html-rich-text

## Overview

The rich text component is powered by a [rich text field](https://docs.dopt.com/concepts/fields/#types) and is great for rendering complex content containing spacing, alignment, images, links, and more.

It matches rich text types you might find in traditional content management systems and can be helpful for adding custom in-product content.

[Learn more about how to use this component with Dopt →](https://docs.dopt.com/components/react/rich-text/)

## Installation

```bash
# npm
npm install @dopt/html-rich-text

# Yarn
yarn add @dopt/html-rich-text

# pnpm
pnpm add @dopt/html-rich-text
```

## Usage

The default export from `@dopt/html-rich-text` is a function which produces a string containing HTML.

```tsx
import type Children as RichText from '@dopt/html-rich-text';
import RichText from '@dopt/html-rich-text';

function MyContent() {
  const block = useBlock('my-flow.rich-content-block');

  return RichText({
    content: block.field<RichText>('rich-body'),
  });
}
```

## Options

### RichText

| Name      | Type                    | Description                                                                   |
| --------- | ----------------------- | ----------------------------------------------------------------------------- |
| content?  | [RichText](#richtext-1) | The rich text content for the component                                       |
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
