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

  private _intent(intent: BlockIntent, goToUid?: string) {
    const { uid, version } = this.block;
    return this.intent({ uid, version, intent, goToUid });
  }

  state(): BlockType['state'] {
    return this.block.state;
  }

  complete() {
    return this._intent('complete');
  }

  next() {
    if (this.block.type === 'set' && this.block.ordered) {
      return this._intent('next');
    }
  }

  prev() {
    if (this.block.type === 'set' && this.block.ordered) {
      return this._intent('prev');
    }
  }

  goTo(uid: string) {
    if (this.block.type === 'set' && this.block.ordered) {
      return this._intent('goTo', uid);
    }
  }

  getCompleted() {
    if (this.block.type === 'set') {
      return this.block.blocks?.filter((b) => b.state.completed);
    }
  }
  getUncompleted() {
    if (this.block.type === 'set') {
      return this.block.blocks?.filter((b) => !b.state.completed);
    }
  }
  getActive() {
    if (this.block.type === 'set') {
      return this.block.blocks?.filter((b) => b.state.active);
    }
  }
  getInactive() {
    if (this.block.type === 'set') {
      return this.block.blocks?.filter((b) => !b.state.active);
    }
  }
  subscribe(listener: (block: BlockType) => void) {
    blockStore.subscribe((blocks) => blocks[this.block.uid], listener);
  }
}

export { Block };
