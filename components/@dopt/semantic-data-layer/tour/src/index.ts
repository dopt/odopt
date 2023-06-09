export interface Tour {
  items: TourItem[];
  complete: () => void;
}

export interface TourItem {
  id: string;
  title?: string | null;
  body?: string | null;
  nextLabel?: string | null;
  backLabel?: string | null;
  active: boolean;
  next: () => void;
  back: () => void;
  dismiss: () => void;
}
