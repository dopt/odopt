export interface Checklist {
  id: string;

  title?: string | null;
  body?: string | null;

  items: ChecklistItem[];

  active: boolean;

  completed: boolean;
  dismissed: boolean;

  complete: () => void;
  dismiss: () => void;

  get size(): number;

  filter: (fn: (item: ChecklistItem, i?: number) => boolean) => ChecklistItem[];

  count(fn: (item: ChecklistItem, i?: number) => any): number;
  count(type: 'completed' | 'incomplete' | 'skipped'): number;
}

export interface ChecklistItem {
  id: string;

  title?: string | null;
  body?: string | null;
  completeLabel?: string | null;

  active: boolean;

  skipped: boolean;
  completed: boolean;

  complete: () => void;
  skip: () => void;
}
