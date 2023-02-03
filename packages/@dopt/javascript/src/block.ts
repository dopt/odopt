import { blocksApi } from '@dopt/javascript-common';
import {
  Block as BlockType,
  BlockIntent,
  FIELD_VALUE_UNION_TYPE,
  ModelTypeConst,
  SetTypeConst,
  Field,
} from '@dopt/block-types';

import { blockStore } from './store';

function resolveBlock(block: BlockType): BlockType {
  return blockStore.getState()[block.uid] || block;
}

interface Props {
  intent: ReturnType<typeof blocksApi>['blockIntent'];
  block: BlockType;
}

class Block {
  private intent: Props['intent'];
  private block: Props['block'];
  private fieldMap: Map<Field['sid'], FIELD_VALUE_UNION_TYPE>;

  constructor({ block, intent }: Props) {
    this.intent = intent;
    this.block = block;
    if (this.block.type === ModelTypeConst) {
      this.fieldMap = this.block.fields.reduce((map, field) => {
        return map.set(field.sid, field.value);
      }, new Map<Field['sid'], FIELD_VALUE_UNION_TYPE>());
    }
  }

  private async _intent(intent: BlockIntent, goToUid?: string) {
    const { uid, version } = this.block;
    return this.intent({ uid, version, intent, goToUid });
  }

  getField<T extends FIELD_VALUE_UNION_TYPE>(
    name: string,
    defaultValue?: T
  ): T | null {
    if (this.block.type !== ModelTypeConst) {
      return null;
    }

    const value = this.fieldMap.get(name);
    return value != null
      ? (value as T)
      : defaultValue != null
      ? defaultValue
      : null;
  }

  state(): BlockType['state'] {
    return resolveBlock(this.block).state;
  }

  async complete() {
    return this._intent('complete');
  }

  async next() {
    if (this.block.type === SetTypeConst && this.block.ordered) {
      return this._intent('next');
    }
  }

  async prev() {
    if (this.block.type === SetTypeConst && this.block.ordered) {
      return this._intent('prev');
    }
  }

  async goTo(uid: string) {
    if (this.block.type === SetTypeConst && this.block.ordered) {
      return this._intent('goTo', uid);
    }
  }

  getCompleted(): BlockType[] {
    if (this.block.type === SetTypeConst) {
      return this.block.blocks
        ?.map(resolveBlock)
        .filter(({ state }) => state.completed);
    }

    return [];
  }
  getUncompleted(): BlockType[] {
    if (this.block.type === SetTypeConst) {
      return this.block.blocks
        ?.map(resolveBlock)
        .filter(({ state }) => !state.completed);
    }

    return [];
  }
  getActive(): BlockType[] {
    if (this.block.type === SetTypeConst) {
      return this.block.blocks
        ?.map(resolveBlock)
        .filter(({ state }) => state.active);
    }

    return [];
  }
  getInactive(): BlockType[] {
    if (this.block.type === SetTypeConst) {
      return this.block.blocks
        ?.map(resolveBlock)
        .filter(({ state }) => !state.active);
    }

    return [];
  }
  subscribe(listener: (block: BlockType) => void) {
    blockStore.subscribe((blocks) => blocks[this.block.uid], listener);
  }
}

export { Block };
