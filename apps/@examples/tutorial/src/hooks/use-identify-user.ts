import { useState, useEffect } from 'react';

import {
  IdentifyApi,
  Configuration,
  IdentifyUserRequestBody,
} from '@dopt/users-javascript-client';

import { getUserId } from '@/utils/user';

type Identifier = IdentifyUserRequestBody['identifier'];
type Properties = IdentifyUserRequestBody['properties'];

export function useIdentifyUser(properties: Properties) {
  const [usersClient] = useState<IdentifyApi>(
    new IdentifyApi(
      new Configuration({
        apiKey: import.meta.env.FVITE_DOPT_USERS_API_KEY,
      })
    )
  );

  const [userId, setUserId] = useState<string>();

  useEffect(() => {
    async function identifyUser(uid: Identifier) {
      await usersClient.identifyUser({
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
