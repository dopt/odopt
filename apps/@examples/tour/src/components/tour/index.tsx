import { type ReactElement } from 'react';
import { default as DoptTour, useTourItem } from '@dopt/react-tour';

export interface TourProps {
  id: string;
  children: ReactElement;
  position?: 'top' | 'right' | 'bottom' | 'left';
}

export function Tour(props: TourProps) {
  const { id, children, position = 'bottom' } = props;

  // Access the tour item data from the tour block in the flow
  const item = useTourItem(id);

  return (
    <DoptTour.Root active={item.active}>
      <DoptTour.Anchor>{children}</DoptTour.Anchor>
      <DoptTour.Popover position={position}>
        <DoptTour.Content>
          <DoptTour.Header>
            <DoptTour.Title>{item.title}</DoptTour.Title>
            <DoptTour.DismissIcon onClick={item.tour?.dismiss} />
          </DoptTour.Header>
          <DoptTour.Body>{item.body}</DoptTour.Body>
          <DoptTour.Footer>
            {item.index !== 0 && (
              <DoptTour.BackButton onClick={item.back}>
                {item.backLabel}
              </DoptTour.BackButton>
            )}
            <DoptTour.NextButton onClick={item.next}>
              {item.nextLabel}
            </DoptTour.NextButton>
          </DoptTour.Footer>
          <DoptTour.Progress
            count={item.tour?.size || 1}
            index={item.index || 0}
          />
        </DoptTour.Content>
      </DoptTour.Popover>
    </DoptTour.Root>
  );
}
