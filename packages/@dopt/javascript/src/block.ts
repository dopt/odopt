import { blocksApi } from '@dopt/javascript-common';
import { Block as BlockType, BlockIntent } from '@dopt/block-types';

import { blockStore } from './store';

interface Props {
  intent: ReturnType<typeof blocksApi>['blockIntent'];
  block: BlockType;
}

class Block {
  private intent: Props['intent'];
  private block: Props['block'];

  constructor({ block, intent }: Props) {
    this.intent = intent;
    this.block = block;
  }

  private _intent(intent: BlockIntent) {
    const { uid, version } = this.block;
    return this.intent({ uid, version, intent });
  }

  state(): BlockType['state'] {
    return this.block.state;
  }

  complete() {
    return this._intent('complete');
  }

  subscribe(listener: (block: BlockType) => void) {
    blockStore.subscribe((blocks) => blocks[this.block.uid], listener);
  }
}

export { Block };
