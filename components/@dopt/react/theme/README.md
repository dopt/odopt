# @dopt/react-theme

Dopt's React components leverage a unified theme which consists of tokens for things like colors, typography, and spacing. You can override or extend these tokens as you go about styling the components. Leveraging a theme can be useful for quickly styling multiple components at the same time so they all feel cohesive.

All of Dopt's React components have a `theme` prop that you can use to pass in your custom theme definition.

Let’s walk through an example of creating a custom theme and then apply it to the [Modal component](https://docs.dopt.com/components/modal/):

```jsx
import { createTheme } from '@dopt/react-theme';
import * as Modal from '@dopt/react-modal';

const customTheme = createTheme({
  colors: {
    primary: '#b4d455',
  },
  fonts: {
    sans: 'Inter, sans-serif',
  },
});

function MyModal() {
  return (
    <Modal.Root theme={customTheme} css={{ background: '$primary' }}>
      ...
    </Modal.Root>
  );
}
```

[Learn more about Dopt's styling and theming →](https://docs.dopt.com/components/styling/).
