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

export type Channel = DoptApi.GetResponse;
export type Messages = DoptApi.GetResponse['messages'];

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

function channelSidsEqual(
  previousSids: ProviderConfig['channels'],
  currentSids: ProviderConfig['channels']
): boolean {
  if (!previousSids || !currentSids) {
    return false;
  }

  if (previousSids.length !== currentSids.length) {
    return false;
  }

  const previousSet = new Set(previousSids);

  for (const currentSid of currentSids) {
    if (!previousSet.has(currentSid)) {
      return false;
    }
  }

  return true;
}

export function ChannelProvider(props: ChannelProviderProps) {
  const { channels: channelSids, children } = props;

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

  /**
   * Create a stable state variable for channelSids so that
   * we can use it as a dependency in hooks.
   */
  const [stableChannelSids, setStableChannelSids] = useState(channelSids);
  useEffect(() => {
    setStableChannelSids((stableChannelSids) => {
      return !channelSidsEqual(stableChannelSids, channelSids)
        ? channelSids
        : stableChannelSids;
    });
  }, [channelSids]);

  const fetchChannels = useCallback(
    (
      sids: string[] | undefined,
      userIdentifier: string,
      groupIdentifier?: string
    ) => {
      return Promise.all(
        (sids || []).map((sid) =>
          client.channels.get(sid, {
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
      fetchChannels(stableChannelSids, userId, groupId).then((channels) => {
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
  }, [
    socket,
    fetchChannels,
    userId,
    groupId,
    stableChannelSids,
    socketStatus,
    logger,
  ]);

  useEffect(() => {
    if (!socket || !stableChannelSids) {
      return;
    }

    function emitWatchChannels() {
      if (stableChannelSids) {
        stableChannelSids.forEach((sid) => {
          socket?.emit('watch:channel', sid);
          logger.current.debug(`Watching channel "${sid}" for message updates`);
        });
      }
    }

    /**
     * If the socket is already connected, we've reached this point
     * because of a change in flowVersions. In that case, we should just
     * emit the `watch:flow` events right away.
     */
    if (socket.connected) {
      emitWatchChannels();
    }

    /**
     * Additionally, on each disconnect <> ready transition,
     * we should also emit `watch:flow` events.
     */
    socket.on('ready', emitWatchChannels);

    return () => {
      socket.off('ready', emitWatchChannels);
    };
  }, [socket, stableChannelSids, logger]);

  useEffect(() => {
    if (!socket) {
      return;
    }

    const handleMessagesFromServer = (channel: string, messages: Messages) => {
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

    socket.on('messages', handleMessagesFromServer);

    return () => {
      socket.off('messages', handleMessagesFromServer);
    };
  }, [socket, logger]);

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
