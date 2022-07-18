import { Block } from '../types';

const groupStats = (...blocks: Block[]) => {
  const total = blocks.length;

  const completed = blocks.filter(({ completed }) => completed);
  const started = blocks.filter(({ started }) => started);

  const numFinished = completed.length;
  const numStarted = started.length;

  const percentageStarted = (numStarted / length) * 100;
  const percentageDone = (numFinished / length) * 100;

  return {
    total,
    started,
    completed,
    numStarted,
    numFinished,
    percentageStarted,
    percentageDone,
  };
};

export { groupStats };
