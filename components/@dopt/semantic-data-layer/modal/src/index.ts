export interface Modal {
  id: string;

  title?: string | null;
  body?: string | null;

  completeLabel?: string | null;
  dismissLabel?: string | null;

  active: boolean;

  completed: boolean;
  dismissed: boolean;

  complete: () => void;
  dismiss: () => void;
}
