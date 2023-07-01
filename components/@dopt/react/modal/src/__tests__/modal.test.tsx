import { fireEvent, render, RenderResult } from '@testing-library/react';

import * as Modal from '../';
import * as ModalSdl from '@dopt/semantic-data-layer-modal';

const ModalTest = (props: Partial<ModalSdl.Modal>) => (
  <Modal.Root active={props.active}>
    <Modal.Overlay />
    <Modal.Content>
      <Modal.Header>
        <Modal.Title>{props.title}</Modal.Title>
        <Modal.DismissIcon onClick={props.dismiss} />
      </Modal.Header>
      <Modal.Body>{props.body}</Modal.Body>
      <Modal.Footer>
        <Modal.DismissButton onClick={props.dismiss}>
          {props.dismissLabel}
        </Modal.DismissButton>
        <Modal.CompleteButton onClick={props.complete}>
          {props.completeLabel}
        </Modal.CompleteButton>
      </Modal.Footer>
    </Modal.Content>
  </Modal.Root>
);

const MODAL_TITLE = 'Modal Title';

describe('@dopt/react-modal', () => {
  let rendered: RenderResult;
  let container: HTMLElement;

  describe('visibility', () => {
    it('opens modal when active props is truthy', () => {
      rendered = render(<ModalTest active={true} />);
      container = rendered.container.parentNode as HTMLElement;
      expect(container.querySelector('.dopt-modal')).not.toBeNull();
    });

    it('closes modal when active props is false', () => {
      rendered = render(<ModalTest active={false} />);
      container = rendered.container.parentNode as HTMLElement;
      expect(container.querySelector('.dopt-modal')).toBeNull();
    });
  });

  describe('title field', () => {
    it('renders a title if non-null title is returned from API', () => {
      const modal = render(<ModalTest active={true} title={MODAL_TITLE} />);
      expect(modal.queryByText(MODAL_TITLE)).not.toBeNull();
    });
    it('adds the correct static class to the title element', () => {
      const modal = render(<ModalTest active={true} title={MODAL_TITLE} />);
      const title = modal.getByText(MODAL_TITLE);
      expect(title.classList.contains('dopt-modal__title')).toBe(true);
    });
    it('does not render a title if title not provided', () => {
      const modal = render(<ModalTest active={true} />);
      expect(modal.queryByText(MODAL_TITLE)).toBeNull();
    });
  });

  describe('body field', () => {
    it('renders a body if non-null body is returned from API', () => {
      const modal = render(
        <ModalTest
          active={true}
          body={[
            {
              type: 'paragraph',
              children: [{ text: 'ModalBody' }],
            },
          ]}
        />
      );
      expect(modal.queryByText('ModalBody')).not.toBeNull();
    });
    it('adds the correct static class to the body element', () => {
      const modal = render(
        <ModalTest
          active={true}
          body={[
            {
              type: 'paragraph',
              children: [{ text: 'ModalBody' }],
            },
          ]}
        />
      );
      const body = modal.container.parentNode as HTMLElement;
      expect(body.querySelector('.dopt-modal__body')).not.toBeNull();
    });
    it('does not render a title if title text is null', () => {
      const modal = render(<ModalTest active={true} />);
      expect(modal.queryByText('ModalBody')).toBeNull();
      const body = modal.container.parentNode as HTMLElement;
      expect(body.querySelector('.dopt-modal__body')).toBeNull();
    });
  });

  describe('dismissLabel field', () => {
    it('renders a dismiss button if non-null dismissLabel is returned from API', () => {
      const modal = render(<ModalTest active={true} dismissLabel="dismiss" />);
      expect(modal.queryByText('dismiss')).not.toBeNull();
    });
    it('adds the correct static class to the dismiss button element', () => {
      const modal = render(<ModalTest active={true} dismissLabel="dismiss" />);
      const body = modal.container.parentNode as HTMLElement;
      expect(body.querySelector('.dopt-modal__dismiss-button')).not.toBeNull();
    });
    it('does not render a dismiss button if dissmissLabel is null', () => {
      const modal = render(<ModalTest active={true} />);
      expect(modal.queryByText('dismiss')).toBeNull();
      const body = modal.container.parentNode as HTMLElement;
      expect(body.querySelector('.dopt-modal__dismiss-button')).toBeNull();
    });
  });

  describe('completeLabel field', () => {
    it('renders a complete button if non-null completeLabel is returned from API', () => {
      const modal = render(
        <ModalTest active={true} completeLabel="complete" />
      );
      expect(modal.queryByText('complete')).not.toBeNull();
    });
    it('adds the correct static class to the complete button element', () => {
      const modal = render(
        <ModalTest active={true} completeLabel="complete" />
      );
      const body = modal.container.parentNode as HTMLElement;
      expect(body.querySelector('.dopt-modal__complete-button')).not.toBeNull();
    });
    it('does not render a complete button if dissmissLabel is null', () => {
      const modal = render(<ModalTest active={true} />);
      expect(modal.queryByText('complete')).toBeNull();
      const body = modal.container.parentNode as HTMLElement;
      expect(body.querySelector('.dopt-modal__complete-button')).toBeNull();
    });
  });

  describe('actions', () => {
    let onClickHandler: ReturnType<typeof jest.fn>;
    beforeEach(() => {
      onClickHandler = jest.fn();
    });
    afterEach(() => {
      onClickHandler.mockReset();
    });

    it('it wires the onClick handler for complete button correctly', () => {
      const modal = render(
        <ModalTest
          active={true}
          completeLabel="complete"
          complete={onClickHandler}
        />
      );
      fireEvent.click(modal.getByText('complete'));
      expect(onClickHandler).toHaveBeenCalledTimes(1);
    });

    it('it wires the onClick handler for dismiss button correctly', () => {
      const modal = render(
        <ModalTest
          active={true}
          dismissLabel="dismiss"
          dismiss={onClickHandler}
        />
      );
      fireEvent.click(modal.getByText('dismiss'));
      expect(onClickHandler).toHaveBeenCalledTimes(1);
    });
  });
});
