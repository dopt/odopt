import TourItem, { useTourItem } from '@dopt/react-tour';

export function Popover(props) {
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
          <TourItem.Progress
            count={item.tour?.size || 1}
            index={item.index || 0}
          />
        </TourItem.Content>
      </TourItem.Popover>
    </TourItem.Root>
  );
}
