import { Logger } from '@dopt/logger';
import { createContext } from 'react';

import type { Mercator } from '@dopt/mercator';
import type { Flow, Block, Field } from '@dopt/block-types';
import {
  Flows,
  Blocks,
  BlockIntention,
  FlowIntention,
} from '@dopt/javascript-common';

import { FlowStatus } from './types';

/**
 * The context, which is partial accessible through either the
 * {@link useBlock} and {@link useFlow} hooks or the
 * {@link withBlock} and {@link withFlow} HOCs
 */
type DoptContext = {
  fetching: boolean;
  flows: Flows;
  flowBlocks: Mercator<[Flow['sid'], Flow['version']], Block['uid'][]>;
  flowStatuses: Record<Flow['uid'], FlowStatus>;
  flowIntention: FlowIntention;
  blocks: Blocks;
  blockIntention: BlockIntention;
  blockFields: Map<Block['uid'], Map<Field['sid'], Field>>;
  log: Logger;
};

const DoptContext = createContext<DoptContext>({} as DoptContext);

export { DoptContext };
