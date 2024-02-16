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
  ChatStreamChunk,
  ContentStreamChunk,
  DocumentsChunk,
  StatusChunk,
} from '@dopt/ai-assistant-definition';

import { type StyleProps, ThemeContext } from '@dopt/react-theme';
import { DoptAiContext } from '@dopt/ai-assistant-react';

export interface ContextualAssistantContext {
  active: boolean;
  selection: HTMLElement | null;
  documents: DocumentsChunk['sources'] | null;
  status: StatusChunk['status'] | null;
  answer: AnswerChunk['answer'] | null;
  content: ContentStreamChunk['content'] | null;

  close: () => void;

  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  setSelection: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  setStatus: React.Dispatch<
    React.SetStateAction<ContextualAssistantContext['status']>
  >;
  setAnswer: React.Dispatch<
    React.SetStateAction<ContextualAssistantContext['answer']>
  >;
  setContent: React.Dispatch<
    React.SetStateAction<ContextualAssistantContext['content']>
  >;
  setDocuments: React.Dispatch<
    React.SetStateAction<ContextualAssistantContext['documents']>
  >;
}

export const ContextualAssistantContext =
  createContext<ContextualAssistantContext>({
    active: false,
    answer: null,
    content: null,
    documents: null,
    selection: null,
    close: () => {
      /* noop */
    },
    setDocuments: () => {
      /* noop */
    },
    setActive: () => {
      /* noop */
    },
    setAnswer: () => {
      /* noop */
    },
    setContent: () => {
      /* noop */
    },
    setSelection: () => {
      /* noop */
    },
    setStatus: () => {
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
type Status = StatusChunk['status'] | null;
type Document = DocumentsChunk['sources'] | null;
type Answer = AnswerChunk['answer'] | null;
type Content = ContentStreamChunk['content'] | null;

function ContextualAssistant(props: ContextualAssistantProps) {
  const { children, defaultActive, theme } = props;

  const { assistant } = useContext(DoptAiContext);
  const [active, setActive] = useState<boolean>(!!defaultActive);

  const [selection, setSelection] = useState<Selection>(null);

  const [status, setStatus] = useState<Status>(null);
  const [documents, setDocuments] = useState<Document>(null);
  const [answer, setAnswer] = useState<Answer>(null);
  const [content, setContent] = useState<Content>(null);

  const clearState = useCallback(() => {
    setStatus(null);
    setDocuments(null);
    setAnswer(null);
    setContent(null);
  }, [setAnswer, setContent, setDocuments, setStatus]);

  const close = useCallback(() => {
    setActive(false);
    setSelection(null);
  }, [setActive, setSelection]);

  useEffect(() => {
    if (!selection) {
      clearState();
    }
  }, [selection, clearState]);

  useEffect(() => {
    if (!selection) {
      return;
    }
    (async function onSelectionCallback(element: HTMLElement) {
      clearState();
      const stream = await assistant.completions(props.assistant, {
        query: '',
        context: {
          element,
        },
      });

      const reader = //@ts-ignore
        (stream.stream as ReadableStream<Uint8Array>).getReader();
      const decoder = new TextDecoder();

      let done = false;
      do {
        const next = await reader.read();

        if (next.value) {
          const messages = decoder
            .decode(next.value)
            .split('\n')
            .filter((m) => m);

          for (const message of messages) {
            const chunk = JSON.parse(message) as ChatStreamChunk;
            switch (chunk.type) {
              case 'status':
                setStatus(chunk.status);
                break;
              case 'documents':
                setDocuments(chunk.sources);
                break;
              case 'answer':
                setAnswer(chunk.answer);
                break;
              case 'content':
                setContent((prevContent) => {
                  if (prevContent === null) {
                    return chunk.content;
                  }
                  return prevContent + chunk.content;
                });
                break;
            }
          }
        }
        done = next.done;
      } while (!done);
    })(selection);
  }, [selection, clearState, assistant, props.assistant]);

  return (
    <ContextualAssistantContext.Provider
      value={{
        active,
        answer,
        close,
        content,
        documents,
        selection,
        setActive,
        setAnswer,
        setContent,
        setDocuments,
        setSelection,
        setStatus,
        status,
      }}
    >
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    </ContextualAssistantContext.Provider>
  );
}

export { ContextualAssistant as Provider };
