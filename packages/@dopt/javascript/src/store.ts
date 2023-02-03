import create from 'zustand/vanilla';
import { subscribeWithSelector } from 'zustand/middleware';

import type { Blocks, FlowStates } from '@dopt/javascript-common';

export const blockStore = create(subscribeWithSelector<Blocks>(() => ({})));
export const flowStore = create(subscribeWithSelector<FlowStates>(() => ({})));
