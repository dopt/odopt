import React from 'react';

import { fireEvent, render, RenderResult } from '@testing-library/react';

import Card from '../';
import * as CardSdl from '@dopt/semantic-data-layer-card';

const CardTest = (props: Partial<CardSdl.Card>) => (
  <Card.Root active={props.active}>
    <Card.Content>
      <Card.Header>
        <Card.Title>{props.title}</Card.Title>
        <Card.DismissIcon onClick={props.dismiss} />
      </Card.Header>
      <Card.Body>{props.body}</Card.Body>
      <Card.Footer>
        <Card.DismissButton onClick={props.dismiss}>
          {props.dismissLabel}
        </Card.DismissButton>
        <Card.CompleteButton onClick={props.complete}>
          {props.completeLabel}
        </Card.CompleteButton>
      </Card.Footer>
    </Card.Content>
  </Card.Root>
);

const MODAL_TITLE = 'Card Title';

describe('@dopt/react-card', () => {
  let rendered: RenderResult;
  let container: HTMLElement;

  describe('visibility', () => {
    it('opens card when active props is truthy', () => {
      rendered = render(<CardTest active={true} />);
      container = rendered.container.parentNode as HTMLElement;
      expect(container.querySelector('.dopt-card')).not.toBeNull();
    });

    it('closes card when active props is false', () => {
      rendered = render(<CardTest active={false} />);
      container = rendered.container.parentNode as HTMLElement;
      expect(container.querySelector('.dopt-card')).toBeNull();
    });
  });

  describe('title field', () => {
    it('renders a title if non-null title is returned from API', () => {
      const card = render(<CardTest active={true} title={MODAL_TITLE} />);
      expect(card.queryByText(MODAL_TITLE)).not.toBeNull();
    });
    it('adds the correct static class to the title element', () => {
      const card = render(<CardTest active={true} title={MODAL_TITLE} />);
      const title = card.getByText(MODAL_TITLE);
      expect(title.classList.contains('dopt-card__title')).toBe(true);
    });
    it('does not render a title if title not provided', () => {
      const card = render(<CardTest active={true} />);
      expect(card.queryByText(MODAL_TITLE)).toBeNull();
    });
  });

  describe('body field', () => {
    it('renders a body if non-null body is returned from API', () => {
      const card = render(
        <CardTest
          active={true}
          body={[
            {
              type: 'paragraph',
              children: [{ text: 'CardBody' }],
            },
          ]}
        />
      );
      expect(card.queryByText('CardBody')).not.toBeNull();
    });
    it('adds the correct static class to the body element', () => {
      const card = render(
        <CardTest
          active={true}
          body={[
            {
              type: 'paragraph',
              children: [{ text: 'CardBody' }],
            },
          ]}
        />
      );
      const body = card.container.parentNode as HTMLElement;
      expect(body.querySelector('.dopt-card__body')).not.toBeNull();
    });
    it('does not render a title if title text is null', () => {
      const card = render(<CardTest active={true} />);
      expect(card.queryByText('CardBody')).toBeNull();
      const body = card.container.parentNode as HTMLElement;
      expect(body.querySelector('.dopt-card__body')).toBeNull();
    });
  });

  describe('dismissLabel field', () => {
    it('renders a dismiss button if non-null dismissLabel is returned from API', () => {
      const card = render(<CardTest active={true} dismissLabel="dismiss" />);
      expect(card.queryByText('dismiss')).not.toBeNull();
    });
    it('adds the correct static class to the dismiss button element', () => {
      const card = render(<CardTest active={true} dismissLabel="dismiss" />);
      const body = card.container.parentNode as HTMLElement;
      expect(body.querySelector('.dopt-card__dismiss-button')).not.toBeNull();
    });
    it('does not render a dismiss button if dissmissLabel is null', () => {
      const card = render(<CardTest active={true} />);
      expect(card.queryByText('dismiss')).toBeNull();
      const body = card.container.parentNode as HTMLElement;
      expect(body.querySelector('.dopt-card__dismiss-button')).toBeNull();
    });
  });

  describe('completeLabel field', () => {
    it('renders a complete button if non-null completeLabel is returned from API', () => {
      const card = render(<CardTest active={true} completeLabel="complete" />);
      expect(card.queryByText('complete')).not.toBeNull();
    });
    it('adds the correct static class to the complete button element', () => {
      const card = render(<CardTest active={true} completeLabel="complete" />);
      const body = card.container.parentNode as HTMLElement;
      expect(body.querySelector('.dopt-card__complete-button')).not.toBeNull();
    });
    it('does not render a complete button if dissmissLabel is null', () => {
      const card = render(<CardTest active={true} />);
      expect(card.queryByText('complete')).toBeNull();
      const body = card.container.parentNode as HTMLElement;
      expect(body.querySelector('.dopt-card__complete-button')).toBeNull();
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
      const card = render(
        <CardTest
          active={true}
          completeLabel="complete"
          complete={onClickHandler}
        />
      );
      fireEvent.click(card.getByText('complete'));
      expect(onClickHandler).toHaveBeenCalledTimes(1);
    });

    it('it wires the onClick handler for dismiss button correctly', () => {
      const card = render(
        <CardTest
          active={true}
          dismissLabel="dismiss"
          dismiss={onClickHandler}
        />
      );
      fireEvent.click(card.getByText('dismiss'));
      expect(onClickHandler).toHaveBeenCalledTimes(1);
    });
  });
});
