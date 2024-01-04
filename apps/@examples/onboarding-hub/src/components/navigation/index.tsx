import {
  IconFileDescription,
  IconListCheck,
  IconLivePhoto,
  IconPlug,
  IconSettings,
} from '@tabler/icons';
import { navigation, navigationItem } from './index.css';
import TourItem, { useTourItem } from '@dopt/react-tour';
import { PropsWithChildren } from 'react';
import { createTheme } from '@dopt/react-theme';

const theme = createTheme({
  colors: {
    primary: '#339AF0',
  },
});

export function Navigation() {
  return (
    <div className={navigation}>
      <div
        className={navigationItem}
        style={{
          color: '#339AF0',
          backgroundColor: '#E7F5FF',
        }}
      >
        <IconListCheck />
        Getting started
      </div>
      <WithTour tourItemId="onboarding-hub-tour.documents">
        <div className={navigationItem}>
          <IconFileDescription />
          Documents
        </div>
      </WithTour>
      <WithTour tourItemId="onboarding-hub-tour.library">
        <div className={navigationItem}>
          <IconLivePhoto />
          Library
        </div>
      </WithTour>
      <WithTour tourItemId="onboarding-hub-tour.plugins">
        <div className={navigationItem}>
          <IconPlug />
          Plugins
        </div>
      </WithTour>
      <WithTour tourItemId="onboarding-hub-tour.settings">
        <div className={navigationItem}>
          <IconSettings />
          Settings
        </div>
      </WithTour>
    </div>
  );
}

interface WithTourProps extends PropsWithChildren {
  tourItemId: string;
}

function WithTour(props: WithTourProps) {
  const tourStep = useTourItem(props.tourItemId);
  return (
    <TourItem.Root theme={theme} active={tourStep.active}>
      <TourItem.Anchor>{props.children}</TourItem.Anchor>
      <TourItem.Popover position="right">
        <TourItem.Content>
          <TourItem.Header>
            <TourItem.Title>{tourStep.title}</TourItem.Title>
          </TourItem.Header>
          <TourItem.Body>{tourStep.body}</TourItem.Body>
          <TourItem.Footer>
            <TourItem.BackButton onClick={tourStep.back}>
              {tourStep.backLabel}
            </TourItem.BackButton>
            <TourItem.NextButton onClick={tourStep.next}>
              {tourStep.nextLabel}
            </TourItem.NextButton>
          </TourItem.Footer>
          <TourItem.Progress
            count={tourStep.tour?.size || 1}
            index={tourStep.index || 0}
          />
        </TourItem.Content>
      </TourItem.Popover>
    </TourItem.Root>
  );
}
