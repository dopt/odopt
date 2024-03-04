import { useContext } from 'react';
import { ContextualAssistantContext } from './contextual-assistant';

export function useContextualAssistant() {
  const {
    active,
    answer,
    close,
    content,
    documents,
    selection,
    setActive,
    status,
    submittedQuery,
    enteredQuery,
    onEnteredQuery,
    canSubmitQuery,
    submitQuery,
  } = useContext(ContextualAssistantContext);

  return {
    active,
    answer,
    close,
    content,
    documents,
    selection,
    setActive,
    status,
    submittedQuery,
    enteredQuery,
    onEnteredQuery,
    canSubmitQuery,
    submitQuery,
  };
}
