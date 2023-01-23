export interface Props {
  children: Board;
  onCardDragEnd?: (
    card: Card,
    source: CardSource,
    destination: CardDestination
  ) => void;
  isDisabled?: boolean;
}

export interface Card {
  id: string;
  title: string;
  description?: string;
  assignee: string;
}

export interface CardUtils {
  remove: () => void;
  dragging: boolean;
}

export interface Column {
  id: string;
  title: string;
  cards: Card[];
}

export interface ColumnSource {
  fromPosition: number;
}

export interface ColumnDestination {
  toPosition: number;
}

export interface CardSource {
  fromColumnId: string;
  fromPosition: number;
}

export interface CardDestination {
  toColumnId: string;
  toPosition: number;
}

export interface Board {
  columns: Column[];
}
