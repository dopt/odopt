export interface Modal {
  title?: string | null;
  body?: string | null;
  completeLabel?: string | null;
  dismissLabel?: string | null;
  active: boolean;
  complete: () => void;
  dismiss: () => void;
}
