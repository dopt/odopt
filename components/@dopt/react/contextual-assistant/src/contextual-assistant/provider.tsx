import React, {
  createContext,
  useState,
  PropsWithChildren,
  useEffect,
  useCallback,
  useContext,
  useRef,
  useMemo,
} from 'react';

import {
  AnswerChunk,
  ContentStreamChunk,
  StatusChunk,
  AssistantRequestBody,
  AssistantDefaultCompletionsErrorMessage,
} from '@dopt/ai-assistant-definition';

import { type StyleProps, ThemeContext } from '@dopt/react-theme';
import { DoptAiContext } from '@dopt/ai-assistant-react';

export interface ContextualAssistantContext {
  active: boolean;
  canSubmitQuery: boolean;
  selection: HTMLElement | null;
  submittedQuery: AssistantRequestBody['query'] | null;
  documents: AnswerChunk['sources'] | null;
  status: StatusChunk['status'] | null;
  answer: AnswerChunk['answer'] | null;
  content: ContentStreamChunk['content'] | null;
  enteredQuery: string;

  close: () => void;
  submitQuery: () => void;

  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  setSelection: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  onEnteredQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const ContextualAssistantContext =
  createContext<ContextualAssistantContext>({
    active: false,
    answer: null,
    canSubmitQuery: false,
    content: null,
    documents: null,
    selection: null,
    submittedQuery: null,
    enteredQuery: '',
    close: () => {
      /* noop */
    },
    submitQuery: () => {
      /* noop */
    },
    setActive: () => {
      /* noop */
    },
    setSelection: () => {
      /* noop */
    },
    onEnteredQuery: () => {
      /* noop */
    },
    status: null,
  });

export interface ContextualAssistantProps
  extends PropsWithChildren,
    StyleProps {
  assistant: string;
  errorMessage?: string;
  defaultActive?: boolean;
}

type Selection = ContextualAssistantContext['selection'];
type Query = AssistantRequestBody['query'] | null;
type Status = StatusChunk['status'] | null;
type Document = AnswerChunk['sources'] | null;
type Answer = AnswerChunk['answer'] | null;
type Content = ContentStreamChunk['content'] | null;

function ContextualAssistant(props: ContextualAssistantProps) {
  const {
    children,
    defaultActive,
    theme,
    assistant: sid,
    errorMessage,
  } = props;

  const { assistant } = useContext(DoptAiContext);
  const [active, setActive] = useState<boolean>(!!defaultActive);

  const [selection, setSelection] = useState<Selection>(null);
  const [submittedQuery, setSubmittedQuery] = useState<Query>(null);
  const [enteredQuery, setEnteredQuery] = useState('');

  const [status, setStatus] = useState<Status>(null);
  const [documents, setDocuments] = useState<Document>(null);
  const [answer, setAnswer] = useState<Answer>(null);
  const [content, setContent] = useState<Content>(null);

  const errorMessageRef = useRef<string>(
    errorMessage ?? AssistantDefaultCompletionsErrorMessage
  );

  useEffect(() => {
    errorMessageRef.current =
      errorMessage ?? AssistantDefaultCompletionsErrorMessage;
  }, [errorMessage]);

  const canSubmitQuery = useMemo(() => {
    return answer != null && enteredQuery.trim().length > 0;
  }, [answer, enteredQuery]);

  const submitQuery = useCallback(() => {
    if (canSubmitQuery) {
      setSubmittedQuery(enteredQuery);
      setEnteredQuery('');
    }
  }, [canSubmitQuery, enteredQuery]);

  const close = useCallback(() => {
    setActive(false);
    setSelection(null);
    setSubmittedQuery(null);
    setEnteredQuery('');
  }, []);

  useEffect(() => {
    /**
     * If selection changes, we should clear the assistant's query state
     */
    setSubmittedQuery(null);
    setEnteredQuery('');
  }, [selection]);

  useEffect(() => {
    /**
     * Clear previous state.
     */
    setStatus(null);
    setDocuments(null);
    setAnswer(null);
    setContent(null);

    if (!selection) {
      return () => {
        /* no-op */
      };
    }

    const terminate = assistant.completions(
      sid,
      {
        query: submittedQuery ?? undefined,
        context: {
          document: true,
          element: selection,
          semantic: true,
          visual: true,
        },
      },
      {
        onStatus: (status) => setStatus(status),
        onContent: (content) => setContent(content),
        onComplete: (answer, sources) => {
          setAnswer(answer);
          setDocuments(sources);
        },
        onError: () => {
          setAnswer(errorMessageRef.current);
          setDocuments([]);
        },
      }
    );

    return () => terminate();
  }, [selection, submittedQuery, assistant, sid]);

  return (
    <ContextualAssistantContext.Provider
      value={{
        active,
        answer,
        canSubmitQuery,
        close,
        content,
        documents,
        enteredQuery,
        submittedQuery,
        selection,
        setActive,
        onEnteredQuery: setEnteredQuery,
        setSelection,
        status,
        submitQuery,
      }}
    >
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    </ContextualAssistantContext.Provider>
  );
}

export { ContextualAssistant as Provider };
