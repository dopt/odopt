export type FilterableField =
  | 'completed'
  | 'not-completed'
  | 'skipped'
  | 'not-skipped'
  | 'active'
  | 'not-active';

export type CountableField = FilterableField;

export interface Checklist {
  id: string;

  title: string | null;
  body: string | null;

  items: ChecklistItem[];

  active: boolean;

  completed: boolean;
  dismissed: boolean;

  complete: () => void;
  dismiss: () => void;

  size: number;

  filter: (on: FilterableField) => ChecklistItem[];
  count(where: CountableField): number;
}

export interface ChecklistItem {
  id: string;

  index: number | null;

  title: string | null;
  body: string | null;

  completeLabel: string | null;

  active: boolean;

  skipped: boolean;
  completed: boolean;

  complete: () => void;
  skip: () => void;
}
