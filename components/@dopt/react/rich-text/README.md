# @dopt/react-rich-text

## Overview

The rich text component is powered by a [rich text field](https://docs.dopt.com/concepts/fields/#types) and is great for rendering complex content containing spacing, alignment, images, links, and more.
It matches rich text types you might find in traditional content management systems and can be helpful for adding custom in-product content.

[Learn more about how to use this component with Dopt →](https://docs.dopt.com/components/richtext/)

## Installation

```bash
# npm
npm install @dopt/react-rich-text

# Yarn
yarn add @dopt/react-rich-text

# pnpm
pnpm add @dopt/react-rich-text
```

## UI components

### Rich text

The default export from `@dopt/react-rich-text` is a component that you can use to render Dopt's rich text field.

```tsx
import type RichText from '@dopt/core-rich-text';
import RichText from '@dopt/react-rich-text';

function MyContent() {
  const block = useBlock('my-flow.rich-content-block');

  return <RichText.Root>{block.field<RichText>('rich-body')}</RichText.Root>;
}
```

## Styling API

[Learn more about styling and theming →](https://docs.dopt.com/components/styling/)

| Name         | Selector                         | Description                        |
| ------------ | -------------------------------- | ---------------------------------- |
| root         | `.dopt-rich-text`                | Root element                       |
| text         | `.dopt-rich-text__text`          | Text element                       |
| bold         | `.dopt-rich-text__text strong`   | Bolded text                        |
| code         | `.dopt-rich-text__text code`     | Code blocks                        |
| italic       | `.dopt-rich-text__text em`       | Italicized text                    |
| underline    | `.dopt-rich-text__text u`        | Underlined text                    |
| blockQuote   | `.dopt-rich-text__block-quote`   | Block quote                        |
| bulletedList | `.dopt-rich-text__bulleted-list` | Bulleted list                      |
| numberedList | `.dopt-rich-text__numbered-list` | Numbered list                      |
| listItem     | `.dopt-rich-text__list-item`     | Individual item                    |
| h1           | `.dopt-rich-text__heading-one`   | Primary heading                    |
| h2           | `.dopt-rich-text__heading-two`   | Secondary heading                  |
| link         | `.dopt-rich-text a`              | Link, accessed with `a`            |
| image        | `.dopt-rich-text img`            | Image, accessed with `img`         |
| video        | `.dopt-rich-text iframe`         | Video, rendered within an `iframe` |

## Types

### Rich text

Rich text fields are made up of an array of elements each of which may have further properties including children.

[@dopt/core-rich-text](https://www.npmjs.com/package/@dopt/core-rich-text) contains type and schema definitions for Dopt's rich text field.

[Read the complete type definitions →](https://github.com/dopt/odopt/blob/main/components/%40dopt/core/rich-text/src/index.ts)
