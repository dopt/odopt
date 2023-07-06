import { fireEvent, render, RenderResult } from '@testing-library/react';

import Tour from '../';
import * as TourSdl from '@dopt/semantic-data-layer-tour';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

const TourTest = (props: Partial<TourSdl.TourItem>) => (
  <Tour.Root active={props.active}>
    <Tour.Anchor>
      <button>ANCHOR #1</button>
    </Tour.Anchor>
    <Tour.Popover position="bottom">
      <Tour.Content>
        <Tour.Header>
          <Tour.Title>{props.title}</Tour.Title>
          <Tour.DismissIcon onClick={props.tour && props.tour.dismiss} />
        </Tour.Header>
        <Tour.Body>{props.body}</Tour.Body>
        <Tour.Footer>
          <Tour.BackButton onClick={props.back}>
            {props.backLabel}
          </Tour.BackButton>
          <Tour.NextButton onClick={props.next}>
            {props.nextLabel}
          </Tour.NextButton>
        </Tour.Footer>
        <Tour.Progress count={props.tour?.size || 0} index={props.index || 0} />
      </Tour.Content>
    </Tour.Popover>
  </Tour.Root>
);

describe('@dopt/react-tour', () => {
  let rendered: RenderResult;
  let container: HTMLElement;

  describe('visibility', () => {
    it('renders tour item correctly when active props is true', () => {
      rendered = render(<TourTest active={true} />);
      container = rendered.container.parentNode as HTMLElement;
      expect(container.querySelector('.dopt-tour-item')).not.toBeNull();
    });
    it('closes tour item when active prop is false', () => {
      rendered = render(<TourTest active={false} />);
      container = rendered.container.parentNode as HTMLElement;
      expect(container.querySelector('.dopt-tour')).toBeNull();
    });
  });

  describe('title field', () => {
    it('renders a title if non-null title is returned from API', () => {
      const tour = render(<TourTest active={true} title={'title'} />);
      expect(tour.queryByText('title')).not.toBeNull();
    });
    it('adds the correct static class to the title element', () => {
      const tour = render(<TourTest active={true} title={'title'} />);
      const title = tour.getByText('title');
      expect(title.classList.contains('dopt-tour-item__title')).toBe(true);
    });
    it('does not render a title if title not provided', () => {
      const tour = render(<TourTest active={true} />);
      expect(tour.queryByText('title')).toBeNull();
    });
  });

  describe('body field', () => {
    it('renders a body if non-null body is returned from API', () => {
      const tour = render(
        <TourTest
          active={true}
          body={[
            {
              type: 'paragraph',
              children: [{ text: 'TourBody' }],
            },
          ]}
        />
      );
      expect(tour.queryByText('TourBody')).not.toBeNull();
    });
    it('adds the correct static class to the body element', () => {
      const tour = render(
        <TourTest
          active={true}
          body={[
            {
              type: 'paragraph',
              children: [{ text: 'TourBody' }],
            },
          ]}
        />
      );
      const body = tour.container.parentNode as HTMLElement;
      expect(body.querySelector('.dopt-tour-item__body')).not.toBeNull();
    });
    it('does not render a title if title text is null', () => {
      const tour = render(<TourTest active={true} />);
      expect(tour.queryByText('TourBody')).toBeNull();
      const body = tour.container.parentNode as HTMLElement;
      expect(body.querySelector('.dopt-tour-item__body')).toBeNull();
    });
  });

  describe('nextLabel field', () => {
    it('renders a next button if non-null nextLabel is returned from API', () => {
      const tour = render(<TourTest active={true} nextLabel="next" />);
      expect(tour.queryByText('next')).not.toBeNull();
    });
    it('adds the correct static class to the next button element', () => {
      const tour = render(<TourTest active={true} nextLabel="next" />);
      const body = tour.container.parentNode as HTMLElement;
      expect(body.querySelector('.dopt-tour-item__next-button')).not.toBeNull();
    });
    it('does not render a next button if dissmissLabel is null', () => {
      const tour = render(<TourTest active={true} />);
      expect(tour.queryByText('next')).toBeNull();
      const body = tour.container.parentNode as HTMLElement;
      expect(body.querySelector('.dopt-tour-item__next-button')).toBeNull();
    });
  });

  describe('backLabel field', () => {
    it('renders a back button if non-null backLabel is returned from API', () => {
      const tour = render(<TourTest active={true} backLabel="back" />);
      expect(tour.queryByText('back')).not.toBeNull();
    });
    it('adds the correct static class to the back button element', () => {
      const tour = render(<TourTest active={true} backLabel="back" />);
      const body = tour.container.parentNode as HTMLElement;
      expect(body.querySelector('.dopt-tour-item__back-button')).not.toBeNull();
    });
    it('does not render a back button if dissmissLabel is null', () => {
      const tour = render(<TourTest active={true} />);
      expect(tour.queryByText('back')).toBeNull();
      const body = tour.container.parentNode as HTMLElement;
      expect(body.querySelector('.dopt-tour-item__back-button')).toBeNull();
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
      const tourStep = render(
        <TourTest active={true} nextLabel="next" next={onClickHandler} />
      );
      fireEvent.click(tourStep.getByText('next'));
      expect(onClickHandler).toHaveBeenCalledTimes(1);
    });

    it('it wires the onClick handler for back button correctly', () => {
      const tourStep = render(
        <TourTest active={true} backLabel="back" back={onClickHandler} />
      );
      fireEvent.click(tourStep.getByText('back'));
      expect(onClickHandler).toHaveBeenCalledTimes(1);
    });
  });
});
