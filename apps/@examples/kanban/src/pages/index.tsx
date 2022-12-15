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
  const [board, setBoard] = useKeyValueStore<BoardType>('board', {
    defaultValue: initialBoard,
  });

  if (!board) {
    throw new Error('Unable to initialize board in the k/v store');
  }

  const [firstIssueId, setFirstIssueId, { removeItem: clearFirstIssue }] =
    useKeyValueStore('firstIssue');

  const [createIssueColumnContext, setCreateIssueColumnContext] = useState(
    columns[0].id
  );
  const [createIssueModalIsOpen, setCreateIssueModalIsOpen] = useState(false);

  const [createIssueNudge, createIssue] = useBlock('f7oaGfQYNJ1KtueMLv4nm');
  const [firstIssue, moveIssueIntoProgress] = useBlock('krcPrzGs9w6J2mHKQJLYd');
  const [issueInProgress, reorder] = useBlock('z2rnhWqUav5rhRLcxoM55');
  const [issueStillInProgress, moveToDone] = useBlock('pMw5hcPMz3aZPr5IVfnP8');

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
        moveIssueIntoProgress.complete();
      }

      if (
        issueInProgress.state.active &&
        source.fromColumnId === 'inProgress' &&
        destination.toColumnId === 'inProgress' &&
        source.fromPosition !== destination.toPosition
      ) {
        reorder.complete();
      }

      if (
        issueStillInProgress.state.active &&
        source.fromColumnId === 'inProgress' &&
        destination.toColumnId === 'done'
      ) {
        clearFirstIssue();
        moveToDone.complete();
      }
    }
  };

  const handleCreateIssue = (card: FormValues, toColumnId: string) => {
    const column = getColumnById(toColumnId, board);
    const updatedBoard = addCard(board, column, card, { on: 'top' });

    setBoard(updatedBoard);

    if (createIssueNudge.state.active) {
      setFirstIssueId(card.id);
      createIssue.complete();
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
        <Header height={60} p="md">
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
      <Board onCardDragEnd={handleMoveCard}>{board}</Board>

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
