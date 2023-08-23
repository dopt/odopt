import type { Children } from '@dopt/core-rich-text';

export type FilterableField =
  | 'completed'
  | 'not-completed'
  | 'skipped'
  | 'not-skipped'
  | 'active'
  | 'not-active'
  | 'done'
  | 'not-done';

export type CountableField = FilterableField;

export interface Checklist {
  id: string;

  title: string | null | undefined;
  body: Children | null | undefined;

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
  body: Children | null | undefined;

  completeLabel: string | null | undefined;

  done: boolean;

  active: boolean;

  skipped: boolean;
  completed: boolean;

  complete: () => void;
  skip: () => void;
}
