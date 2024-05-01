import React, { useCallback, useEffect, useRef, useState } from 'react';

import { setupSocket } from '@dopt/javascript-common';
import { Logger } from '@dopt/logger';

import { DoptContext } from './context';
import { SocketStatus, ProviderConfig } from './types';
import { PKG_NAME, SOCKET_PREFIX } from './utils';

import { FlowProvider } from './flow-provider';
import { ChannelProvider } from './channel-provider';

type Socket = ReturnType<typeof setupSocket>;

type TimeoutID = Parameters<typeof clearTimeout>[0];

/**
 * The time in milliseconds after a "disconnected" status update
 * that we should wait before propagating the update.
 *
 * We do this because typically, the socket recovers its state
 * within a few seconds and we do not want to force others which
 * depend on the socket's status to unnecessarily churn.
 * For example, we don't want to ask the `flow-provider` to
 * re-initialize all its flows.
 *
 * The value is fixed at 15000 milliseconds (15 seconds).
 */
const SOCKET_STATUS_DISCONNECT_UPDATE_TIMEOUT = 15000;

/**
 * The time in milliseconds that the page should wait
 * after its visibility changes before disconnecting
 * the socket.
 *
 * The value is fixed at 600,000 milliseconds (10 minutes).
 */
const SOCKET_VISIBILITY_DISCONNECT_TIMEOUT = 600000;

/**
 * A boolean which checks whether the package
 * is being loaded in a browser environment.
 */
const IS_BROWSER =
  typeof window !== 'undefined' && typeof window.document !== 'undefined';

/**
 * A React context provider for accessing flows, blocks, and channels.
 *
 * Using {@link ProviderConfig}
 * @example
 * ```tsx
 *  import { DoptProvider } from '@dopt/react';
 *  import Application from './application';
 *
 *  export function Index() {
 *    return (
 *      <DoptProvider
 *        userId={userId}
 *        apiKey={blockAPIKey}
 *        flows={{
 *          onboardingFlow: 3,
 *          upgradeFlow: 1
 *        }}
 *      >
 *        <Application />
 *      </DoptProvider>
 *    );
 *  }
 * ```
 *
 */
export function DoptProvider(props: ProviderConfig) {
  const { userId, groupId, apiKey, channels, children, logLevel } = props;

  const flows = props.flows || props.flowVersions;

  const [socket, setSocket] = useState<Socket | null>(null);
  const [socketStatus, setSocketStatus] = useState<SocketStatus>(null);

  /**
   * Create a ref around Logger so that
   * we can use it within hooks.
   */
  const logger = useRef<Logger>(
    new Logger({ logLevel, prefix: ` ${PKG_NAME} ` })
  );

  const socketStatusDisconnectTimeoutRef = useRef<TimeoutID>(undefined);

  const updateSocketStatus = useCallback((status: SocketStatus) => {
    if (status === 'disconnected') {
      if (socketStatusDisconnectTimeoutRef.current === undefined) {
        socketStatusDisconnectTimeoutRef.current = setTimeout(() => {
          socketStatusDisconnectTimeoutRef.current = undefined;
          setSocketStatus(status);
          logger.current?.debug(
            `Socket disconnected for greater than ${SOCKET_STATUS_DISCONNECT_UPDATE_TIMEOUT} ms. Setting socket status to "disconnected"`
          );
        }, SOCKET_STATUS_DISCONNECT_UPDATE_TIMEOUT);
      }
    } else {
      clearTimeout(socketStatusDisconnectTimeoutRef.current);
      socketStatusDisconnectTimeoutRef.current = undefined;
      setSocketStatus(status);
    }
  }, []);

  /*
   * If the logLevel changes, update the logger reference
   * with a no logger instance
   */
  useEffect(() => {
    logger.current.debug(
      'The `logLevel` property was updated. Creating new logger'
    );
    logger.current = new Logger({ logLevel, prefix: ` ${PKG_NAME} ` });
  }, [logLevel]);

  useEffect(() => {
    if (userId === undefined) {
      logger.current.info(
        'The `userId` prop is undefined. The SDK will not complete initialization until the `userId` is defined'
      );
    }
  }, [userId]);

  useEffect(() => {
    if (groupId === undefined) {
      logger.current.info(
        'The `groupId` prop is undefined. The SDK wont be able to target users correctly if you are actively using groups properties'
      );
    }
  }, [groupId]);

  useEffect(() => {
    logger.current.debug('<DoptProvider /> mounted');
    return () => logger.current.debug('<DoptProvider /> unmounted');
  }, []);

  /*
   * Socket lifecycle management
   */
  useEffect(() => {
    const _socket = setupSocket({
      apiKey,
      userId,
      groupId,
      log: logger.current,
      urlPrefix: SOCKET_PREFIX,
    });

    if (!_socket) {
      updateSocketStatus(null);
      return;
    }

    _socket.on('ready', () => updateSocketStatus('ready'));
    _socket.on('disconnect', () => updateSocketStatus('disconnected'));

    setSocket(_socket);

    return () => {
      _socket.off();
      _socket.disconnect();
      updateSocketStatus(null);
      setSocket(null);
    };
  }, [apiKey, userId, groupId, updateSocketStatus]);

  useEffect(() => {
    if (!IS_BROWSER || !socket) {
      return;
    }

    /**
     * Closed-over variable which tracks
     * whether other disconnect or reconnect attempts
     * are in-progress.
     */
    let disconnectTimeoutId: TimeoutID = undefined;

    function onVisibilityChange() {
      clearTimeout(disconnectTimeoutId);
      disconnectTimeoutId = undefined;

      if (document.visibilityState === 'visible') {
        if (socket?.disconnected) {
          socket?.connect();
        }
      } else {
        disconnectTimeoutId = setTimeout(() => {
          disconnectTimeoutId = undefined;

          if (socket?.connected) {
            socket?.disconnect();
            logger.current.info(
              'Socket disconnected because page backgrounded'
            );
          }
        }, SOCKET_VISIBILITY_DISCONNECT_TIMEOUT);
      }
    }

    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      clearTimeout(disconnectTimeoutId);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [socket]);

  return (
    <DoptContext.Provider
      value={{
        apiKey,
        groupId,
        userId,
        logger,
        socket,
        socketStatus,
      }}
    >
      <FlowProvider flows={userId ? flows : undefined}>
        <ChannelProvider channels={userId ? channels : undefined}>
          {children}
        </ChannelProvider>
      </FlowProvider>
    </DoptContext.Provider>
  );
}
