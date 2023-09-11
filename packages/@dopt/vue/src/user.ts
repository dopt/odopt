import { inject } from 'vue';
import { UPDATE_USER_KEY } from './plugin-keys';
import { DoptConfig } from '@dopt/javascript';

/**
 * A Vue composable to access a setter to update the page's current user.
 *
 * @remarks
 * This is useful if you did't specify a user when initializing {@link DoptPlugin}.
 * You might not have been able to specify a user at plugin time because
 * a user was not available (for example, a user was being fetched asynchronously).
 *
 * @returns A function which can be called with a userId and optionally a groupId.
 * When the function is called, the {@link DoptPlugin}'s userId will be reconfigured
 * and the plugin will reload.
 */
export function useUpdateUser() {
  const updateUser = inject(UPDATE_USER_KEY);

  if (!updateUser) {
    throw new Error('Cannot call `useUpdateUser` without using DoptPlugin');
  }

  return (userId: DoptConfig['userId'], groupId?: DoptConfig['groupId']) =>
    updateUser(userId, groupId);
}
