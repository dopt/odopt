import { useCallback, useEffect, useRef } from 'react';

interface AssistantRegistryProps {
  selection: HTMLElement | null;
}

export function useAssistantRegistry({ selection }: AssistantRegistryProps) {
  const assistants = useRef<
    Record<string, Set<(element: HTMLElement) => Promise<void>>>
  >({});

  const registerAssistant = useCallback(
    (sid: string, fn: (element: HTMLElement) => Promise<void>) => {
      if (!assistants.current[sid]) {
        assistants.current[sid] = new Set();
      }
      assistants.current[sid].add(fn);
    },
    []
  );

  const deregisterAssistant = useCallback(
    (sid: string, fn: (element: HTMLElement) => Promise<void>) => {
      if (assistants.current[sid].has(fn)) {
        assistants.current[sid].delete(fn);
      }
    },
    []
  );

  useEffect(() => {
    if (selection) {
      Object.values(assistants.current).forEach((handlers) => {
        handlers.forEach((callback) => callback(selection));
      });
    }
  }, [selection]);

  return {
    registerAssistant,
    deregisterAssistant,
  };
}
