export interface Modal {
  id: string;

  title?: string;
  body?: string;

  completeAction?: string;
  dismissAction?: string;

  active: boolean;

  completed: boolean;
  dismissed: boolean;

  complete: () => void;
  dismiss: () => void;
}
