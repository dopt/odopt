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
  fetching: boolean;
  logger: RefObject<Logger>;
  client: DoptApiClient;
  userIdentifier?: string;
  groupIdentifier?: string;
  channelMessages: Map<string, Messages>;
};

export const ChannelContext = createContext<ChannelContext>(
  {} as ChannelContext
);

type ChannelProviderProps = Pick<ProviderConfig, 'channels' | 'children'>;

export function ChannelProvider({
  channels = [],
  children,
}: ChannelProviderProps) {
  const { apiKey, groupId, userId, logger, socket, socketStatus } =
    useContext(DoptContext);

  const client = useMemo(() => {
    return new DoptApiClient({
      apiKey,
    });
  }, [apiKey]);

  const [channelMessages, setChannelMessages] = useState<Map<string, Messages>>(
    new Map()
  );

  const [fetching, setFetching] = useState<boolean>(false);

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
    if (!socket || !userId || socketStatus !== 'ready') {
      return;
    }

    (async function handleSocketReady() {
      setFetching(true);

      fetchChannels(channels, userId, groupId).then((channels) => {
        const _channelMessages: typeof channelMessages = new Map();
        channels.forEach((channel) => {
          _channelMessages.set(channel.sid, channel.messages);
        });
        setChannelMessages(_channelMessages);

        channels.forEach((channel) => {
          socket.emit('watch:channel', channel.sid);
        });
      });
    })();
  }, [socket, fetchChannels, userId, groupId, channels, socketStatus]);

  return (
    <ChannelContext.Provider
      value={{
        client,
        fetching,
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
