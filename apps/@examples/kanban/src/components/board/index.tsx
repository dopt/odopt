import '@asseinfo/react-kanban/dist/styles.css';
import { disabledClass } from './index.css';

// @ts-expect-error Package does not support TS
import KanbanBoard from '@asseinfo/react-kanban';
import { ColumnHeader, Card as CardComponent } from '@/components';

import type { Card, CardUtils, Column, Props } from './types';

export function Board(props: Props) {
  const { children, onCardDragEnd, isDisabled } = props;

  return (
    <div className={isDisabled ? disabledClass : ''}>
      <KanbanBoard
        onCardDragEnd={onCardDragEnd}
        renderColumnHeader={({ id, title }: Column) => {
          return <ColumnHeader id={id}>{title}</ColumnHeader>;
        }}
        renderCard={(
          { id, title, description, assignee }: Card,
          utils: CardUtils
        ) => {
          return (
            <CardComponent
              id={id}
              title={title}
              assignee={assignee}
              isDragging={utils.dragging}
            >
              {description}
            </CardComponent>
          );
        }}
      >
        {children}
      </KanbanBoard>
    </div>
  );
}

export {
  moveCard,
  addCard,
  // @ts-expect-error Package does not support TS
} from '@asseinfo/react-kanban';
