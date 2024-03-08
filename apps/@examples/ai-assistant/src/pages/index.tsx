import {
  destinations,
  example,
  footerNav,
  navigation,
  topNav,
} from '@/pages/index.css';

import { Brand, Destinations, Navigation, User, isMac } from '@/components';
import ContextualAssistant, {
  useContextualAssistant,
} from '@dopt/react-contextual-assistant';
import { useEffect } from 'react';

export function Example() {
  const {
    close,
    selection,
    setActive,
    answer,
    content,
    documents,
    submittedQuery,
    enteredQuery,
    canSubmitQuery,
    onEnteredQuery,
    submitQuery,
  } = useContextualAssistant();

  useEffect(() => {
    function keyboardShortcut(e: KeyboardEvent) {
      if (((isMac() && e.metaKey) || (!isMac() && e.ctrlKey)) && e.key == 'e') {
        close();
        setActive(true);
        e.preventDefault();
        e.stopPropagation();
      }
    }
    window.addEventListener('keydown', keyboardShortcut);
    return () => window.removeEventListener('keydown', keyboardShortcut);
  }, [close, setActive]);

  return (
    <div className={example}>
      <div className={navigation}>
        <div className={topNav}>
          <Brand />
          <Navigation />
        </div>
        <div className={footerNav}>
          <User />
        </div>
      </div>
      <div className={destinations}>
        <Destinations />
      </div>
      {selection && (
        <ContextualAssistant.Popover
          position="right"
          alignment="start"
          anchor={selection}
        >
          <ContextualAssistant.Content>
            <ContextualAssistant.Header>
              <ContextualAssistant.Title>
                ✨ AI assistant
              </ContextualAssistant.Title>
              <ContextualAssistant.DismissIcon onClick={() => close()} />
            </ContextualAssistant.Header>
            <ContextualAssistant.Body>
              {submittedQuery && (
                <ContextualAssistant.BodyHeading>
                  {submittedQuery}
                </ContextualAssistant.BodyHeading>
              )}
              {answer || content ? (
                <ContextualAssistant.Answer>
                  {answer || content}
                </ContextualAssistant.Answer>
              ) : (
                <div style={{ display: 'grid', gap: 8 }}>
                  <ContextualAssistant.Skeleton />
                  <ContextualAssistant.Skeleton width="85%" />
                  <ContextualAssistant.Skeleton width="95%" />
                </div>
              )}
              {documents && documents.length > 0 && (
                <>
                  <ContextualAssistant.BodyHeading>
                    Sources
                  </ContextualAssistant.BodyHeading>
                  <ContextualAssistant.Sources>
                    {documents.map(({ url, title, id }) => (
                      <ContextualAssistant.Source key={id} url={url} index={id}>
                        {title}
                      </ContextualAssistant.Source>
                    ))}
                  </ContextualAssistant.Sources>
                </>
              )}
            </ContextualAssistant.Body>
            <ContextualAssistant.Question
              canSubmitQuery={canSubmitQuery}
              onEnteredQuery={onEnteredQuery}
              submitQuery={submitQuery}
            >
              {enteredQuery}
            </ContextualAssistant.Question>
          </ContextualAssistant.Content>
        </ContextualAssistant.Popover>
      )}
    </div>
  );
}
