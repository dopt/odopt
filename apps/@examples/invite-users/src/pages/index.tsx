import { example, heading, leftNav, rightNav } from '@/pages/index.css';

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

const theme = createTheme({
  colors: {
    primary: '#339AF0',
  },
});

export function Example() {
  const checklist = useChecklist('invite-users.getting-started-checklist');
  const checklistItem = useChecklistItem('invite-users.invite-teammates');

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
      <Checklist.Root
        theme={theme}
        style={{
          border: 'none',
        }}
      >
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
                {!item.done && item.id === 'invite-users.invite-teammates' && (
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
    </div>
  );
}
