import { useContext, useCallback } from 'react';
import { DoptContext } from './context';

import { getDefaultBlockState } from '@dopt/javascript-common';

import {
  Block as BlockType,
  FIELD_VALUE_UNION_TYPE,
  ModelTypeConst,
} from '@dopt/block-types';

/**
 * Methods corresponding to an intent-based API for
 * signaling state transitions of a block. These methods
 * have side effects: they change the state of other blocks
 * and the flow as well. For example, completing a block
 * activates the next block and completing the last block
 * completes a flow.
 */
export interface BlockIntentions {
  /**
   * Signals that the experience this {@link Block} powers has
   * finished. A noop if the {@link Block} isn't active. Results
   * in a flow transition.
   *
   * @modifies
   *
   * Sets {@link Block['state']['completed']} to true
   * Sets {@link Block['state']['active']} to false
   */
  complete: () => void | undefined;
}

export type BlockWithGetField = BlockType & {
  /**
   * Gets the field (see {@link Field['value']}) with the `name` contained by this {@link Block}.
   * If the {@link Block} does not have the field, the `defaultValue`
   * is returned if provided. Otherwise, `null` is returned.
   */
  getField: <T extends FIELD_VALUE_UNION_TYPE>(
    name: string,
    defaultValue?: T
  ) => T | null;
};

/**
 * A React hook for accessing a flow's block state and
 * methods corresponding to an intent-based API for manipulating
 * said state.
 *
 * @example
 * ```tsx
 * import { useBlock } from "@dopt/react";
 * import { Modal } from "@your-company/modal";
 *
 * export function Application() {
 *   const [block, intent] = useBlock("HNWvcT78tyTwygnbzU6SW");
 *   return (
 *     <main>
 *       <Modal isOpen={block.state.active}>
 *         <h1>👏 Welcome to our app!</h1>
 *         <p>This is your onboarding experience!</p>
 *         <button onClick={intent.complete}>Close me</button>
 *       </Modal>
 *     </main>
 *   );
 * }
 * ```
 *
 * @param id - one of {@link BlockWithGetField['sid']} | {@link BlockWithGetField['uid']}
 * this param accepts either the user defined identifier (sid) or the system created identifier (the uid)
 * @returns [{@link BlockWithGetField}, {@link BlockIntentions}] the state of the block and methods to manipulate said state
 *
 */
const useBlock = (
  id: string
): [block: BlockWithGetField, intent: BlockIntentions] => {
  const { fetching, blocks, blockIntention, log, blockFields, blockUidBySid } =
    useContext(DoptContext);
  const uid = blockUidBySid.get(id) || id;

  const complete = useCallback(() => {
    if (!fetching) {
      blockIntention.complete(uid);
    }
  }, [fetching, blockIntention]);

  if (fetching) {
    log.info(
      'Accessing block prior to initialization will return default block states.'
    );
  }

  const block =
    fetching || !blocks[uid] ? getDefaultBlockState(uid, id) : blocks[uid];

  const getField: BlockWithGetField['getField'] = useCallback(
    <T extends FIELD_VALUE_UNION_TYPE>(name: string, defaultValue?: T) => {
      const fieldMap = blockFields.get(block.uid);

      if (fieldMap == null || block.type !== ModelTypeConst) {
        return null;
      }

      const value = fieldMap.get(name)?.value;

      return value != null
        ? (value as T)
        : defaultValue != null
        ? defaultValue
        : null;
    },
    [fetching, block]
  );

  return [{ ...block, getField }, { complete }];
};

export { useBlock };
