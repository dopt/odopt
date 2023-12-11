import { example, heading, leftNav, rightNav } from '@/pages/index.css';

import {
  Alerts,
  Brand,
  Button,
  Navigation,
  Settings,
  Table,
  User,
} from '@/components';

import TourItem, { useTourItem } from '@dopt/react-tour';
import { useTheme } from '@/hooks';

import { IconToggleLeft } from '@tabler/icons';

export function Example() {
  const tourItem = useTourItem('dark-mode-toggle.enable-dark-mode');

  const [_, setTheme] = useTheme('light');

  return (
    <div className={example}>
      <div className={heading}>
        <div className={leftNav}>
          <Brand />
          <Navigation />
        </div>
        <div className={rightNav}>
          <Alerts />
          <TourItem.Root active={tourItem.active}>
            <TourItem.Anchor>
              <Settings />
            </TourItem.Anchor>
            <TourItem.Popover position="bottom">
              <TourItem.Content>
                <TourItem.Header>
                  <TourItem.Title>{tourItem.title}</TourItem.Title>
                  <TourItem.DismissIcon onClick={tourItem.tour?.dismiss} />
                </TourItem.Header>
                <TourItem.Body>{tourItem.body}</TourItem.Body>
                <TourItem.Footer style={{ justifyContent: 'center' }}>
                  <Button
                    onClick={() => {
                      setTheme('dark');
                      tourItem.next();
                    }}
                  >
                    <IconToggleLeft /> Turn on dark mode
                  </Button>
                </TourItem.Footer>
              </TourItem.Content>
            </TourItem.Popover>
          </TourItem.Root>
          <User />
        </div>
      </div>
      <Table />
    </div>
  );
}
