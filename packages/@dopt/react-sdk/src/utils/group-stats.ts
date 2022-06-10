import { Block } from '@/types';

const groupStats = (...blocks: Block[]) => {
  const total = blocks.length;

  const finished = blocks.filter(({ finished }) => finished);
  const started = blocks.filter(({ started }) => started);

  const numFinished = finished.length;
  const numStarted = started.length;

  const percentageStarted = (numStarted / length) * 100;
  const percentageDone = (numFinished / length) * 100;

  return {
    total,
    started,
    finished,
    numStarted,
    numFinished,
    percentageStarted,
    percentageDone,
  };
};

export { groupStats };
