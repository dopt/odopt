export type FilterableField =
  | 'completed'
  | 'not-completed'
  | 'active'
  | 'not-active';

export type CountableField = FilterableField;

export interface Tour {
  id: string;

  items: TourItem[];

  active: boolean;

  completed: boolean;
  dismissed: boolean;

  complete: () => void;
  dismiss: () => void;

  size: number;

  filter: (on: FilterableField) => TourItem[];
  count(where: CountableField): number;
}

export interface TourItem {
  id: string;

  index: number | null;

  title: string | null;
  body: string | null;

  nextLabel: string | null;
  backLabel: string | null;

  active: boolean;

  completed: boolean;

  next: () => void;
  back: () => void;

  dismiss: () => void;
}
