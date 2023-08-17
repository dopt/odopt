import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  DoptApiClient as UsersApiClient,
  DoptApiError,
} from '@dopt/users-javascript-browser-client';

export type DoptUsersContext = {
  client: UsersApiClient;
};

const DoptUsersContext = createContext<DoptUsersContext>(
  {} as DoptUsersContext
);

export type DoptUserProps = ConstructorParameters<typeof UsersApiClient>[0] &
  PropsWithChildren;

export function DoptUsersProvider({
  apiKey,
  children,
  environment,
}: DoptUserProps) {
  const client = useMemo(() => {
    return new UsersApiClient({
      apiKey,
      environment,
    });
  }, [apiKey, environment]);

  return (
    <DoptUsersContext.Provider value={{ client }}>
      {children}
    </DoptUsersContext.Provider>
  );
}

export type IdentifyUserParameters = Parameters<
  UsersApiClient['users']['identifyUser']
>;

/**
 * This hook wraps `@dopt/users-javascript-browser-client` `users.identifyUser`.
 *
 * The first time this hook is called, it will return `undefined` and
 * call `users.identifyUser`. Once the `identifyUser` call completes,
 * it will return the `userIdentifier`.
 *
 * On subsequent calls, the hook will return the previous `userIdentifier`
 * and call `users.identifyUser`. Once the `identifyUser` call completes,
 * it will return the new `userIdentifier`.
 *
 * @param params `users.identifyUser` parameters from `@dopt/users-javascript-browser-client`
 * @returns the `userIdentifier` string (or `undefined` on initial call)
 */
export function useIdentifyUser(...params: IdentifyUserParameters) {
  const { client } = useContext(DoptUsersContext);
  const [userId, setUserId] = useState<string>();

  useEffect(() => {
    async function identifyUser() {
      try {
        await client.users.identifyUser(...params);
      } catch (e) {
        errorHandler(e, 'useIdentifyUser');
      }

      setUserId(params[0].identifier);
    }

    identifyUser();
  }, [client, params]);

  return userId;
}

export type IdentifyGroupParameters = Parameters<
  UsersApiClient['groups']['identifyGroup']
>;

/**
 * This hook wraps `@dopt/users-javascript-browser-client` `groups.identifyGroup`.
 *
 * The first time this hook is called, it will return `undefined` and
 * call `groups.identifyGroup`. Once the `identifyGroup` call completes,
 * it will return the `groupIdentifier`.
 *
 * On subsequent calls, the hook will return the previous `groupIdentifier`
 * and call `groups.identifyGroup`. Once the `identifyGroup` call completes,
 * it will return the new `groupIdentifier`.
 *
 * @param params `groups.identifyGroup` parameters from `@dopt/users-javascript-browser-client`
 * @returns the `groupIdentifier` string (or `undefined` on initial call)
 */
export function useIdentifyGroup(...params: IdentifyGroupParameters) {
  const { client } = useContext(DoptUsersContext);
  const [groupId, setGroupId] = useState<string>();

  useEffect(() => {
    async function identifyGroup() {
      try {
        await client.groups.identifyGroup(...params);
      } catch (e) {
        errorHandler(e, 'useIdentifyGroup');
      }
      setGroupId(params[0].identifier);
    }

    identifyGroup();
  }, [client, params]);

  return groupId;
}

function errorHandler(e: unknown, hookName: string) {
  const messageTitle = `Error in @dopt/react-users "${hookName}" hook.\n`;

  const formattedMessage = (code: number | undefined, message: string) => {
    return `Recieved status code ${code} from the Users API.\n  "${message}"`;
  };

  if (e instanceof DoptApiError) {
    console.error(
      `${messageTitle}${formattedMessage(e.statusCode, e.message)}`
    );
  } else {
    console.error(e);
  }
}
