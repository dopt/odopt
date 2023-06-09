import { Flow, FlowIntent } from '@dopt/react';

import type { Tour } from '@dopt/semantic-data-layer-tour';

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
}): Tour {
  const { blocks } = flow;

  const items = blocks
    .sort((b1, b2) => {
      return (
        (b1.field('index', 0) as number) - (b2.field('index', 0) as number)
      );
    })
    .map((step) => ({
      id: step.uid,
      active: step.state.active,
      title: step.field('title', ''),
      body: step.field('body', ''),
      nextLabel: step.field('nextlabel', ''),
      backLabel: step.field('backlabel', ''),
      next: () => step.transition('next'),
      back: () => step.transition('back'),
      dismiss: () => step.transition('dismiss'),
    }));

  return {
    items,
    complete: () => methods.finish(),
  };
}
