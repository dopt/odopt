import React from 'react';

import { fireEvent, render, RenderResult } from '@testing-library/react';

import Hints, { useHintsItem } from '../';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

const HintsTest = (props: Partial<ReturnType<typeof useHintsItem>>) => (
  <Hints.Root active={props.active}>
    <Hints.Anchor>
      <button style={{ position: 'relative' }}>
        ANCHOR #1
        <Hints.Indicator
          //@ts-ignore
          onClick={() => props?.setOpen(!props.open)}
          style={{
            bottom: -8,
            right: -8,
          }}
        />
      </button>
    </Hints.Anchor>
    <Hints.Popover position="bottom" open={props.open}>
      <Hints.Content>
        <Hints.Header>
          <Hints.Title>{props.title}</Hints.Title>
          {/*@ts-ignore*/}
          <Hints.CloseIcon onClick={() => props?.setOpen(false)} />
        </Hints.Header>
        <Hints.Body>{props.body}</Hints.Body>
        <Hints.Footer>
          <Hints.CompleteButton onClick={props.complete}>
            {props.completeLabel}
          </Hints.CompleteButton>
          <Hints.DismissAllButton onClick={props.dismiss}>
            {props.dismissAllLabel}
          </Hints.DismissAllButton>
        </Hints.Footer>
      </Hints.Content>
    </Hints.Popover>
  </Hints.Root>
);

describe('@dopt/react-hints', () => {
  let rendered: RenderResult;
  let container: HTMLElement;

  describe('visibility', () => {
    it('renders hints item correctly when active props is true', () => {
      rendered = render(<HintsTest active={true} open={true} />);
      container = rendered.container.parentNode as HTMLElement;
      expect(container.querySelector('.dopt-hints-item')).not.toBeNull();
    });
    it('closes hints item when active prop is false', () => {
      rendered = render(<HintsTest active={false} open={true} />);
      container = rendered.container.parentNode as HTMLElement;
      expect(container.querySelector('.dopt-hints')).toBeNull();
    });
  });

  describe('title field', () => {
    it('renders a title if non-null title is returned from API', () => {
      const hints = render(
        <HintsTest active={true} open={true} title={'title'} />
      );
      expect(hints.queryByText('title')).not.toBeNull();
    });
    it('adds the correct static class to the title element', () => {
      const hints = render(
        <HintsTest active={true} open={true} title={'title'} />
      );
      const title = hints.getByText('title');
      expect(title.classList.contains('dopt-hints-item__title')).toBe(true);
    });
    it('does not render a title if title not provided', () => {
      const hints = render(<HintsTest active={true} open={true} />);
      expect(hints.queryByText('title')).toBeNull();
    });
  });

  describe('body field', () => {
    it('renders a body if non-null body is returned from API', () => {
      const hints = render(
        <HintsTest
          active={true}
          open={true}
          body={[
            {
              type: 'paragraph',
              children: [{ text: 'HintsBody' }],
            },
          ]}
        />
      );
      expect(hints.queryByText('HintsBody')).not.toBeNull();
    });
    it('adds the correct static class to the body element', () => {
      const hints = render(
        <HintsTest
          active={true}
          open={true}
          body={[
            {
              type: 'paragraph',
              children: [{ text: 'HintsBody' }],
            },
          ]}
        />
      );
      const body = hints.container.parentNode as HTMLElement;
      expect(body.querySelector('.dopt-hints-item__body')).not.toBeNull();
    });
    it('does not render a title if title text is null', () => {
      const hints = render(<HintsTest active={true} open={true} />);
      expect(hints.queryByText('HintsBody')).toBeNull();
      const body = hints.container.parentNode as HTMLElement;
      expect(body.querySelector('.dopt-hints-item__body')).toBeNull();
    });
  });

  describe('completeLabel field', () => {
    it('renders a next button if non-null completeLabel is returned from API', () => {
      const hints = render(
        <HintsTest active={true} open={true} completeLabel="complete" />
      );
      expect(hints.queryByText('complete')).not.toBeNull();
    });
    it('adds the correct static class to the complete button element', () => {
      const hints = render(
        <HintsTest active={true} open={true} completeLabel="complete" />
      );
      const body = hints.container.parentNode as HTMLElement;
      expect(
        body.querySelector('.dopt-hints-item__complete-button')
      ).not.toBeNull();
    });
    it('does not render a complete button if completeLabel is null', () => {
      const hints = render(<HintsTest active={true} />);
      expect(hints.queryByText('complete')).toBeNull();
      const body = hints.container.parentNode as HTMLElement;
      expect(
        body.querySelector('.dopt-hints-item__complete-button')
      ).toBeNull();
    });
  });

  describe('dismissAllLabel field', () => {
    it('renders a dismiss all button if non-null dismissAllLabel is returned from API', () => {
      const hints = render(
        <HintsTest active={true} open={true} dismissAllLabel="hide-tips" />
      );
      expect(hints.queryByText('hide-tips')).not.toBeNull();
    });
    it('adds the correct static class to the back button element', () => {
      const hints = render(
        <HintsTest active={true} open={true} dismissAllLabel="hide-tips" />
      );
      const body = hints.container.parentNode as HTMLElement;
      expect(
        body.querySelector('.dopt-hints-item__dismiss-all-button')
      ).not.toBeNull();
    });
    it('does not render a back button if dissmissLabel is null', () => {
      const hints = render(<HintsTest active={true} open={true} />);
      expect(hints.queryByText('hide-tips')).toBeNull();
      const body = hints.container.parentNode as HTMLElement;
      expect(
        body.querySelector('.dopt-hints-item__dismiss-all-button')
      ).toBeNull();
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

    it('it wires the onClick handler for next button correctly', () => {
      const hintsStep = render(
        <HintsTest
          active={true}
          open={true}
          completeLabel="complete"
          complete={onClickHandler}
        />
      );
      fireEvent.click(hintsStep.getByText('complete'));
      expect(onClickHandler).toHaveBeenCalledTimes(1);
    });

    it('it wires the onClick handler for dismiss all correctly', () => {
      const hintsStep = render(
        <HintsTest
          active={true}
          open={true}
          dismissAllLabel="dissmiss-all"
          dismiss={onClickHandler}
        />
      );
      fireEvent.click(hintsStep.getByText('dissmiss-all'));
      expect(onClickHandler).toHaveBeenCalledTimes(1);
    });
  });
});
