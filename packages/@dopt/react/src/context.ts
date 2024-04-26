import { Logger } from '@dopt/logger';
import { MutableRefObject, createContext } from 'react';

import { ProviderConfig, Socket, SocketStatus } from './types';

/**
 * The context stored within Dopt's provider. It is
 * partially accessible through hooks like
 * {@link useBlock} and {@link useFlow}.
 */
type DoptContext = {
  socket: Socket;
  socketStatus: SocketStatus;
  logger: MutableRefObject<Logger>;
  userId: ProviderConfig['userId'];
  groupId?: ProviderConfig['groupId'];
  apiKey: ProviderConfig['apiKey'];
};

const DoptContext = createContext<DoptContext>({} as DoptContext);

export { DoptContext };
