import create from 'zustand/vanilla';
import { subscribeWithSelector } from 'zustand/middleware';

import { Mercator } from '@dopt/mercator';

import type { Blocks, Flows } from '@dopt/javascript-common';

export const blockStore = create(subscribeWithSelector<Blocks>(() => ({})));
export const flowStore = create(
  subscribeWithSelector<Flows>(() => new Mercator())
);
