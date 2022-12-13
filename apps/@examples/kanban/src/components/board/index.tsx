import '@asseinfo/react-kanban/dist/styles.css';
import './index.css';

// @ts-expect-error Package does not support TS
import KanbanBoard from '@asseinfo/react-kanban';
import { ColumnHeader, Card as CardComponent } from '@/components';

import type { Card, CardUtils, Column, Props } from './types';

export function Board(props: Props) {
  const { children, onCardDragEnd } = props;

  return (
    <KanbanBoard
      onCardDragEnd={onCardDragEnd}
      renderColumnHeader={({ id, title }: Column) => {
        return <ColumnHeader id={id}>{title}</ColumnHeader>;
      }}
      renderCard={({ id, title, description }: Card, utils: CardUtils) => {
        return (
          <CardComponent id={id} title={title} isDragging={utils.dragging}>
            {description}
          </CardComponent>
        );
      }}
    >
      {children}
    </KanbanBoard>
  );
}

export {
  moveCard,
  addCard,
  // @ts-expect-error Package does not support TS
} from '@asseinfo/react-kanban';
