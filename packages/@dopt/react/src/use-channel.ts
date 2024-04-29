import { useContext } from 'react';
import { ChannelContext, Messages } from './channel-provider';

type ApiMessage = Messages[number];

interface Message {
  name: ApiMessage['name'];
  uid: ApiMessage['uid'];
  status: ApiMessage['status'];
  engagement: (
    engagement: 'click' | 'seen' | string,
    effect?: 'complete' | 'dismiss' | string
  ) => void;
  trackClick: (effect?: 'complete' | 'dismiss' | string) => void;
  trackSeen: () => void;
}

interface Channel {
  sid: string;
  messages: Message[];
}

//TODO [jm] - the return type is off / we need somethign SDK specific
//that wraps the engagements concept
export function useChannel(sid: string): Channel {
  const {
    client,
    userIdentifier,
    groupIdentifier,
    channelMessages,
    fetching,
    logger,
  } = useContext(ChannelContext);

  if (fetching) {
    logger.current?.info(
      'Accessing messages prior to Channel initialization will return an empty array.'
    );
  }

  if (channelMessages[sid] == null) {
    logger.current?.warn(
      `
      Could not find any channels matching "${sid}" within \`useChannel("${sid}")\`.
      Returning an empty array of messages.
      Check your \`channels\` props to ensure "${sid}" is specified there.
    `.trim()
    );
  }

  const messages: Message[] = (channelMessages[sid] || []).map((message) => {
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
  });

  return {
    sid,
    messages,
  };
}
