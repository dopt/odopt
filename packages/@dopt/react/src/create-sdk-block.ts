import { getDefaultBlockState } from '@dopt/javascript-common';

import type { FlowContext } from './flow-provider';
import { Block, BlockTransitionInputs, Field } from './types';

export function createBlock<T>({
  uid,
  uninitialized,
  blocks,
  blockFields,
  blockIntention,
}: {
  uid: string;
  uninitialized: FlowContext['uninitialized'];
  blocks: FlowContext['blocks'];
  blockFields: FlowContext['blockFields'];
  blockIntention: FlowContext['blockIntention'];
}): Block<T> {
  const block =
    uninitialized || !blocks[uid]
      ? getDefaultBlockState(uid, uid, -1)
      : blocks[uid];

  // overwrite the type of transitioned using generics
  const transitioned = block.transitioned as Block<T>['transitioned'];

  const transition = (...inputs: BlockTransitionInputs) => {
    if (!uninitialized) {
      blockIntention(uid, inputs);
    }
  };

  const field: Block<T>['field'] = <V extends Field['value']>(name: string) => {
    const fieldMap = blockFields.get(block.uid);

    /**
     * If:
     * - Dopt is uninitialized
     * - a Block doesn't have fields
     * - a Block doesn't have the specified field
     * we return `undefined`.
     */
    if (uninitialized || fieldMap == null || !fieldMap.get(name)) {
      return undefined;
    }

    /**
     * We return `null` for a value if
     * that value has been explicitly configured in
     * Dopt to not have a value.
     */
    const { value } = fieldMap.get(name) ?? { value: null };

    return value == null ? (value as null) : (value as V);
  };

  return { ...block, transitioned, field, transition };
}
