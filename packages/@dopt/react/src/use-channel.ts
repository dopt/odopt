import { useContext, useMemo, useEffect, RefCallback, useState } from 'react';
import { ChannelContext, Messages } from './channel-provider';

import { observe } from 'react-intersection-observer';

type ApiMessage = Messages[number];

interface Message {
  name: ApiMessage['name'];
  uid: ApiMessage['uid'];
  status: ApiMessage['status'];
  engage: (engagement: string) => void;
  complete: () => void;
  dismiss: () => void;
  ref: RefCallback<HTMLElement>;
}

interface Channel {
  sid: string;
  messages: Message[];
}

export function useChannel(sid: string): Channel {
  const {
    client,
    userIdentifier,
    groupIdentifier,
    channelMessages,
    uninitialized,
    logger,
  } = useContext(ChannelContext);

  if (uninitialized) {
    logger.current?.info(
      'Accessing messages prior to Channel initialization will return an empty array.'
    );
  } else if (channelMessages[sid] == null) {
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
    if (uninitialized || !userIdentifier) {
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
            client.messages.see(messageUid, {
              userIdentifier,
              groupIdentifier,
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
  }, [refs, uninitialized, userIdentifier, groupIdentifier, client, seen]);

  const messages: Message[] = useMemo(() => {
    if (uninitialized || !userIdentifier) {
      return [];
    }

    const messages = channelMessages[sid];

    if (!messages) {
      return [];
    }

    const refsById: Record<string, RefCallback<HTMLElement>> = {};
    for (const message of messages) {
      refsById[message.uid] = (node: HTMLElement) => {
        setRefs((prev) => ({
          ...prev,
          [message.uid]: node,
        }));
      };
    }

    return messages.map((message) => {
      return {
        ...message,
        engage(engagement) {
          client.messages.engage(message.uid, {
            userIdentifier,
            groupIdentifier,
            engagement,
          });
        },
        complete() {
          client.messages.complete(message.uid, {
            userIdentifier,
            groupIdentifier,
            effect: 'complete',
          });
        },
        dismiss() {
          client.messages.complete(message.uid, {
            userIdentifier,
            groupIdentifier,
            effect: 'dismiss',
          });
        },
        ref: refsById[message.uid],
      };
    });
  }, [
    uninitialized,
    userIdentifier,
    groupIdentifier,
    channelMessages,
    sid,
    client,
  ]);

  return {
    sid,
    messages,
  };
}
