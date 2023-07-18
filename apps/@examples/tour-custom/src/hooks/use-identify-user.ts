import { useState, useEffect } from 'react';

import {
  DoptApi,
  DoptApiClient as UsersApiClient,
} from '@dopt/users-javascript-browser-client';

import { getUserId } from '@/utils/user';

type Identifier = DoptApi.IdentifyUserRequestBody['identifier'];
type Properties = DoptApi.IdentifyUserRequestBody['properties'];

export function useIdentifyUser(properties: Properties) {
  const [usersClient] = useState<UsersApiClient>(
    new UsersApiClient({
      apiKey: import.meta.env.VITE_DOPT_USERS_API_KEY,
    })
  );

  const [userId, setUserId] = useState<string>();

  useEffect(() => {
    async function identifyUser(uid: Identifier) {
      await usersClient.users.identifyUser({
        identifier: uid,
        properties,
      });

      setUserId(uid);
    }

    if (!userId) {
      identifyUser(getUserId());
    }
  }, [usersClient, userId]);

  return userId;
}
