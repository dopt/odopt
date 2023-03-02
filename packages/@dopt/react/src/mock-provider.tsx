import { useMemo, useState } from 'react';
import { DoptContext } from './context';
import {
  BlockIntention,
  Blocks,
  FlowIntention,
  Flows,
} from '@dopt/javascript-common';
import { Block, Field, Flow, ModelTypeConst } from '@dopt/block-types';
import { MockProviderConfig, FlowStatus } from './types';
import { Logger } from '@dopt/logger';
import { Mercator } from '@dopt/mercator';

const validIntentState = ({ state }: Block) => state.active && !state.completed;

/**
 * A mock implementation of the {@link ProdDoptProvider} for local/offline testing.
 *
 * @see {@link ProdDoptProvider}
 *
 * @alpha
 */
export function MockDoptProvider(props: MockProviderConfig) {
  const { mocks = { blocks: {}, flows: new Mercator() }, logLevel } = props;
  const [blocks, setBlocks] = useState<Blocks>({ ...mocks.blocks });
  const [flows] = useState<Flows>(mocks.flows);

  const [flowBlocks, setFlowBlocks] = useState<
    Mercator<[Flow['sid'], Flow['version']], Block['uid'][]>
  >(new Mercator());

  const [blockFields, setBlockFields] = useState<
    Map<Block['uid'], Map<Field['sid'], Field>>
  >(new Map());

  const flowStatuses: Record<Flow['sid'], FlowStatus> = {};

  flows.forEach((flow) => {
    flowStatuses[flow.sid] = { pending: false, failed: false };

    setFlowBlocks((prev) => {
      return new Mercator(
        Array.from(
          prev.set(
            [flow.sid, flow.version],
            flow.blocks?.map(({ uid }) => uid) || []
          )
        )
      );
    });
  });

  setBlockFields(
    Object.values(blocks).reduce((map, block) => {
      if (block.type === ModelTypeConst) {
        map.set(
          block.uid,
          (block.fields || []).reduce((map, field) => {
            return map.set(field.sid, field);
          }, new Map<Field['sid'], Field>())
        );
      }

      return map;
    }, new Map<Block['uid'], Map<Field['sid'], Field>>())
  );

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
    stateChanges: Partial<Block['state']>
  ) {
    const block = blocks[identifier];

    if (block && validIntentState(block)) {
      const changed = Object.assign(block, { state: { ...stateChanges } });

      setBlocks({
        ...blocks,
        [identifier]: {
          ...changed,
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
        active: false,
        completed: true,
      }),
    next: async (identifier) =>
      updateState(blocks, identifier, {
        active: false,
        completed: true,
      }),
    prev: async (identifier) =>
      updateState(blocks, identifier, {
        active: false,
        completed: false,
      }),
    goTo: async (identifier, goToUid) => {
      updateState(blocks, identifier, {
        active: false,
      });
      updateState(blocks, goToUid || '', {
        active: true,
      });
    },
  };

  return (
    <DoptContext.Provider
      value={{
        fetching: false,
        flowStatuses,
        blockIntention,
        blocks,
        blockFields,
        flowBlocks,
        flows,
        flowIntention,
        log,
      }}
    >
      {props.children}
    </DoptContext.Provider>
  );
}
