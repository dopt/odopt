import { useState, useEffect } from 'react';

import { IdentifyApi, Configuration } from '@dopt/users-javascript-client';

import { getUserId } from '@/utils/user';

type Identifier = Parameters<IdentifyApi['identify']>[0];
type Properties = Parameters<IdentifyApi['identify']>[1];

export function useIdentifyUser(properties: Properties) {
  const [usersClient] = useState<IdentifyApi>(
    new IdentifyApi(
      new Configuration({
        apiKey: import.meta.env.VITE_DOPT_USERS_API_KEY,
      })
    )
  );

  const [userId, setUserId] = useState<string>();

  useEffect(() => {
    async function identifyUser(uid: Identifier) {
      await usersClient.identify(uid, {
        ...properties,
      });

      setUserId(uid);
    }

    if (!userId) {
      identifyUser(getUserId());
    }
  }, [usersClient, userId]);

  return userId;
}
