# @dopt/semantic-data-layer-hint

An interface definition for Dopt's [hint and hint item components](https://docs.dopt.com/components/hint/).

```ts
export interface Hints {
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

export interface HintsItem {
  id: string;

  hints: Hints | undefined;

  index: number | null | undefined;

  title: string | null | undefined;
  body: RichText | null | undefined;

  completeLabel: string | null | undefined;
  dismissAllLabel: string | null | undefined;

  active: boolean;

  completed: boolean;
  dismissed: boolean;

  complete: () => void;
  dismiss: () => void;
}
```
