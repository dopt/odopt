import { useContext, useEffect, useState } from 'react';
import { DoptAiContext } from './context';

import {
  AnswerChunk,
  ContentStreamChunk,
  StatusChunk,
} from '@dopt/ai-assistant-definition';

import { AssistantCompletionsRequestBody } from '@dopt/ai-assistant-definition';

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
 * @param query - string, the query to be passed to the assistant
 * @param context.document - boolean, whether to use page level context like title and URL (default false)
 * @param context.element - the element the user is interacting with (default undefined)
 * @param context.visual - boolean, whether to use a screenshot of the page (default false)
 * this param accepts the user defined identifier (sid)
 *
 * @returns an object of: `answer`, `content`, `status`, and `documents`
 * Each value in the object maps to the current state of the assistant.
 * As the answer streams back, `content` will be updated.
 * Once the answer is completed, `answer` and `documents` will be updated.
 * `status` reflects either `searching` or `answering` depending on the state of the stream.
 */
export function useAssistant(
  sid: string,
  {
    query,
    context: { document, element, visual },
  }: {
    query: AssistantCompletionsRequestBody['query'];
    context: {
      document?: boolean;
      element?: Element;
      visual?: boolean;
    };
  }
) {
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

    if (!query || query.length === 0) {
      return () => {
        /* no-op */
      };
    }

    const terminate = assistant.completions(
      sid,
      {
        query,
        context: {
          document,
          element,
          semantic: element != null,
          visual,
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
  }, [assistant, document, element, visual, query, sid]);

  return {
    answer,
    content,
    documents,
    status,
  };
}
