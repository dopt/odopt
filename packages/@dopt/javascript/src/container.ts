import { blockStore } from './store';
import { Block, BlockProps } from './block';

interface ContainerProps extends BlockProps {
  createBlock: <C extends Block>(
    uid: string,
    creator: (_: BlockProps) => C
  ) => C;
}

export abstract class Container<C extends Block> extends Block<
  ['complete', 'dismiss']
> {
  private createBlock: ContainerProps['createBlock'];

  /**
   * @internal
   */
  constructor({ createBlock, ...blockProps }: ContainerProps) {
    super(blockProps);
    this.createBlock = createBlock;
  }

  protected childUids(): string[] {
    const blocks = blockStore.getState();
    return Object.values(blocks)
      .filter((block) => block.containerUid === this.uid)
      .map((block) => block.uid);
  }

  protected abstract childBlockCreator(_: BlockProps): C;

  /**
   * Returns all the block children of this {@link Container}.
   *
   * @remarks
   * Blocks returned by this method have type {@link Block}.
   *
   * @example
   * ```js
   * const data = container.children();
   *
   * // can access state properties safely
   * const states = data.map(({ state }) => state);
   *
   * // to transition these blocks
   * data.map(block => block.transition('default'));
   * ```
   *
   * @returns An array of {@link Block} which are contained within this flow.
   */
  get children(): C[] {
    return this.childUids().map((uid) =>
      this.createBlock(uid, this.childBlockCreator)
    );
  }

  /**
   * Subscribe to changes on this block **or** on any of its children.
   *
   * This method differs from the {@link Block} `subscribe` method
   * in that it is triggered if the container **or** any of its
   * children change.
   *
   * @example
   * ```js
   * const container = dopt.container("my-flow.my-container");
   * const unsubscribe = container.subscribe(async (container: Container) => {
   *   if (container.state.exited) {
   *     await showModal("Yay, you've completed all steps");
   *     unsubscribe();
   *   } else {
   *     await showModal(`${
   *       container
   *         .children()
   *         .filter(({ state }) => state.exited)
   *         .length
   *     } step(s) completed`);
   *   }
   * });
   * ```
   *
   * @param listener
   * The listener function is called with this {@link Container} instance.
   *
   * @returns A function which can be called to unsubscribe the listener.
   */
  subscribe(listener: (container: Container<C>) => void) {
    return blockStore.subscribe(
      (blocks) => {
        /**
         * The subscribed state of a container is **actually**
         * the combined state of itself and all its children.
         *
         * We sort the uids to keep the equality check below stable.
         */
        const uids = [this.uid, ...this.childUids()].sort();
        return uids.map((uid) => blocks[uid]);
      },
      () => listener(this),
      {
        equalityFn: (next, previous) => {
          /**
           * We check that the contents of the two arrays are
           * shallow equal (`Object.is` equality). Above, when
           * subscribing, we sort the arrays to make sure
           * that the returned objects will be ordered by uid.
           */
          return (
            Array.isArray(next) &&
            Array.isArray(previous) &&
            next.length === previous.length &&
            next.every((item, index) => Object.is(item, previous[index]))
          );
        },
      }
    );
  }
}
