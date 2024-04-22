import {
  AssistantDefaultCompletionsErrorMessage,
  AssistantDocumentSources,
  DoptAiContext,
} from '@dopt/ai-assistant-react';

import {
  useState,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';

import { useDebouncedCallback } from 'use-debounce';

export type HelpHubOptions = {
  errorMessage?: string;
};

export function useHelpHub(
  sid: string,
  options?: HelpHubOptions
): {
  isOpen: boolean;
  searchQuery: string | null;
  searchResults: AssistantDocumentSources | null;
  canAsk: boolean;
  askQuery: string | null;
  askAnswer: string | null;
  askSources: AssistantDocumentSources | null;
  open: () => void;
  close: () => void;
  ask: (query?: string) => void;
  backToSearch: () => void;
  search: (query: string) => void;
} {
  const { assistant } = useContext(DoptAiContext);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [searchResults, setSearchResults] =
    useState<AssistantDocumentSources | null>(null);

  const [askQuery, setAskQuery] = useState<string | null>(null);
  const [askAnswer, setAskAnswer] = useState<string | null>(null);
  const [askSources, setAskSources] = useState<AssistantDocumentSources | null>(
    null
  );

  const errorMessage = options?.errorMessage;

  const errorMessageRef = useRef<string>(
    errorMessage ?? AssistantDefaultCompletionsErrorMessage
  );

  useEffect(() => {
    errorMessageRef.current =
      errorMessage ?? AssistantDefaultCompletionsErrorMessage;
  }, [errorMessage]);

  const open = useCallback(() => setIsOpen(true), []);

  const close = useCallback(() => {
    setIsOpen(false);
    setSearchQuery(null);
    setAskQuery(null);
  }, []);

  const backToSearch = useCallback(() => {
    setAskQuery(null);
  }, []);

  const ask = useCallback(
    (query?: string) => {
      setAskQuery(query ?? searchQuery);
      setSearchQuery(null);
    },
    [searchQuery]
  );

  const search = useDebouncedCallback(
    useCallback(
      (query: string) => {
        assistant
          .search(sid, {
            query,
            context: {},
          })
          .then((results) => setSearchResults(results ?? []))
          .catch(() => setSearchResults([]));
      },
      [assistant, sid]
    ),
    /**
     * Debounce search to 250ms after last search
     */
    250,
    /**
     * Don't wait more than 1000ms for validation and
     * only trigger on trailing (i.e. after waiting, never before waiting)
     */
    { maxWait: 1000, trailing: true, leading: false }
  );

  useEffect(() => {
    if (!searchQuery) {
      setSearchResults(null);
      return;
    }

    const trimmedQuery = searchQuery.trim();

    if (trimmedQuery.length === 0) {
      setSearchResults(null);
      return;
    }

    search(trimmedQuery);
  }, [search, searchQuery]);

  useEffect(() => {
    /**
     * Clear previous state.
     */
    setAskAnswer(null);
    setAskSources(null);

    if (!askQuery) {
      return () => {
        /* no-op */
      };
    }

    const terminate = assistant.completions(
      sid,
      {
        query: askQuery,
        context: {},
      },
      {
        onContent: (content) => setAskAnswer(content),
        onComplete: (answer, sources) => {
          setAskAnswer(answer);
          setAskSources(sources);
        },
        onError: () => {
          setAskAnswer(errorMessageRef.current);
          setAskSources([]);
        },
      }
    );

    return () => terminate();
  }, [askQuery, assistant, sid]);

  const canAsk = useMemo(() => {
    return askQuery == null || (askAnswer != null && askSources != null);
  }, [askQuery, askAnswer, askSources]);

  return {
    isOpen,
    searchQuery,
    searchResults,
    askQuery,
    askAnswer,
    askSources,
    canAsk,
    open,
    close,
    search: setSearchQuery,
    ask,
    backToSearch,
  };
}
