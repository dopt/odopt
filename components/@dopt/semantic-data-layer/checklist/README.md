# @dopt/semantic-data-layer-checklist

An interface definition for Dopt's [checklist and checklist item components](https://docs.dopt.com/components/checklist/).

```ts
export interface Checklist {
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

export interface ChecklistItem {
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
