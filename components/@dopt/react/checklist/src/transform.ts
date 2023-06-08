import { Flow, FlowIntent, Block } from '@dopt/react';

import type { Checklist } from '@dopt/semantic-data-layer-checklist';

import { METADATA_BLOCK } from './const';

export function transform({
  /*
   * NOTE: this should eventually be the component block
   * along with it's "children"
   */
  flow,
  /*
   * NOTE: this will eventually be component block transitions
   * as opposed to flow intents
   */
  methods,
}: {
  flow: Flow;
  methods: FlowIntent;
}): Checklist {
  const { blocks } = flow;

  const { metadata, steps } = blocks.reduce<{
    metadata: Block | null;
    steps: Block[];
  }>(
    (memo, block) => {
      if (block.sid === METADATA_BLOCK) {
        memo.metadata = block;
      } else {
        memo.steps.push(block);
      }
      return memo;
    },
    { metadata: null, steps: [] }
  );

  const items = steps
    .sort((b1, b2) => {
      return (
        (b1.field('index', 0) as number) - (b2.field('index', 0) as number)
      );
    })
    .map((step) => ({
      title: step.field('title', ''),
      description: step.field('description', ''),
      id: step.uid,
      completed: step.state.exited,
      active: step.state.active,
      complete: () => step.transition('finish'),
      skip: () => step.transition('finish'),
    }));

  const completed = items.filter((item) => item.completed);

  return {
    title: metadata && metadata.field('title', ''),
    items,
    complete: () => methods.finish(),
    dismiss: () => methods.stop(),
    percentageComplete: () =>
      Math.floor((completed.length / items.length) * 100),
    getCompletedItems: () => completed,
    getUncompletedItems: () => items.filter((item) => !item.completed),
  };
}
