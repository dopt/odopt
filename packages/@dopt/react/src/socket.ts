export const URL_PREFIX = process.env.URL_PREFIX;
import { Logger } from '@dopt/logger';
import { io, Socket } from 'socket.io-client';

export function setupSocket(
  apiKey: string,
  userId: string | undefined,
  log: Logger
): Socket | undefined {
  if (userId) {
    const socket = io(URL_PREFIX + `/client?endUserIdentifier=${userId}`, {
      withCredentials: true,
      auth: {
        'x-api-key': apiKey,
      },
    });
    socket.on('error', (error: string) => {
      log.error(error);
    });
    socket.on('disconnect', (reason: string) => {
      if (reason === 'io server disconnect') {
        // the disconnection was initiated by the server, you need to reconnect manually
        socket.connect();
      }
      // else the socket will automatically try to reconnect
    });
    return socket;
  }
}
