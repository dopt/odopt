export interface Checklist {
  title?: string | null;
  body?: string | null;
  items: ChecklistItem[];
  active: boolean;
  complete: () => void;
  dismiss: () => void;
  percentageComplete: () => number;
  getCompletedItems: () => ChecklistItem[];
  getUncompletedItems: () => ChecklistItem[];
}

export interface ChecklistItem {
  id: string;
  title?: string | null;
  body?: string | null;
  completeLabel?: string | null;
  completed: boolean;
  active: boolean;
  complete: () => void;
  skip: () => void;
}
