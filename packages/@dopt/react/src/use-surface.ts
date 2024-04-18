import { useContext } from 'react';
import { SurfaceContext, Messages } from './surface-provider';

type ApiMessage = Messages[number];

interface Message {
  name: ApiMessage['name'];
  uid: ApiMessage['uid'];
  status: ApiMessage['status'];
  engagement: (
    engagement: 'click' | 'seen' | (string & {}),
    effect?: 'complete' | 'dismiss' | (string & {})
  ) => void;
  trackClick: (effect?: 'complete' | 'dismiss' | (string & {})) => void;
  trackSeen: () => void;
}

interface Surface {
  sid: string;
  messages: Message[];
}

//TODO [jm] - the return type is off / we need somethign SDK specific
//that wraps the engagements concept
export function useSurface(sid: string): Surface {
  const {
    client,
    userIdentifier,
    groupIdentifier,
    surfaceMessages,
    fetching,
    logger,
  } = useContext(SurfaceContext);

  if (fetching) {
    logger.current?.info(
      'Accessing messages prior to Surface initialization will return an empty array.'
    );
  }

  if (surfaceMessages.get(sid) == null) {
    logger.current?.warn(
      `
      Could not find any surfaces matching "${sid}" within \`useSurface("${sid}")\`.
      Returning an empty array of messages.
      Check your \`surfaces\` props to ensure "${sid}" is specified there.
    `.trim()
    );
  }

  const messages: Message[] = (surfaceMessages.get(sid) || []).map(
    (message) => {
      return {
        ...message,
        engagement(engagement, effect) {
          if (!userIdentifier) {
            throw new Error();
          }
          client.messages.engagement(message.uid, {
            userIdentifier,
            groupIdentifier,
            engagement,
            effect,
          });
        },
        trackClick(effect) {
          if (!userIdentifier) {
            throw new Error();
          }
          client.messages.engagement(message.uid, {
            userIdentifier,
            groupIdentifier,
            engagement: 'click',
            effect,
          });
        },
        trackSeen() {
          if (!userIdentifier) {
            throw new Error();
          }
          client.messages.engagement(message.uid, {
            userIdentifier,
            groupIdentifier,
            engagement: 'seen',
          });
        },
      };
    }
  );

  return {
    sid,
    messages,
  };
}
