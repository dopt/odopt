import { Block } from './block';
import { Modal as ModalInterface } from '@dopt/semantic-data-layer-modal';

/**
 * A modal class obeys the modal interface
 * specified in @dopt/semantic-data-layer-modal.
 *
 * It also extends the {@link Block} class.
 *
 * By extending the Block class, it also offers
 * the `subscribe` method specified in {@link Block}.
 * `subscribe` allows you to register a listener
 * for any state change to a modal component.
 */
export class Modal
  extends Block<['complete', 'dismiss']>
  implements ModalInterface
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
  get completeLabel() {
    return this.field<string>('complete-label');
  }
  get dismissLabel() {
    return this.field<string>('dismiss-label');
  }
  get title() {
    return this.field<string>('title');
  }
  get body() {
    return this.field<string>('body');
  }
}
