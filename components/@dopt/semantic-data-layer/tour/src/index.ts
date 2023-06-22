export interface Tour {
  id: string;

  items: TourItem[];

  active: boolean;

  completed: boolean;
  dismissed: boolean;

  complete: () => void;
  dismiss: () => void;

  get size(): number;

  filter: (fn: (item: TourItem, i?: number) => boolean) => TourItem[];

  count(fn: (item: TourItem, i?: number) => any): number;
  count(type: 'completed' | 'incomplete'): number;
}

export interface TourItem {
  id: string;

  index: number | null;

  title?: string | null;
  body?: string | null;

  nextLabel?: string | null;
  backLabel?: string | null;

  active: boolean;

  completed: boolean;

  next: () => void;
  back: () => void;

  dismiss: () => void;
}
