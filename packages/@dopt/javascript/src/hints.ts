import { Block, BlockProps } from './block';
import { Container } from './container';
import {
  HintsItem as HintsItemInterface,
  Hints as HintsInterface,
  FilterableField,
  CountableField,
} from '@dopt/semantic-data-layer-hints';
import type { Children } from '@dopt/core-rich-text';

/**
 * A hints class obeys the hints interface
 * specified in @dopt/semantic-data-layer-hints.
 *
 * It also extends the {@link Container} class.
 *
 * By extending the Container class, it also offers
 * the `subscribe` method specified in {@link Container}.
 * `subscribe` allows you to register a listener
 * for any state change to a hints component or its
 * hints item children.
 */
export class Hints extends Container<HintsItem> implements HintsInterface {
  get id() {
    return this.sid;
  }
  get active() {
    return this.state.active;
  }
  get completed() {
    return this.state.exited && !!this.transitioned.complete;
  }
  get dismissed() {
    return this.state.exited && !!this.transitioned.dismiss;
  }
  complete() {
    this.transition('complete');
  }
  dismiss() {
    this.transition('dismiss');
  }
  get items() {
    return this.children.sort((a, b) => (a.index || 0) - (b.index || 0));
  }
  get size() {
    return this.childrenUids.length;
  }
  filter(on: FilterableField) {
    return this.items.filter((item) => {
      switch (on) {
        case 'active':
          return item.active;
        case 'not-active':
          return !item.active;
        case 'completed':
          return item.completed;
        case 'not-completed':
          return !item.completed;
        case 'dismissed':
          return item.dismissed;
        case 'not-dismissed':
          return !item.dismissed;
        case 'done':
          return item.completed || item.dismissed;
        case 'not-done':
          return !(item.completed || item.dismissed);
      }
    });
  }
  count(on: CountableField) {
    return this.filter(on).length;
  }
  protected childBlockCreator(props: BlockProps) {
    return new HintsItem({
      ...props,
      hints: () => this,
    });
  }
}

export class HintsItem
  extends Block<['complete', 'dismiss']>
  implements HintsItemInterface
{
  private _hints: () => Hints | undefined;

  /**
   * @internal
   */
  constructor({
    hints,
    ...blockProps
  }: BlockProps & { hints: () => Hints | undefined }) {
    super(blockProps);
    this._hints = hints;
  }

  get id() {
    return this.sid;
  }
  get hints() {
    return this._hints();
  }
  get active() {
    return this.state.active;
  }
  get completed() {
    return this.state.exited && !!this.transitioned.complete;
  }
  get dismissed() {
    return this.state.exited && !!this.transitioned.dismiss;
  }
  get done() {
    return !!(this.transitioned.complete || this.transitioned.dismiss);
  }
  complete() {
    this.transition('complete');
  }
  dismiss() {
    this.transition('dismiss');
  }
  get completeLabel() {
    return this.field<string>('complete-label');
  }
  get dismissAllLabel() {
    return this.field<string>('dismiss-all-label');
  }
  get title() {
    return this.field<string>('title');
  }
  get body() {
    return this.field<Children>('body');
  }
  get index() {
    return this.field<number>('display-index');
  }
}
