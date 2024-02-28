import React, {
  createContext,
  useState,
  PropsWithChildren,
  useEffect,
  useCallback,
  useContext,
} from 'react';

import {
  AnswerChunk,
  ContentStreamChunk,
  StatusChunk,
  AssistantRequestBody,
} from '@dopt/ai-assistant-definition';

import { type StyleProps, ThemeContext } from '@dopt/react-theme';
import { DoptAiContext } from '@dopt/ai-assistant-react';

export interface ContextualAssistantContext {
  active: boolean;
  selection: HTMLElement | null;
  query: AssistantRequestBody['query'] | null;
  documents: AnswerChunk['sources'] | null;
  status: StatusChunk['status'] | null;
  answer: AnswerChunk['answer'] | null;
  content: ContentStreamChunk['content'] | null;

  close: () => void;

  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  setSelection: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  setQuery: React.Dispatch<
    React.SetStateAction<AssistantRequestBody['query'] | null>
  >;
}

export const ContextualAssistantContext =
  createContext<ContextualAssistantContext>({
    active: false,
    answer: null,
    content: null,
    documents: null,
    selection: null,
    query: null,
    close: () => {
      /* noop */
    },
    setActive: () => {
      /* noop */
    },
    setSelection: () => {
      /* noop */
    },
    setQuery: () => {
      /* noop */
    },
    status: null,
  });

export interface ContextualAssistantProps
  extends PropsWithChildren,
    StyleProps {
  assistant: string;
  defaultActive?: boolean;
}

type Selection = ContextualAssistantContext['selection'];
type Query = AssistantRequestBody['query'] | null;
type Status = StatusChunk['status'] | null;
type Document = AnswerChunk['sources'] | null;
type Answer = AnswerChunk['answer'] | null;
type Content = ContentStreamChunk['content'] | null;

function ContextualAssistant(props: ContextualAssistantProps) {
  const { children, defaultActive, theme, assistant: sid } = props;

  const { assistant } = useContext(DoptAiContext);
  const [active, setActive] = useState<boolean>(!!defaultActive);

  const [selection, setSelection] = useState<Selection>(null);
  const [query, setQuery] = useState<Query>(null);

  const [status, setStatus] = useState<Status>(null);
  const [documents, setDocuments] = useState<Document>(null);
  const [answer, setAnswer] = useState<Answer>(null);
  const [content, setContent] = useState<Content>(null);

  const close = useCallback(() => {
    setActive(false);
    setSelection(null);
    setQuery(null);
  }, []);

  useEffect(() => {
    /**
     * If selection changes, we should clear the assistant's query state
     */
    setQuery(null);
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
        query: query ?? undefined,
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
      }
    );

    return () => terminate();
  }, [selection, query, assistant, sid]);

  return (
    <ContextualAssistantContext.Provider
      value={{
        active,
        answer,
        close,
        content,
        documents,
        selection,
        query,
        setQuery,
        setActive,
        setSelection,
        status,
      }}
    >
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    </ContextualAssistantContext.Provider>
  );
}

export { ContextualAssistant as Provider };
