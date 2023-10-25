import type { Children } from '@dopt/core-rich-text';
import { Field } from '@dopt/block-api-types';

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

  field: <V extends Field['value']>(name: string) => V | null | undefined;

  filter(on: FilterableField): TourItem[];
  count(where: CountableField): number;
}

export interface TourItem {
  id: string;

  tour: Tour | undefined;

  index: number | null | undefined;

  title: string | null | undefined;
  body: Children | null | undefined;

  nextLabel: string | null | undefined;
  backLabel: string | null | undefined;

  active: boolean;

  completed: boolean;

  field: <V extends Field['value']>(name: string) => V | null | undefined;

  next: () => void;
  back: () => void;
}
