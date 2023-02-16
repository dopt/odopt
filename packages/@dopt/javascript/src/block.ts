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
/**
 * @internal
 */
export interface BlockProps {
  intent: ReturnType<typeof blocksApi>['blockIntent'];
  block: BlockType;
  fieldMap: Map<Field['sid'], Field> | null;
}

export class Block {
  private intent: BlockProps['intent'];
  private block: BlockProps['block'];
  private fieldMap: BlockProps['fieldMap'];

  /**
   * @internal
   */
  constructor({ block, intent, fieldMap }: BlockProps) {
    this.intent = intent;
    this.block = block;
    this.fieldMap = fieldMap;
  }

  private async _intent(intent: BlockIntent, goToUid?: string) {
    const { uid, version } = this.block;
    return this.intent({ uid, version, intent, goToUid });
  }

  /**
   * Gets the field (see {@link FieldType['value']}) with the `name` contained by this {@link Block}.
   * If the {@link Block} does not have the field, the `defaultValue`
   * is returned if provided. Otherwise, `null` is returned.
   */
  getField<T extends FIELD_VALUE_UNION_TYPE>(
    name: string,
    defaultValue?: T
  ): T | null {
    if (this.block.type !== ModelTypeConst || this.fieldMap == null) {
      return null;
    }

    const value = this.fieldMap.get(name)?.value;

    return value != null
      ? (value as T)
      : defaultValue != null
      ? defaultValue
      : null;
  }

  /**
   * Returns the up-to-date state of this {@link Block} instance.
   *
   * @returns The state of this instance.
   */
  state(): BlockType['state'] {
    return resolveBlock(this.block).state;
  }

  /**
   * Complete this block. Will also update the state of others blocks within this flow (or the flow itself), as appropriate.
   *
   * @remarks
   * It is often unnecessary to wait for this function to resolve / reject.
   *
   * @returns A promise which resolves when this block has been completed successfully and rejects otherwise.
   */
  async complete() {
    return this._intent('complete');
  }

  /**
   * Go to the next block within an ordered group block. Returns an empty promise if this block instance isn't an ordered group.
   *
   * @remarks
   * It is often unnecessary to wait for this function to resolve / reject.
   *
   * @returns A promise which resolves when this block has been completed successfully and rejects otherwise.
   */
  async next() {
    if (this.block.type === SetTypeConst && this.block.ordered) {
      return this._intent('next');
    }
  }

  /**
   * Go to the previous block within an ordered group block. Returns an empty promise if this block instance isn't an ordered group.
   *
   * @remarks
   * It is often unnecessary to wait for this function to resolve / reject.
   *
   * @returns A promise which resolves when this block has been completed successfully and rejects otherwise.
   */
  async prev() {
    if (this.block.type === SetTypeConst && this.block.ordered) {
      return this._intent('prev');
    }
  }

  /**
   * Go to a specific block (by uid) within an ordered group block. Returns an empty promise if this block instance isn't an ordered group.
   *
   * @remarks
   * It is often unnecessary to wait for this function to resolve / reject.
   *
   * @param uid The uid of the child step block.
   *
   * @returns A promise which resolves when this block has been completed successfully and rejects otherwise.
   */
  async goTo(uid: BlockType['uid']) {
    if (this.block.type === SetTypeConst && this.block.ordered) {
      return this._intent('goTo', uid);
    }
  }

  /**
   * Returns all completed (`completed: true`) children of a group ({@link SetType}) block.
   *
   * @remarks
   * This returns an empty array if the instance is not of type {@link SetType}.
   *
   * @returns An array of {@link BlockType} objects. To access their classes, call `dopt.block` ({@link Dopt.block}).
   */
  getCompleted(): BlockType[] {
    if (this.block.type === SetTypeConst) {
      return this.block.blocks
        ?.map(resolveBlock)
        .filter(({ state }) => state.completed);
    }

    return [];
  }

  /**
   * Returns all uncompleted (`completed: false`) children of a group ({@link SetType}) block.
   *
   * @remarks
   * This returns an empty array if the instance is not of type {@link SetType}.
   *
   * @returns An array of {@link BlockType} objects. To access their classes, call `dopt.block` ({@link Dopt.block}).
   */
  getUncompleted(): BlockType[] {
    if (this.block.type === SetTypeConst) {
      return this.block.blocks
        ?.map(resolveBlock)
        .filter(({ state }) => !state.completed);
    }

    return [];
  }

  /**
   * Returns all active (`active: true`) children of a group ({@link SetType}) block.
   *
   * @remarks
   * This returns an empty array if the instance is not of type {@link SetType}.
   *
   * @returns An array of {@link BlockType} objects. To access their classes, call `dopt.block` ({@link Dopt.block}).
   */
  getActive(): BlockType[] {
    if (this.block.type === SetTypeConst) {
      return this.block.blocks
        ?.map(resolveBlock)
        .filter(({ state }) => state.active);
    }

    return [];
  }

  /**
   * Returns all inactive (`active: false`) children of a group ({@link SetType}) block.
   *
   * @remarks
   * This returns an empty array if the instance is not of type {@link SetType}.
   *
   * @returns An array of {@link BlockType} objects. To access their classes, call `dopt.block` ({@link Dopt.block}).
   */
  getInactive(): BlockType[] {
    if (this.block.type === SetTypeConst) {
      return this.block.blocks
        ?.map(resolveBlock)
        .filter(({ state }) => !state.active);
    }

    return [];
  }

  /**
   * Subscribe to changes on this block.
   *
   * @example
   * ```js
   * const block = dopt.block("HNWvcT78tyTwygnbzU6SW");
   * const unsubscribe = block.subscribe(async blockData => {
   *  // access .state instead of .state()
   *  // since block is an object of `BlockType`
   *  if (block.state.completed) {
   *     await showModal("Yay, you've completed your first step!");
   *     unsubscribe();
   *  }
   * });
   * ```
   *
   * @param listener
   * The listener function is called with a {@link BlockType} object.
   * You can use `dopt.block()` to access a {@link Block} instance instead.
   *
   * @returns A function which can be called to unsubscribe the listener.
   */
  subscribe(listener: (block: BlockType) => void) {
    return blockStore.subscribe((blocks) => blocks[this.block.uid], listener);
  }
}
