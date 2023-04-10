import { Logger } from '@dopt/logger';
import { createContext } from 'react';
import type {
  Flow as APIFlow,
  Block as APIBlock,
  Field as APIField,
} from '@dopt/javascript-common';

import {
  FlowStatus,
  Flows,
  Blocks,
  BlockTransitionHandler,
  FlowIntentHandler,
} from './types';

/**
 * The context stored within Dopt's provider. It is
 * partially accessible through hooks like
 * {@link useBlock} and {@link useFlow} or through
 * their HOCs like {@link withBlock} and {@link withFlow}.
 */
type DoptContext = {
  fetching: boolean;
  flows: Flows;
  flowBlocks: Map<APIFlow['sid'], APIBlock['uid'][]>;
  flowStatuses: Record<APIFlow['uid'], FlowStatus>;
  flowIntention: FlowIntentHandler;
  blocks: Blocks;
  blockUidBySid: Map<APIBlock['sid'], APIBlock['uid']>;
  blockIntention: BlockTransitionHandler;
  blockFields: Map<APIBlock['uid'], Map<APIField['sid'], APIField>>;
  log: Logger;
};

const DoptContext = createContext<DoptContext>({} as DoptContext);

export { DoptContext };
