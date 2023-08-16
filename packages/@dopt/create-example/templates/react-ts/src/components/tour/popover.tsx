import { type ReactElement } from 'react';
import TourItem, { useTourItem } from '@dopt/react-tour';

interface PopoverProps {
  id: string;
  children: ReactElement;
}

export function Popover(props: PopoverProps) {
  const { id, children } = props;
  const item = useTourItem(id);

  return (
    <TourItem.Root active={item.active}>
      <TourItem.Anchor>{children}</TourItem.Anchor>
      <TourItem.Popover position="top">
        <TourItem.Content>
          <TourItem.Header>
            <TourItem.Title>{item.title}</TourItem.Title>
          </TourItem.Header>
          <TourItem.Body>{item.body}</TourItem.Body>
          <TourItem.Footer>
            {item.index !== 0 && (
              <TourItem.BackButton onClick={item.back}>
                {item.backLabel}
              </TourItem.BackButton>
            )}
            <TourItem.NextButton onClick={item.next}>
              {item.nextLabel}
            </TourItem.NextButton>
          </TourItem.Footer>
          <TourItem.Progress count={item.tour.size} index={item.index || 0} />
        </TourItem.Content>
      </TourItem.Popover>
    </TourItem.Root>
  );
}
