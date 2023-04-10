import { getDefaultBlockState } from '@dopt/javascript-common';
import type { DoptContext } from './context';
import { Block, Field } from './types';

export function createBlock<T>({
  uid,
  fetching,
  blocks,
  blockFields,
}: {
  uid: string;
  fetching: DoptContext['fetching'];
  blocks: DoptContext['blocks'];
  blockFields: DoptContext['blockFields'];
}): Block<T> {
  const block =
    fetching || !blocks[uid] ? getDefaultBlockState(uid, uid, -1) : blocks[uid];

  // overwrite the type of transitioned using generics
  const transitioned = block.transitioned as Block<T>['transitioned'];

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

  return { ...block, transitioned, field };
}
