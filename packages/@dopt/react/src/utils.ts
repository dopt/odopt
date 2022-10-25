import { Block, Blocks, MockProviderConfig, ProviderConfig } from './types';
export const PKG_VERSION = process.env.PKG_VERSION || '';
export const PKG_NAME = process.env.PKG_NAME || '';
/** @internal */
export function isMockProviderProps(
  props: ProviderConfig | MockProviderConfig
): props is MockProviderConfig {
  return !!(props as MockProviderConfig).mocks;
}

/** @internal */
export function updatedBlocksAsMap(updated: Block[]) {
  return updated.reduce<Blocks>((blocks, block) => {
    blocks[block.uuid] = block;
    return blocks;
  }, {});
}

export function getBlockDefaultState(identifier: string) {
  return {
    active: false,
    completed: false,
    exited: false,
    started: false,
    stopped: false,
    uuid: identifier,
  };
}
