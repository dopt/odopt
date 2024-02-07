import { useContext, useEffect, useState } from 'react';
import { ContextualAssistantContext } from './contextual-assistant';

import {
  AnswerChunk,
  ChatStreamChunk,
  ContentStreamChunk,
  DocumentsChunk,
  StatusChunk,
} from '@dopt/ai-assistant-definition';

import { DoptAiContext } from '@dopt/ai-assistant-react';

export function useContextualAssistant(sid: string) {
  const { assistant } = useContext(DoptAiContext);
  const { deregisterAssistant, registerAssistant, ...rest } = useContext(
    ContextualAssistantContext
  );

  const [_, setChunks] = useState<ChatStreamChunk[]>([]);

  const [status, setStatus] = useState<StatusChunk['status'] | null>(null);
  const [documents, setDocuments] = useState<DocumentsChunk['sources'] | null>(
    null
  );
  const [answer, setAnswer] = useState<AnswerChunk['answer'] | null>(null);
  const [content, setContent] = useState<ContentStreamChunk['content'] | null>(
    null
  );

  useEffect(() => {
    async function onSelectionCallback(element: HTMLElement) {
      setContent(null);
      setStatus(null);
      setAnswer(null);
      const stream = await assistant.completions(sid, {
        query: '',
        context: {
          element,
        },
      });

      //@ts-ignore
      const reader = (stream.stream as ReadableStream<Uint8Array>).getReader();
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
            setChunks((chunks) => {
              return [...chunks, chunk];
            });
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
                setContent((content) =>
                  content == null ? chunk.content : content + chunk.content
                );
                break;
            }
          }
        }
        done = next.done;
      } while (!done);
    }

    registerAssistant(sid, onSelectionCallback);

    return () => deregisterAssistant(sid, onSelectionCallback);
  }, [assistant, registerAssistant, sid]);

  return {
    answer,
    content,
    documents,
    status,
    ...rest,
  };
}
