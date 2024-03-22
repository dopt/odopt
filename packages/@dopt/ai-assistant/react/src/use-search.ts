import { useContext, useEffect, useState } from 'react';
import { DoptAiContext } from './context';

import {
  AnswerChunk,
  AssistantSearchRequestBody,
} from '@dopt/ai-assistant-definition';
import { AssistantContextProps } from '@dopt/ai-assistant-javascript';

/**
 * A React hook for accessing an AI assistant
 *
 * @example
 * ```tsx
 * import { useSearch } from '@dopt/ai-assistant-react';
 *
 * export function Application() {
 *   const results = useSearch("HNWvcT78tyTwygnbzU6SW", { query, context });
 * }
 * ```
 * @param sid - {@link Assistant['sid']}
 * @param query - string, the query to be passed to the assistant
 * @param context.document - boolean, whether to use page level context like title and URL (default false)
 * @param context.element - the element the user is interacting with (default undefined)
 * @param context.visual - boolean, whether to use a screenshot of the page (default false)
 * this param accepts the user defined identifier (sid)
 *
 * @returns a collection of `documents`
 */
export function useSearch(
  sid: string,
  {
    query,
    context: { document, element, visual },
  }: {
    query: AssistantSearchRequestBody['query'];
    context: {
      document?: AssistantContextProps['document'];
      element?: AssistantContextProps['element'];
      visual?: AssistantContextProps['visual'];
    };
  }
) {
  const { assistant } = useContext(DoptAiContext);

  const [documents, setDocuments] = useState<AnswerChunk['sources'] | null>(
    null
  );

  useEffect(() => {
    if (!query) {
      return;
    }
    setDocuments(null);
    (async () => {
      const results = await assistant.search(sid, {
        query,
        context: {
          document,
          element,
          semantic: element != null,
          visual,
        },
      });

      setDocuments(results || []);
    })();
  }, [assistant, document, element, visual, query, sid]);

  return {
    documents,
  };
}
