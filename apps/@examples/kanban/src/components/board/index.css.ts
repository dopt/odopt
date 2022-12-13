import { globalStyle } from '@vanilla-extract/css';

globalStyle('[data-rbd-droppable-id="board-droppable"]', {
  display: 'grid !important',
  gridAutoFlow: 'column',
  gridAutoColumns: '1fr',
  width: '100%',
  gap: '10px',
  margin: '10px 0',
});

globalStyle('.react-kanban-board', {
  padding: 0,
  width: '100%',
  display: 'flex',
  flexGrow: 1,
  flexShrink: 0,
  flexDirection: 'row',
  //@ts-ignore
  overflowY: 'visible !important',
  alignItems: 'normal !important',
});

globalStyle('.react-kanban-column', {
  display: 'flex !important',
  flexDirection: 'column',
  height: 'unset !important',
  background: '#F1F3F5',
  borderRadius: '4px',
  margin: 0,
});

globalStyle('.react-kanban-card-skeleton', {
  maxWidth: '300px',
  minWidth: '300px',
});
