import { getDefaultBlockState } from '@dopt/javascript-common';
import type { DoptContext } from './context';
import { Block, BlockTransitionInputs, Field } from './types';

export function createBlock<T>({
  uid,
  fetching,
  blocks,
  blockFields,
  blockIntention,
}: {
  uid: string;
  fetching: DoptContext['fetching'];
  blocks: DoptContext['blocks'];
  blockFields: DoptContext['blockFields'];
  blockIntention: DoptContext['blockIntention'];
}): Block<T> {
  const block =
    fetching || !blocks[uid] ? getDefaultBlockState(uid, uid, -1) : blocks[uid];

  // overwrite the type of transitioned using generics
  const transitioned = block.transitioned as Block<T>['transitioned'];

  const transition = (...inputs: BlockTransitionInputs) => {
    if (!fetching) {
      blockIntention(uid, inputs);
    }
  };

  const field: Block<T>['field'] = <V extends Field['value']>(name: string) => {
    const fieldMap = blockFields.get(block.uid);

    /**
     * If:
     * - Dopt is still fetching (loading)
     * - a Block doesn't have fields
     * - a Block doesn't have the specified field
     * we return `undefined`.
     */
    if (fetching || fieldMap == null || !fieldMap.get(name)) {
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
