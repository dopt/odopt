import { useContext, useEffect, useState } from 'react';
import { DoptAiContext } from './context';

import {
  AnswerChunk,
  ChatStreamChunk,
  ContentStreamChunk,
  DocumentsChunk,
  StatusChunk,
} from '@dopt/ai-assistant-definition';

import { AssistantCompletionsRequestBody } from '@dopt/ai-assistant-definition';
import { AssistantContextProps } from '@dopt/ai-assistant-javascript';

/**
 * A React hook for accessing an AI assistant
 *
 * @example
 * ```tsx
 * import { useAssistant } from "@dopt/react-ai";
 *
 * export function Application() {
 *   const assitant = useAssitant("HNWvcT78tyTwygnbzU6SW", { query, context });
 * }
 * ```
 *
 * @param sid - {@link Assistant['sid']}
 * this param accepts the user defined identifier (sid)
 * @returns TODO
 *
 */
export function useAssistant(
  sid: string,
  {
    query,
    context,
  }: {
    query: AssistantCompletionsRequestBody['query'];
    context: AssistantContextProps;
  }
) {
  const [_, setChunks] = useState<ChatStreamChunk[]>([]);

  const [status, setStatus] = useState<StatusChunk['status'] | null>(null);
  const [documents, setDocuments] = useState<DocumentsChunk['sources'] | null>(
    null
  );
  const [answer, setAnswer] = useState<AnswerChunk['answer'] | null>(null);
  const [content, setContent] = useState<ContentStreamChunk['content'] | null>(
    null
  );

  const { assistant } = useContext(DoptAiContext);

  useEffect(() => {
    (async function () {
      const stream = await assistant.completions(sid, {
        query,
        context,
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

      /*
       * This code doesn't work given fern's node-only streaming
       * client implementation
      for await (const chunk of stream) {
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
      */
    })();
  }, []);

  return {
    answer,
    content,
    documents,
    status,
  };
}
