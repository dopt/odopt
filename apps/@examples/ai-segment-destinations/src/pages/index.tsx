import {
  destinations,
  example,
  footerNav,
  navigation,
  topNav,
} from '@/pages/index.css';

import { Brand, Destinations, Navigation, User } from '@/components';
import ContextualAssistant, {
  useContextualAssistant,
} from '@dopt/react-contextual-assistant';

export function Example() {
  const { close, selection, answer, content, documents } =
    useContextualAssistant();

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
              {!content && (
                <div style={{ display: 'grid', gap: 8 }}>
                  <ContextualAssistant.Skeleton />
                  <ContextualAssistant.Skeleton width="85%" />
                  <ContextualAssistant.Skeleton width="95%" />
                </div>
              )}
              <ContextualAssistant.Answer>
                {answer || content}
              </ContextualAssistant.Answer>
              <ContextualAssistant.BodyHeading>
                Sources
              </ContextualAssistant.BodyHeading>
              {!documents && <ContextualAssistant.Skeleton height={64} />}
              <ContextualAssistant.Sources>
                {documents?.map(({ url, title, id }) => (
                  <ContextualAssistant.Source key={id} url={url} index={id}>
                    {title}
                  </ContextualAssistant.Source>
                ))}
              </ContextualAssistant.Sources>
            </ContextualAssistant.Body>
          </ContextualAssistant.Content>
        </ContextualAssistant.Popover>
      )}
    </div>
  );
}
