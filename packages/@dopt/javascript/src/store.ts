import create from 'zustand/vanilla';
import { subscribeWithSelector } from 'zustand/middleware';
import type { Flow, Block } from '@dopt/javascript-common';

export type Blocks = Record<Block['uid'], Block>;
export type Flows = Record<Flow['sid'], Flow>;

export const createBlockStore = () =>
  create(subscribeWithSelector<Blocks>(() => ({})));
export const createFlowStore = () =>
  create(subscribeWithSelector<Flows>(() => ({})));
