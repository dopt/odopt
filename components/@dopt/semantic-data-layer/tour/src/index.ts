import { RichText } from '@dopt/core-rich-text';

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

  filter(on: FilterableField): TourItem[];
  count(where: CountableField): number;
}

export interface TourItem {
  id: string;

  index: number | null | undefined;

  title: string | null | undefined;
  body: RichText | null | undefined;

  nextLabel: string | null | undefined;
  backLabel: string | null | undefined;

  active: boolean;

  completed: boolean;

  next: () => void;
  back: () => void;

  dismiss: () => void;
}