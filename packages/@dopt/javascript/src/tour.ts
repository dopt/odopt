import { Block, BlockProps } from './block';
import { Container } from './container';
import {
  TourItem as TourItemInterface,
  Tour as TourInterface,
  FilterableField,
  CountableField,
} from '@dopt/semantic-data-layer-tour';
import { RichText } from '@dopt/core-rich-text';

/**
 * A tour class obeys the tour interface
 * specified in @dopt/semantic-data-layer-tour.
 *
 * It also extends the {@link Container} class.
 *
 * By extending the Container class, it also offers
 * the `subscribe` method specified in {@link Container}.
 * `subscribe` allows you to register a listener
 * for any state change to a tour component or its
 * tour item children.
 */
export class Tour extends Container<TourItem> implements TourInterface {
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
    return this.childUids.length;
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
      }
    });
  }
  count(on: CountableField) {
    return this.filter(on).length;
  }
  protected childBlockCreator(props: BlockProps) {
    return new TourItem({
      ...props,
      tour: () => this,
    });
  }
}

export class TourItem
  extends Block<['next', 'previous']>
  implements TourItemInterface
{
  private _tour: () => Tour;

  /**
   * @internal
   */
  constructor({ tour, ...blockProps }: BlockProps & { tour: () => Tour }) {
    super(blockProps);
    this._tour = tour;
  }

  get id() {
    return this.sid;
  }
  get active() {
    return this.state.active;
  }
  get completed() {
    return this.state.exited && !!this.transitioned.next;
  }
  get tour() {
    return this._tour();
  }
  next() {
    this.transition('next');
  }
  back() {
    this.transition('previous');
  }
  get nextLabel() {
    return this.field<string>('next-label');
  }
  get backLabel() {
    return this.field<string>('back-label');
  }
  get title() {
    return this.field<string>('title');
  }
  get body() {
    return this.field<RichText>('body');
  }
  get index() {
    return this.field<number>('display-index');
  }
}
