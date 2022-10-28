export const URL_PREFIX = process.env.URL_PREFIX;
import { Logger } from '@dopt/logger';
import { io, Socket } from 'socket.io-client';

export function setupSocket(
  apiKey: string,
  userId: string | undefined,
  log: Logger,
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>
): Socket | undefined {
  if (userId) {
    log.debug('Initializing socket connection.');
    const socket = io(URL_PREFIX + `/client?endUserIdentifier=${userId}`, {
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
      setIsConnected(true);
    });
    socket.on('disconnect', (reason: string) => {
      log.debug('Socket disconnected.');
      setIsConnected(false);
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
}
