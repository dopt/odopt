import {
  useContext,
  useMemo,
  useEffect,
  RefCallback,
  useState,
  useCallback,
} from 'react';
import { ChannelContext, Messages } from './channel-provider';

import { observe } from 'react-intersection-observer';
import { Field } from './types';

type ApiMessage = Messages[number];

export interface Message {
  name: ApiMessage['name'];
  uid: ApiMessage['uid'];
  status: ApiMessage['status'];
  engage: (engagement: string) => void;
  complete: () => void;
  dismiss: () => void;
  ref: RefCallback<HTMLElement>;
  /**
   * Gets the field (see {@link Field['value']}) with the `name`
   * (see {@link Field['sid']}) contained by this {@link Message}.
   *
   * If Dopt is loading or {@link Message} does not have a field
   * with the specified name, `undefined` is returned.
   *
   * `null` is returned when the field has been explicitly
   * configured in app.dopt.com to have an empty value.
   */
  field: <V extends Field['value']>(name: string) => V | null | undefined;
}

export interface Channel {
  sid: string;
  messages: Message[];
  /**
   * This function resets the status of all messages in the channel.
   * This will cause all messages to be re-evaluated and re-qualified.
   *
   * In general, this function should only be used for development
   * and testing purposes because its use may lead to downstream
   * confusion with analytics, logging, etc.
   *
   * @returns void
   */
  reset: () => void;
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
        field: <V extends Field['value']>(name: string) => {
          /**
           * If:
           * - Dopt is uninitialized
           * - a Message doesn't have the specified field
           * we return `undefined`.
           */
          if (uninitialized || !message.fields[name]) {
            return undefined;
          }

          /**
           * We return `null` for a value if
           * that value has been explicitly configured in
           * Dopt to not have a value.
           *
           * Otherwise, we return the value itself.
           */
          const value = message.fields[name].value ?? null;

          return value == null ? value : (value as V);
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

  const reset = useCallback(() => {
    if (uninitialized || !userIdentifier) {
      return;
    }

    client.channels.reset(sid, {
      userIdentifier,
      groupIdentifier,
    });
  }, [uninitialized, sid, userIdentifier, groupIdentifier, client]);

  return {
    sid,
    messages,
    reset,
  };
}
