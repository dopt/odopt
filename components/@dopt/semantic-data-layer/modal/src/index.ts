import type { Children } from '@dopt/core-rich-text';

export interface Modal {
  id: string;

  title: string | null | undefined;
  body: Children | null | undefined;

  completeLabel: string | null | undefined;
  dismissLabel: string | null | undefined;

  active: boolean;

  completed: boolean;
  dismissed: boolean;

  complete: () => void;
  dismiss: () => void;
}
