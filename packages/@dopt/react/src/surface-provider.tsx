import { Logger } from '@dopt/logger';
import { setupSocket } from '@dopt/javascript-common';
import React, {
  RefObject,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { DoptApi, DoptApiClient } from '@dopt/surfaces-javascript-client';
import { ProviderConfig } from './types';

type Socket = ReturnType<typeof setupSocket>;

export type Surface = DoptApi.GetSurfaceResponse;
export type Messages = DoptApi.GetSurfaceResponse['messages'];

type SurfaceContext = {
  fetching: boolean;
  logger: RefObject<Logger>;
  client: DoptApiClient;
  userIdentifier?: string;
  groupIdentifier?: string;
  surfaceMessages: Map<string, Messages>;
};

export const SurfaceContext = createContext<SurfaceContext>(
  {} as SurfaceContext
);

interface SurfaceProviderProps
  extends Pick<
    ProviderConfig,
    'userId' | 'groupId' | 'apiKey' | 'children' | 'surfaces'
  > {
  logger: RefObject<Logger>;
  socket: RefObject<Socket>;
}

export function SurfaceProvider({
  apiKey,
  children,
  groupId,
  logger,
  surfaces = [],
  userId,
}: SurfaceProviderProps) {
  const client = useMemo(() => {
    return new DoptApiClient({
      apiKey,
    });
  }, [apiKey]);

  const [surfaceMessages, setSurfaceMessages] = useState<Map<string, Messages>>(
    new Map()
  );

  const [fetching, setFetching] = useState<boolean>(false);

  const fetchSurfaces = useCallback(
    (sids: string[], userIdentifier: string, groupIdentifier?: string) => {
      return Promise.all(
        sids.map((sid) =>
          client.surfaces.getSurface(sid, {
            userIdentifier,
            groupIdentifier,
          })
        )
      );
    },
    [client]
  );

  useEffect(() => {
    if (!userId) {
      return;
    }

    setFetching(true);

    fetchSurfaces(surfaces, userId, groupId).then((surfaces) => {
      const _surfaceMessages: typeof surfaceMessages = new Map();
      surfaces.forEach((surface) => {
        _surfaceMessages.set(surface.sid, surface.messages);
      });
      setSurfaceMessages(_surfaceMessages);
    });
  }, [fetchSurfaces, userId, groupId, surfaces]);

  return (
    <SurfaceContext.Provider
      value={{
        client,
        fetching,
        logger,
        userIdentifier: userId,
        groupIdentifier: groupId,
        surfaceMessages,
      }}
    >
      {children}
    </SurfaceContext.Provider>
  );
}
