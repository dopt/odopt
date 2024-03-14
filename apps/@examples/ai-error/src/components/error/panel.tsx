import { useAssistant } from '@dopt/ai-assistant-react';
import Markdown from 'react-markdown';
import { Skeleton } from '../skeleton';

export interface PanelProps {
  error: string;
  element: HTMLInputElement | HTMLTextAreaElement | null;
  onClose: () => void;
  onFix?: (output: string | null) => void;
}

export function Panel(props: PanelProps) {
  const { error, element, onClose, onFix } = props;

  const assistant = useAssistant(
    'ai-error',
    {
      query:
        element && element.value
          ? `The error "${error}" was encountered from the input: ${element.value}`
          : undefined,
      context: {
        element: element ?? undefined,
      },
    },
    { errorMessage: 'The assistant is not available at the moment.' }
  );

  const fix = useAssistant(
    'ai-error',
    {
      query:
        onFix && element && element.value
          ? `Fix the following input based on the error "${error}": ${element.value}
          Only answer with the fixed ouput. Do not use markdown.`
          : undefined,
      context: {
        element: element ?? undefined,
      },
    },
    { errorMessage: 'The assistant is not available at the moment.' }
  );

  return (
    <div className="error-panel">
      <header>
        <h1>AI assistant</h1>
        <button className="error-panel-close" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
          </svg>
        </button>
      </header>
      {assistant.content ? (
        <Markdown>{assistant.content}</Markdown>
      ) : (
        <div className="error-loading">
          <Skeleton />
          <Skeleton width="80%" />
          <Skeleton width="90%" />
        </div>
      )}
      {onFix && (
        <button
          className="error-panel-btn"
          onClick={() => {
            if (onFix) {
              onFix(fix.answer);
            }
          }}
          disabled={!fix.answer}
        >
          Fix it for me
          {!fix.answer && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 3a9 9 0 1 0 9 9" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
}
