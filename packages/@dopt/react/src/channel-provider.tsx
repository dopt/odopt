import { Logger } from '@dopt/logger';
import React, {
  RefObject,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { DoptApi, DoptApiClient } from '@dopt/channels-javascript-client';
import { ProviderConfig } from './types';
import { DoptContext } from './context';

export type Channel = DoptApi.GetChannelResponse;
export type Messages = DoptApi.GetChannelResponse['messages'];

type ChannelContext = {
  uninitialized: boolean;
  logger: RefObject<Logger>;
  client: DoptApiClient;
  userIdentifier?: string;
  groupIdentifier?: string;
  channelMessages: Record<string, Messages>;
};

export const ChannelContext = createContext<ChannelContext>(
  {} as ChannelContext
);

type ChannelProviderProps = Pick<ProviderConfig, 'channels' | 'children'>;

export function ChannelProvider(props: ChannelProviderProps) {
  const { channels, children } = props;

  const { apiKey, groupId, userId, logger, socket, socketStatus } =
    useContext(DoptContext);

  const client = useMemo(() => {
    return new DoptApiClient({
      apiKey,
      environment: process.env.CHANNELS_PREFIX,
    });
  }, [apiKey]);

  const [channelMessages, setChannelMessages] = useState<
    Record<string, Messages>
  >({});

  const [uninitialized, setUninitialized] = useState<boolean>(true);

  const fetchChannels = useCallback(
    (sids: string[], userIdentifier: string, groupIdentifier?: string) => {
      return Promise.all(
        sids.map((sid) =>
          client.channels.getChannel(sid, {
            userIdentifier,
            groupIdentifier,
          })
        )
      );
    },
    [client]
  );

  useEffect(() => {
    if (!socket || !userId || !channels || socketStatus !== 'ready') {
      return;
    }

    (async function handleSocketReady() {
      fetchChannels(channels, userId, groupId).then((channels) => {
        const _channelMessages: typeof channelMessages = {};
        channels.forEach((channel) => {
          _channelMessages[channel.sid] = channel.messages;
        });
        setChannelMessages(_channelMessages);
        setUninitialized(false);
        logger.current.debug('Channels fetched successfully');

        channels.forEach((channel) => {
          socket.emit('watch:channel', channel.sid);
        });
      });
    })();
  }, [socket, fetchChannels, userId, groupId, channels, socketStatus, logger]);

  const handleMessagesFromServer = useCallback(
    (channel: string) => {
      return (messages: Messages) => {
        logger.current.debug(
          `The following message were updated and pushed from the server.\n${Object.values(
            messages
          )
            .map((message) => JSON.stringify(message, null, 2))
            .join('\n')}`
        );

        setChannelMessages((prev) => ({
          ...prev,
          [channel]: messages,
        }));
      };
    },
    [logger]
  );

  useEffect(() => {
    if (!socket || !channels) {
      return;
    }

    const listeners = channels.map((channel) => {
      const listener = handleMessagesFromServer(channel);
      socket.on(`channel[${channel}].messages`, listener);
      return listener;
    });

    return () => {
      channels.map((channel, index) => {
        socket.off(`channel[${channel}].messages`, listeners[index]);
      });
    };
  }, [socket, logger, channels, channelMessages, handleMessagesFromServer]);

  return (
    <ChannelContext.Provider
      value={{
        client,
        uninitialized,
        logger,
        userIdentifier: userId,
        groupIdentifier: groupId,
        channelMessages,
      }}
    >
      {children}
    </ChannelContext.Provider>
  );
}
