import { Logger } from '@dopt/logger';
import { io, Socket } from 'socket.io-client';

export function setupSocket(
  apiKey: string,
  userId: string | undefined,
  log: Logger,
  urlPrefix: string
): Socket | undefined {
  if (!userId) {
    return undefined;
  }

  log.debug('Initializing socket connection.');

  const socket = io(urlPrefix + `/client?endUserIdentifier=${userId}`, {
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
      log.debug(
        'Disconnection was initiated by the server, trying to reconnect manually'
      );
      socket.connect();
    } else {
      log.debug('Socket reconnecting automatically.');
    }
  });

  return socket;
}
