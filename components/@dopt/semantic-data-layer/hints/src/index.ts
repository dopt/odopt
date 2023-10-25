import type { Children } from '@dopt/core-rich-text';
import { Field } from '@dopt/block-api-types';

export type FilterableField =
  | 'completed'
  | 'not-completed'
  | 'dismissed'
  | 'not-dismissed'
  | 'active'
  | 'not-active'
  | 'done'
  | 'not-done';

export type CountableField = FilterableField;

export interface Hints {
  id: string;

  items: HintsItem[];

  active: boolean;

  completed: boolean;
  dismissed: boolean;

  complete: () => void;
  dismiss: () => void;

  size: number;

  field: <V extends Field['value']>(name: string) => V | null | undefined;

  filter(on: FilterableField): HintsItem[];
  count(where: CountableField): number;
}

export interface HintsItem {
  id: string;

  hints: Hints | undefined;

  index: number | null | undefined;

  title: string | null | undefined;
  body: Children | null | undefined;

  completeLabel: string | null | undefined;
  dismissAllLabel: string | null | undefined;

  active: boolean;

  completed: boolean;
  dismissed: boolean;

  field: <V extends Field['value']>(name: string) => V | null | undefined;

  complete: () => void;
  dismiss: () => void;
}
