import { Block, BlockProps } from './block';
import { Container } from './container';
import {
  ChecklistItem as ChecklistItemInterface,
  Checklist as ChecklistInterface,
  FilterableField,
  CountableField,
} from '@dopt/semantic-data-layer-checklist';
import { RichText } from '@dopt/core-rich-text';

/**
 * A checklist class obeys the checklist interface
 * specified in @dopt/semantic-data-layer-checklist.
 *
 * It also extends the {@link Container} class.
 *
 * By extending the Container class, it also offers
 * the `subscribe` method specified in {@link Container}.
 * `subscribe` allows you to register a listener
 * for any state change to a checklist component or its
 * checklist item children.
 */
export class Checklist
  extends Container<ChecklistItem>
  implements ChecklistInterface
{
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
  get title() {
    return this.field<string>('title');
  }
  get body() {
    return this.field<RichText>('body');
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
        case 'skipped':
          return item.skipped;
        case 'not-skipped':
          return !item.skipped;
        case 'done':
          return item.completed || item.skipped;
        case 'not-done':
          return !(item.completed || item.skipped);
      }
    });
  }
  count(on: CountableField) {
    return this.filter(on).length;
  }
  protected childBlockCreator(props: BlockProps) {
    return new ChecklistItem(props);
  }
}

export class ChecklistItem
  extends Block<['complete', 'skip']>
  implements ChecklistItemInterface
{
  get id() {
    return this.sid;
  }
  get active() {
    return this.state.active;
  }
  get completed() {
    return this.state.exited && !!this.transitioned.complete;
  }
  get skipped() {
    return this.state.exited && !!this.transitioned.skip;
  }
  get done() {
    return !!(this.transitioned.complete || this.transitioned.skip);
  }
  complete() {
    this.transition('complete');
  }
  skip() {
    this.transition('skip');
  }
  get completeLabel() {
    return this.field<string>('complete-label');
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
