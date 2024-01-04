import {
  onboardingHub,
  example,
  heading,
  leftNav,
  rightNav,
  demoVideo,
  resources,
  onboardingHubRightPane,
  resourceList,
  resourceLink,
} from '@/pages/index.css';

import {
  Brand,
  Button,
  InviteUsers,
  InviteUsersForm,
  Navigation,
  User,
} from '@/components';

import { createTheme } from '@dopt/react-theme';
import Checklist, {
  useChecklistItem,
  useChecklist,
} from '@dopt/react-checklist';

import Card, { useCard } from '@dopt/react-card';
import {
  IconBook,
  IconBrandSlack,
  IconCalendar,
  IconCodeCircle,
} from '@tabler/icons';
import { useTour } from '@dopt/react-tour';
import { useFlow } from '@dopt/react';

const theme = createTheme({
  colors: {
    primary: '#339AF0',
  },
});

export function Example() {
  const [flow, intent] = useFlow('onboarding-hub-tour');

  const card = useCard('onboarding-hub-video.video');
  const checklist = useChecklist('onboarding-hub.getting-started-checklist');
  const checklistItem = useChecklistItem('onboarding-hub.invite-teammates');

  return (
    <div className={example}>
      <div className={heading}>
        <div className={leftNav}>
          <Brand />
          <Navigation />
        </div>
        <div className={rightNav}>
          <InviteUsers />
          <User />
        </div>
      </div>
      <div className={onboardingHub}>
        <Checklist.Root theme={theme} style={{}}>
          <Checklist.Header>
            <Checklist.Title>{checklist.title}</Checklist.Title>
            <Checklist.DismissIcon onClick={checklist.dismiss} />
          </Checklist.Header>
          <Checklist.Body>{checklist.body}</Checklist.Body>
          <Checklist.Progress
            value={checklist.count('done')}
            max={checklist.size}
          />
          <Checklist.Items>
            {checklist.items.map((item, i) => (
              <Checklist.Item index={i} key={i}>
                <Checklist.ItemIcon>
                  {item.completed ? (
                    <Checklist.IconCompleted />
                  ) : item.skipped ? (
                    <Checklist.IconSkipped />
                  ) : (
                    <Checklist.IconActive />
                  )}
                </Checklist.ItemIcon>
                <Checklist.ItemContent>
                  <Checklist.ItemTitle disabled={item.done}>
                    {item.title}
                  </Checklist.ItemTitle>

                  <Checklist.ItemBody disabled={item.done}>
                    {item.body}
                  </Checklist.ItemBody>
                  {!item.done &&
                    item.id === 'onboarding-hub.invite-teammates' && (
                      <InviteUsersForm
                        onSubmit={() => {
                          checklistItem.complete();
                        }}
                      />
                    )}
                </Checklist.ItemContent>
              </Checklist.Item>
            ))}
          </Checklist.Items>
        </Checklist.Root>
        <div className={onboardingHubRightPane}>
          <div className="">
            <Card.Root active={true}>
              <Card.Content>
                <Card.Header>
                  <Card.Title>Take a tour</Card.Title>
                </Card.Header>
                <div>
                  <div style={{ padding: '24px 0' }}>
                    Learn the basics with an interactive tour.
                  </div>
                  <Button
                    disabled={flow.state.started && !flow.state.finished}
                    onClick={() => {
                      if (flow.state.finished) {
                        intent.reset({
                          force: true,
                        });
                      } else {
                        intent.start({
                          force: true,
                        });
                      }
                    }}
                  >
                    {!flow.state.finished ? 'Start tour' : 'Restart tour'}
                  </Button>
                </div>
              </Card.Content>
            </Card.Root>
          </div>
          <div className={demoVideo}>
            <Card.Root active={true}>
              <Card.Content>
                <Card.Header>
                  <Card.Title>{card.title}</Card.Title>
                </Card.Header>
                <Card.Body>{card.body}</Card.Body>
              </Card.Content>
            </Card.Root>
          </div>
          <div className={resources}>
            <Card.Root active={true}>
              <Card.Content>
                <Card.Header>
                  <Card.Title>Resources</Card.Title>
                </Card.Header>
                <div className={resourceList}>
                  <a className={resourceLink} href="https://docs.dopt.com">
                    <IconBook />
                    <div>Docs</div>
                  </a>
                  <a
                    className={resourceLink}
                    href="https://www.dopt.com/examples"
                  >
                    <IconCodeCircle />
                    <div>Examples</div>
                  </a>
                  <a className={resourceLink} href="https://www.google.com">
                    <IconBrandSlack />
                    <div>Join our Slack community</div>
                  </a>
                  <a className={resourceLink} href="https://www.google.com">
                    <IconCalendar />
                    <div>Scehdule time with us</div>
                  </a>
                </div>
              </Card.Content>
            </Card.Root>
          </div>
        </div>
      </div>
    </div>
  );
}
