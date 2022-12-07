import { useMemo, useState } from 'react';
import { DoptContext } from './context';
import {
  BlockIntention,
  Blocks,
  FlowIntention,
  Flows,
} from '@dopt/javascript-common';
import type { Block } from '@dopt/block-types';
import { MockProviderConfig } from './types';
import { Logger } from '@dopt/logger';
import { Mercator } from '@dopt/mercator';

const validIntentState = ({ state }: Block) => state.active && !state.completed;

/**
 * A mock implementation of the {@link DoptProvider} for local/offline testing.
 *
 * @see {@link BaseDoptProvider}
 *
 * @alpha
 */
export function MockDoptProvider(props: MockProviderConfig) {
  const { mocks = { blocks: {} }, logLevel } = props;
  const [blocks, setBlocks] = useState<Blocks>({ ...mocks.blocks });
  const [flows] = useState<Flows>(new Mercator());
  const log = new Logger(
    logLevel
      ? { logLevel }
      : {
          logLevel: 'debug',
        }
  );
  function updateState(
    blocks: Blocks,
    identifier: string,
    updates: Partial<Block>
  ) {
    const block = blocks[identifier];
    if (block && validIntentState(block)) {
      //@ts-ignore
      setBlocks({
        ...blocks,
        [identifier]: {
          ...blocks[identifier],
          ...updates,
        },
      });
    }
  }

  const flowIntention: FlowIntention = useMemo(() => {
    return {
      reset: async () => {},
      complete: async () => {},
      start: async () => {},
      exit: async () => {},
    };
  }, []);

  const blockIntention: BlockIntention = {
    complete: async (identifier) =>
      updateState(blocks, identifier, {
        //@ts-ignore
        active: false,
        completed: true,
      }),
    next: async (identifier) =>
      updateState(blocks, identifier, {
        //@ts-ignore
        active: false,
        completed: true,
      }),
    prev: async (identifier) =>
      updateState(blocks, identifier, {
        //@ts-ignore
        active: false,
        completed: true,
      }),
  };

  return (
    <DoptContext.Provider
      //@ts-ignore
      value={{
        loading: false,
        blockIntention,
        blocks,
        flows,
        flowIntention,
        log,
      }}
    >
      {props.children}
    </DoptContext.Provider>
  );
}
