import type { Children } from '@dopt/core-rich-text';
import type { Field } from '@dopt/block-api-types';

export interface Card {
  id: string;

  title: string | null | undefined;
  body: Children | null | undefined;

  completeLabel: string | null | undefined;
  dismissLabel: string | null | undefined;

  active: boolean;

  completed: boolean;
  dismissed: boolean;

  field: <V extends Field['value']>(name: string) => V | null | undefined;

  complete: () => void;
  dismiss: () => void;
}
