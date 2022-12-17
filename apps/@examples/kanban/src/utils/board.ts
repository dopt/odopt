import { type Board, type Column } from '@/components/board/types';

export const columns: Omit<Column, 'cards'>[] = [
  { id: 'backlog', title: 'Backlog' },
  { id: 'inProgress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
];

export const initialBoard: Board = {
  columns: [
    {
      ...columns[0],
      cards: [],
    },
    {
      ...columns[1],
      cards: [
        {
          id: 'user-research',
          title: 'User research',
          description:
            'Learn how users think about other products in our space',
          assignee: 'kim',
        },
        {
          id: 'copy-update',
          title: 'Update landing page copy',
          description:
            'Change home and product page based on the messaging framework',
          assignee: 'chris',
        },
      ],
    },
    {
      ...columns[2],
      cards: [
        {
          id: 'messaging-framework',
          title: 'Create messaging framework',
          description: 'Get some work done',
          assignee: 'chris',
        },
      ],
    },
  ],
};

export function getColumnById(id: string, board: Board) {
  const column = board.columns.find((col) => col.id == id);
  return column;
}
