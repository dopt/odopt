# @dopt/semantic-data-layer-modal

An interface definition for Dopt's [modal component](https://docs.dopt.com/components/react/modal/).

```ts
export interface Modal {
  id: string;

  title: string | null | undefined;
  body: RichText | null | undefined;

  completeLabel: string | null | undefined;
  dismissLabel: string | null | undefined;

  active: boolean;

  completed: boolean;
  dismissed: boolean;

  complete: () => void;
  dismiss: () => void;
}
```
