import {
  destinations,
  example,
  footerNav,
  navigation,
  topNav,
} from '@/pages/index.css';

import { Brand, Destinations, Navigation, User } from '@/components';
import HelpHub, { useHelpHub } from '@dopt/react-help-hub';

export function Example() {
  const helpHub = useHelpHub('ai-segment-destination');

  return (
    <div className={example}>
      <div className={navigation}>
        <div className={topNav}>
          <Brand />
          <Navigation />
        </div>
        <div className={footerNav}>
          <User />
        </div>
      </div>
      <div className={destinations}>
        <Destinations />
      </div>
      <HelpHub.Root>
        <HelpHub.Launcher onClick={() => helpHub.setOpen(!helpHub.open)} />
        <HelpHub.Popover position="top" alignment="end" open={helpHub.open}>
          <HelpHub.Content>
            <HelpHub.Header>
              <HelpHub.Title>Title</HelpHub.Title>
              <HelpHub.CloseIcon onClick={() => helpHub.setOpen(false)} />
            </HelpHub.Header>
            <HelpHub.Body>
              {(helpHub.documents || []).map((document, i) => {
                const chunk = document.chunks[0] || { text: '' };
                return (
                  <div key={i}>
                    <div>Title: {document.title}</div>
                    <div>Url: {document.url}</div>
                    <div>Preview: {chunk.text.substring(0, 50)}</div>
                    <div>===</div>
                  </div>
                );
              })}
            </HelpHub.Body>
          </HelpHub.Content>
        </HelpHub.Popover>
      </HelpHub.Root>
    </div>
  );
}
