import { useState } from 'react';

import type {
  Board as BoardType,
  Card,
  CardSource,
  CardDestination,
} from '@/components/board/types';

import {
  Board,
  Confetti,
  CreateIssueModal,
  FormValues,
  NextStepsBanner,
  WelcomeBanner,
  addCard,
  moveCard,
} from '@/components';

import { AppShell, Box, Button, Group, Header, Text } from '@mantine/core';
import { columns, initialBoard, getColumnById } from '@/utils/board';

import { useBlock } from '@dopt/react';

import { highlight } from '@/styles/app.css';
import { useKeyValueStore } from '@/hooks';

export function Kanban() {
  const [board, setBoard] = useState<BoardType>(initialBoard);

  if (!board) {
    throw new Error('Unable to initialize board in the k/v store');
  }

  const [firstIssueId, setFirstIssueId, { removeItem: clearFirstIssue }] =
    useKeyValueStore('firstIssue');

  const [createIssueColumnContext, setCreateIssueColumnContext] = useState(
    columns[0].id
  );
  const [createIssueModalIsOpen, setCreateIssueModalIsOpen] = useState(false);

  const [createIssueNudge, createIssue] = useBlock<['default']>(
    'kanban.welcome-banner'
  );
  const [firstIssue, moveIssueIntoProgress] = useBlock<['default']>(
    'kanban.drag-to-progress'
  );
  const [issueInProgress, reorder] = useBlock<['default']>(
    'kanban.reorder-issue'
  );
  const [issueStillInProgress, moveToDone] = useBlock<['default']>(
    'kanban.drag-to-done'
  );

  const handleMoveCard = (
    card: Card,
    source: CardSource,
    destination: CardDestination
  ) => {
    setBoard(moveCard(board, source, destination));

    if (card.id === firstIssueId) {
      if (
        firstIssue.state.active &&
        source.fromColumnId === 'backlog' &&
        destination.toColumnId === 'inProgress'
      ) {
        moveIssueIntoProgress('default');
      }

      if (
        issueInProgress.state.active &&
        source.fromColumnId === 'inProgress' &&
        destination.toColumnId === 'inProgress' &&
        source.fromPosition !== destination.toPosition
      ) {
        reorder('default');
      }

      if (
        issueStillInProgress.state.active &&
        source.fromColumnId === 'inProgress' &&
        destination.toColumnId === 'done'
      ) {
        clearFirstIssue();
        moveToDone('default');
      }
    }
  };

  const handleCreateIssue = (card: FormValues, toColumnId: string) => {
    const column = getColumnById(toColumnId, board);
    const updatedBoard = addCard(board, column, card, { on: 'top' });

    setBoard(updatedBoard);

    if (createIssueNudge.state.active) {
      setFirstIssueId(card.id);
      createIssue('default');
    }
  };

  return (
    <AppShell
      padding="md"
      styles={() => ({
        main: {
          display: 'flex',
          flexDirection: 'column',
          paddingBottom: 0,
        },
      })}
      header={
        <Header
          height={68}
          p="md"
          sx={{ borderBottomColor: '#EAEAEA', zIndex: 1 }}
        >
          <Group position="apart">
            <Box>
              <Text size="lg" weight="bold">
                All issues
              </Text>
            </Box>

            <Box>
              <Button
                onClick={() => {
                  setCreateIssueColumnContext(columns[0].id);
                  setCreateIssueModalIsOpen(true);
                }}
                className={createIssueNudge.state.active ? highlight : ''}
                radius={6}
                py={10}
                px={12}
              >
                Create issue
              </Button>
            </Box>
          </Group>
        </Header>
      }
    >
      <WelcomeBanner />
      <NextStepsBanner />
      <Confetti />
      <Board
        onCardDragEnd={handleMoveCard}
        isDisabled={createIssueNudge.state.active}
      >
        {board}
      </Board>

      <CreateIssueModal
        onSubmit={(values) =>
          handleCreateIssue(values, createIssueColumnContext)
        }
        onClose={() => setCreateIssueModalIsOpen(false)}
        opened={createIssueModalIsOpen}
      />
    </AppShell>
  );
}
