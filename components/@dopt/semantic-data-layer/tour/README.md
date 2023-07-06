# @dopt/semantic-data-layer-tour

An interface definition for Dopt's [tour and tour item components](https://docs.dopt.com/components/tour/).

```ts
export interface Tour {
  id: string;

  items: TourItem[];

  active: boolean;

  completed: boolean;
  dismissed: boolean;

  complete: () => void;
  dismiss: () => void;

  size: number;

  filter(on: FilterableField): TourItem[];
  count(where: CountableField): number;
}

export interface TourItem {
  id: string;

  tour: Tour;

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
