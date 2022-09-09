import { useState } from 'react';
import { DoptContext } from './context';
import { Methods, Blocks, MockProviderConfig, Block } from './types';

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
  const { mocks = { blocks: {} } } = props;
  const [blocks, setBlocks] = useState<Blocks>({ ...mocks.blocks });

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

  const methods: Methods = {
    get: () => {},
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
        methods,
        blocks,
      }}
    >
      {props.children}
    </DoptContext.Provider>
  );
}
