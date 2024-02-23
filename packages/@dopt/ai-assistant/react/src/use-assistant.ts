import { useContext, useEffect, useState } from 'react';
import { DoptAiContext } from './context';

import {
  AnswerChunk,
  ChatStreamChunk,
  ContentStreamChunk,
  StatusChunk,
} from '@dopt/ai-assistant-definition';

import { AssistantCompletionsRequestBody } from '@dopt/ai-assistant-definition';
import { AssistantContextProps } from '@dopt/ai-assistant-javascript';

/**
 * A React hook for accessing an AI assistant
 *
 * @example
 * ```tsx
 * import { useAssistant } from '@dopt/ai-assistant-react';
 *
 * export function Application() {
 *   const assistant = useAssistant("HNWvcT78tyTwygnbzU6SW", { query, context });
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
  const [documents, setDocuments] = useState<AnswerChunk['sources'] | null>(
    null
  );
  const [answer, setAnswer] = useState<AnswerChunk['answer'] | null>(null);
  const [content, setContent] = useState<ContentStreamChunk['content'] | null>(
    null
  );

  const { assistant } = useContext(DoptAiContext);

  useEffect(() => {
    /**
     * Clear previous states.
     */
    setStatus(null);
    setDocuments(null);
    setAnswer(null);
    setContent(null);

    assistant
      .completions(sid, {
        query,
        context,
      })
      .then(async (stream) => {
        for await (const chunk of stream) {
          setChunks((chunks) => {
            return [...chunks, chunk];
          });
          switch (chunk.type) {
            case 'status':
              setStatus(chunk.status);
              break;
            case 'answer':
              setAnswer(chunk.answer);
              setDocuments(chunk.sources);
              break;
            case 'content':
              setContent((prevContent) =>
                prevContent == null
                  ? chunk.content
                  : prevContent + chunk.content
              );
              break;
          }
        }
      });
  }, [assistant, context, query, sid]);

  return {
    answer,
    content,
    documents,
    status,
  };
}
