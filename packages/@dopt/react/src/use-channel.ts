import { useContext, useMemo, useEffect, RefCallback, useState } from 'react';
import { ChannelContext, Messages } from './channel-provider';

import { observe } from 'react-intersection-observer';

type ApiMessage = Messages[number];

interface Message {
  name: ApiMessage['name'];
  uid: ApiMessage['uid'];
  status: ApiMessage['status'];
  engagement: (
    engagement: 'click' | 'seen' | string,
    effect?: 'complete' | 'dismiss' | string
  ) => void;
  complete: () => void;
  dismiss: () => void;
  ref: RefCallback<HTMLElement>;
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

  const [refs, setRefs] = useState<Record<string, HTMLElement>>({});
  const [seen, setSeen] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!userIdentifier) {
      return () => {
        /* */
      };
    }

    const unobserves = Object.entries(refs).map(([messageUid, element]) => {
      if (element && !seen[messageUid]) {
        return observe(
          element,
          (inView) => {
            if (!inView) {
              return;
            }
            setSeen((prev) => ({
              ...prev,
              [messageUid]: true,
            }));
            client.messages.engagement(messageUid, {
              userIdentifier,
              groupIdentifier,
              engagement: 'seen',
            });
          },
          {
            threshold: 1,
          }
        );
      } else {
        return () => {
          /* */
        };
      }
    });

    return () => unobserves.map((unobserve) => unobserve());
  }, [refs, userIdentifier, groupIdentifier, client, seen]);

  const _messages = useMemo(
    () => channelMessages[sid] || [],
    [channelMessages, sid]
  );

  const refsById = useMemo(() => {
    const refs: Record<string, RefCallback<HTMLElement>> = {};
    _messages.forEach((message) => {
      refs[message.uid] = (node: HTMLElement) => {
        setRefs((prev) => ({
          ...prev,
          [message.uid]: node,
        }));
      };
    });
    return refs;
  }, [_messages]);

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
      complete() {
        if (!userIdentifier) {
          throw new Error();
        }
        client.messages.engagement(message.uid, {
          userIdentifier,
          groupIdentifier,
          engagement: 'click',
          effect: 'complete',
        });
      },
      dismiss() {
        if (!userIdentifier) {
          throw new Error();
        }
        client.messages.engagement(message.uid, {
          userIdentifier,
          groupIdentifier,
          engagement: 'click',
          effect: 'complete',
        });
      },
      ref: refsById[message.uid],
    };
  });

  return {
    sid,
    messages,
  };
}
