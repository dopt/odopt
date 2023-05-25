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

  const field: Block<T>['field'] = <V extends Field['value']>(
    name: string,
    defaultValue?: V
  ) => {
    const fieldMap = blockFields.get(block.uid);

    if (fetching || fieldMap == null) {
      return null;
    }

    const value = fieldMap.get(name)?.value;

    return value != null
      ? (value as V)
      : defaultValue != null
      ? defaultValue
      : null;
  };

  return { ...block, transitioned, field, transition };
}
