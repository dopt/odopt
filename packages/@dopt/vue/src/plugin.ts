import { Plugin } from 'vue';
import { DOPT_KEY, UPDATE_USER_KEY } from './plugin-keys';
import { Dopt, DoptConfig } from '@dopt/javascript';

export interface DoptPluginOptions {
  /**
   * The userId you're fetching block and flows for.
   *
   * @remarks
   * If this userId is undefined, you can subsequently
   * call the setter returned by {@link useUpdateUser}
   * to register the appropriate user and / or group.
   */
  userId: DoptConfig['userId'];
  /**
   * An optional groupId for that userId.
   */
  groupId?: DoptConfig['groupId'];
  /**
   * Your blocks API key.
   */
  apiKey: DoptConfig['apiKey'];
  logLevel?: DoptConfig['logLevel'];
  /**
   * An object containing all flows and versions you'd like to fetch.
   *
   * The versions can be a number (a fixed version),
   * "uncommitted" which references the uncommitted version in Dopt,
   * or "latest" which references the most recently created version in Dopt.
   *
   * @remarks
   * **⚠️ Warning ⚠️**: Using either "uncommitted" or "latest" will cause
   * updates made in Dopt to be reflected in the provider upon window reload
   * without needing to update or deploy code.
   *
   * @example
   * ```js
   * {
   *   "welcome-to-dopt": 3,
   *   "test-flow": "uncommitted",
   *   "feature-announcements": "latest",
   * };
   * ```
   *
   */
  flowVersions: DoptConfig['flowVersions'];
  /**
   * A boolean which defines whether complete intents on step blocks should
   * optimistically update the client before hearing back that the change
   * has been committed.
   *
   * Within {@link Dopt}, this defaults to `true` unless explicitly set as `false`.
   */
  optimisticUpdates?: DoptConfig['optimisticUpdates'];
}

/**
 * Install this plugin via `app.use` in order to configure Dopt for your vue app.
 *
 * @remarks
 * This plugin accepts options of type `DoptPluginOptions`.
 *
 * @example
 * ```js
 * import { DoptPlugin } from '@dopt/vue';
 * import App from './App.vue';
 *
 * const app = createApp(App);
 *
 * app.use(DoptPlugin, {
 *   apiKey: 'MY-API-KEY',
 *   userId,
 *   flowVersions: {
 *     'new-user-onboarding': 3,
 *     'plan-upsell': 4,
 *   },
 * });
 * ```
 */
export const DoptPlugin: Plugin<DoptPluginOptions[]> = {
  install(
    app,
    { userId, groupId, apiKey, logLevel, flowVersions, optimisticUpdates }
  ) {
    const dopt = new Dopt({
      apiKey,
      flowVersions,
      userId,
      groupId,
      logLevel,
      optimisticUpdates,
    });

    const updateUser = (
      userId: DoptConfig['userId'],
      groupId?: DoptConfig['groupId']
    ) => {
      dopt.configure({ userId, groupId });
    };

    app.provide(DOPT_KEY, dopt);
    app.provide(UPDATE_USER_KEY, updateUser);
  },
};
