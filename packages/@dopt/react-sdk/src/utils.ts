import { Block, Blocks, MockProviderConfig, ProviderConfig } from './types';

export function isMockProviderProps(
  props: ProviderConfig | MockProviderConfig
): props is MockProviderConfig {
  return !!(props as MockProviderConfig).mocks;
}

export function updatedBlocksAsMap(updated: Block[]) {
  return updated.reduce<Blocks>((blocks, block) => {
    blocks[block.uuid] = block;
    return blocks;
  }, {});
}
