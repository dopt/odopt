import { Alert, Text } from '@mantine/core';

import { useBlock } from '@dopt/react';

import {
  cardClass,
  descriptionClass,
  draggingClass,
  titleClass,
} from './index.css';

interface Props {
  id: string;
  title: string;
  children?: string;
  isDragging: boolean;
}

export function Card(props: Props) {
  const { id, title, children, isDragging } = props;
  const classNames = [cardClass, isDragging ? draggingClass : '']
    .join(' ')
    .trim();

  const [firstIssue] = useBlock('krcPrzGs9w6J2mHKQJLYd');
  const [issueInProgress] = useBlock('z2rnhWqUav5rhRLcxoM55');
  const [issueStillInProgress] = useBlock('pMw5hcPMz3aZPr5IVfnP8');

  return (
    <div className={classNames}>
      <h3 className={titleClass}>{title}</h3>
      {children && <p className={descriptionClass}>{children}</p>}

      {id == 'first-issue' &&
        (firstIssue.state.active ||
          issueInProgress.state.active ||
          issueStillInProgress.state.active) && (
          <Alert>
            {firstIssue.state.active && (
              <Text span>
                Okay, let’s get to work on your issue. Drag this issue to the{' '}
                <b>In Progress</b> column to change the status.
              </Text>
            )}
            {issueInProgress.state.active && (
              <Text span>
                Nice, this issue is now <b>In Progress</b>. Next, reorder this
                item to change its priority.
              </Text>
            )}
            {issueStillInProgress.state.active && (
              <Text span>
                Great, the new priority is set so your whole team can be on the
                same page. Now let’s move this to <b>Done 🙌</b>.
              </Text>
            )}
          </Alert>
        )}
    </div>
  );
}
