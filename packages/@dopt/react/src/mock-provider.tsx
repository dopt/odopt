import { useMemo, useState } from 'react';
import { DoptContext } from './context';
import {
  BlockIntentions,
  Blocks,
  Block,
  FlowIntentions,
  Flows,
} from '@dopt/javascript-common';
import { MockProviderConfig } from './types';
import { Logger } from '@dopt/logger';
const validIntentState = ({ active, completed, stopped, exited }: Block) =>
  active && !completed && !stopped && !exited;

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
  const [flows] = useState<Flows>({});
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
      setBlocks({
        ...blocks,
        [identifier]: {
          ...blocks[identifier],
          ...updates,
        },
      });
    }
  }

  const flowIntentions: FlowIntentions = useMemo(() => {
    return {
      reset: () => {},
    };
  }, []);

  const blockIntentions: BlockIntentions = {
    start: (identifier) => updateState(blocks, identifier, { started: true }),
    complete: (identifier) =>
      updateState(blocks, identifier, {
        active: false,
        completed: true,
      }),
    stop: (identifier) =>
      updateState(blocks, identifier, {
        active: false,
        stopped: true,
      }),
    exit: (identifier) =>
      updateState(blocks, identifier, {
        active: false,
        exited: true,
      }),
  };

  return (
    <DoptContext.Provider
      value={{
        loading: false,
        blockIntentions,
        blocks,
        flows,
        flowIntentions,
        log,
      }}
    >
      {props.children}
    </DoptContext.Provider>
  );
}
