# @dopt/semantic-data-layer-card

An interface definition for Dopt's [card component](https://docs.dopt.com/components/card/).

```ts
export interface Card {
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
