import { type ReactNode } from 'react';
import { RichText } from '@dopt/react-rich-text';

export interface ChecklistItemProps {
  completed?: boolean;
  title?: string | null;
  body?: any;
  onSkip?: () => void;
  children?: ReactNode;
}

export function ChecklistItem(props: ChecklistItemProps) {
  const { completed, title, body, onSkip, children } = props;

  const iconCheck = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path
        d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
        strokeWidth="0"
        fill="currentColor"
      ></path>
    </svg>
  );

  const iconEmpty = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M8.56 3.69a9 9 0 0 0 -2.92 1.95"></path>
      <path d="M3.69 8.56a9 9 0 0 0 -.69 3.44"></path>
      <path d="M3.69 15.44a9 9 0 0 0 1.95 2.92"></path>
      <path d="M8.56 20.31a9 9 0 0 0 3.44 .69"></path>
      <path d="M15.44 20.31a9 9 0 0 0 2.92 -1.95"></path>
      <path d="M20.31 15.44a9 9 0 0 0 .69 -3.44"></path>
      <path d="M20.31 8.56a9 9 0 0 0 -1.95 -2.92"></path>
      <path d="M15.44 3.69a9 9 0 0 0 -3.44 -.69"></path>
    </svg>
  );

  return (
    <li
      className={`checklist__item${
        completed ? ' checklist__item--complete' : ''
      }`}
    >
      <div className="checklist__item-icon">
        {completed ? iconCheck : iconEmpty}
      </div>
      <div className="checklist__item-content">
        <h2 className="checklist__item-title">{title}</h2>
        <div className="checklist__item-body">
          <RichText>{body}</RichText>
        </div>
        <div>{children}</div>
      </div>
      {!completed && (
        <button onClick={onSkip} className="checklist__item-skip">
          Skip
        </button>
      )}
    </li>
  );
}
