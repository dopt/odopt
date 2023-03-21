import { Logger } from '@dopt/logger';
import { io, Socket } from 'socket.io-client';
import { GroupIdentifier, UserIdentifier } from './client';

export type SocketApi = {
  apiKey: string;
  userId: UserIdentifier['userId'];
  log: Logger;
  urlPrefix: string;
  groupId?: GroupIdentifier['groupId'];
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

  const query = `/v1/client?endUserIdentifier=${userId}${
    groupId ? `&groupIdentifier=${groupId}` : ``
  }`;

  log.debug('Initializing socket connection.');

  const socket = io(urlPrefix + query, {
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
    } else {
      log.debug('Socket reconnecting automatically.');
    }
  });

  return socket;
}
