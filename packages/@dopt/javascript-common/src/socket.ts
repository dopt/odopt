import { Logger } from '@dopt/logger';
import { io, Socket } from 'socket.io-client';
import { SOCKET_PATH } from '@dopt/block-api-types';
import { BlocksApi } from './client';

export type SocketApi = {
  apiKey: BlocksApi['apiKey'];
  userId: BlocksApi['userId'];
  log: Logger;
  urlPrefix: string;
  groupId?: BlocksApi['groupId'];
};

export function setupSocket({
  apiKey,
  userId,
  log,
  urlPrefix,
  groupId,
}: SocketApi): Socket | undefined {
  if (!userId) {
    return undefined;
  }

  const params: {
    endUserIdentifier: string;
    groupIdentifier?: string;
  } = {
    endUserIdentifier: userId,
  };

  if (groupId) {
    params['groupIdentifier'] = groupId;
  }

  log.debug('Initializing socket connection.');

  const socket = io(`${urlPrefix}/v2/client`, {
    query: {
      ...params,
    },
    path: SOCKET_PATH,
    transports: ['websocket'],
    withCredentials: true,
    auth: {
      'x-api-key': apiKey,
    },
  });

  socket.on('error', (error: string) => {
    log.error(error);
  });

  socket.on('connect', () => {
    log.debug('Socket connected.');
  });

  socket.on('disconnect', (reason: string) => {
    log.debug('Socket disconnected.');
    if (reason === 'io server disconnect') {
      log.error(
        'Disconnection was initiated by the server, something went wrong.'
      );
    } else if (reason === 'io client disconnect') {
      log.debug('Disconnection initiated by the client.');
    } else {
      log.debug('Socket reconnecting automatically.');
    }
  });

  return socket;
}
