import { Group } from '@mantine/core';
import { Avatar, WalkThroughCardContent } from '@/components';

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
  assignee: string;
  children?: string;
  isDragging: boolean;
}

export function Card({ id, title, assignee, children, isDragging }: Props) {
  const [firstIssueId] = useKeyValueStore('firstIssue');

  return (
    <div className={`${cardClass} ${isDragging ? draggingClass : ''}`}>
      <Group position="apart">
        <h3 className={titleClass}>{title}</h3>
        <Avatar
          name={assignee}
          src={`${import.meta.env.BASE_URL}avatars/${assignee}.png`}
        />
      </Group>
      {children && <p className={descriptionClass}>{children}</p>}
      {firstIssueId === id && (
        <>
          <WalkThroughCardContent block="krcPrzGs9w6J2mHKQJLYd" />
          <WalkThroughCardContent block="z2rnhWqUav5rhRLcxoM55" />
          <WalkThroughCardContent block="pMw5hcPMz3aZPr5IVfnP8" />
        </>
      )}
    </div>
  );
}
