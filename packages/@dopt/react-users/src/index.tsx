import React, {
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
} from '@dopt/users-javascript-client';

export type DoptUsersContext = {
  client: UsersApiClient;
};

const DoptUsersContext = createContext<DoptUsersContext>(
  {} as DoptUsersContext
);

/**
 * @property apiKey Your users API key.
 * @interface
 */
export type DoptUserProps = ConstructorParameters<typeof UsersApiClient>[0] &
  PropsWithChildren;

/**
 * A React context provider for accessing Dopt's users API.
 *
 * @example
 * ```tsx
 * import { DoptUsersProvider } from '@dopt/react-users';
 * import Application from './application';
 *
 * const rootElement = document.getElementById('root');
 * ReactDOM.render(
 *  <DoptUsersProvider apiKey={usersApiKey}>
 *    <Application />
 *  </DoptProvider>,
 *  rootElement
 * );
 * ```
 */
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

export type IdentifyUserRequest = Parameters<
  UsersApiClient['users']['identifyUser']
>[0];

/**
 * This hook wraps `@dopt/users-javascript-client` `users.identifyUser`.
 *
 * The first time this hook is called, it will return `undefined` and
 * call `users.identifyUser`. Once the `identifyUser` call completes,
 * it will return the `userIdentifier`.
 *
 * On subsequent calls, the hook will return the previous `userIdentifier`
 * and call `users.identifyUser`. Once the `identifyUser` call completes,
 * it will return the new `userIdentifier`.
 *
 * @remarks
 * Internally, this hook uses the `request` as a dependency to a `useEffect` hook
 * which will be only be triggered when the `request` reference changes.
 *
 * @param request `users.identifyUser` request body, consisting of a user `identifier`, a `properties` object, and optional `groups` (see `identifyGroup`)
 * @returns the `userIdentifier` string (or `undefined` on initial call)
 */
export function useIdentifyUser(request: IdentifyUserRequest) {
  const { client } = useContext(DoptUsersContext);
  const [userId, setUserId] = useState<string>();

  useEffect(() => {
    async function identifyUser() {
      try {
        await client.users.identifyUser(request);
      } catch (e) {
        errorHandler(e, 'useIdentifyUser');
      }

      setUserId(request.identifier);
    }

    identifyUser();
  }, [client, request]);

  return userId;
}

export type IdentifyGroupRequest = Parameters<
  UsersApiClient['groups']['identifyGroup']
>[0];

/**
 * This hook wraps `@dopt/users-javascript-client` `groups.identifyGroup`.
 *
 * The first time this hook is called, it will return `undefined` and
 * call `groups.identifyGroup`. Once the `identifyGroup` call completes,
 * it will return the `groupIdentifier`.
 *
 * On subsequent calls, the hook will return the previous `groupIdentifier`
 * and call `groups.identifyGroup`. Once the `identifyGroup` call completes,
 * it will return the new `groupIdentifier`.
 *
 * @remarks
 * Internally, this hook uses the `request` as a dependency to a `useEffect` hook
 * which will be only be triggered when the `request` reference changes.
 *
 * @param request `users.identifyGroup` request body, consisting of a group `identifier` and a `properties` object
 * @returns the `groupIdentifier` string (or `undefined` on initial call)
 */
export function useIdentifyGroup(request: IdentifyGroupRequest) {
  const { client } = useContext(DoptUsersContext);
  const [groupId, setGroupId] = useState<string>();

  useEffect(() => {
    async function identifyGroup() {
      try {
        await client.groups.identifyGroup(request);
      } catch (e) {
        errorHandler(e, 'useIdentifyGroup');
      }
      setGroupId(request.identifier);
    }

    identifyGroup();
  }, [client, request]);

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
