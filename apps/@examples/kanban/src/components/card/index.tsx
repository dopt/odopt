import { WalkThroughCardContent } from '@/components';

import { useKeyValueStore } from '@/hooks';

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

export function Card({ id, title, children, isDragging }: Props) {
  const [firstIssueId] = useKeyValueStore('firstIssue');

  return (
    <div className={`${cardClass} ${isDragging ? draggingClass : ''}`}>
      <h3 className={titleClass}>{title}</h3>
      {children && <p className={descriptionClass}>{children}</p>}
      {firstIssueId === id && (
        <>
          <WalkThroughCardContent block="krcPrzGs9w6J2mHKQJLYd">
            Okay, let’s get to work on your issue. Drag this issue to the{' '}
            <b>In Progress</b> column to change the status.
          </WalkThroughCardContent>
          <WalkThroughCardContent block="z2rnhWqUav5rhRLcxoM55">
            Nice, this issue is now <b>In Progress</b>. Next, reorder this item
            to change its priority.
          </WalkThroughCardContent>
          <WalkThroughCardContent block="pMw5hcPMz3aZPr5IVfnP8">
            Great, the new priority is set so your whole team can be on the same
            page. Now let’s move this to <b>Done 🙌</b>.
          </WalkThroughCardContent>
        </>
      )}
    </div>
  );
}
