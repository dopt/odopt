<script setup lang="ts">
import { Dopt } from '@dopt/javascript';
import { DoptApiClient as UsersApiClient } from '@dopt/users-javascript-browser-client';

import { provide, ref, readonly } from 'vue';
import { nanoid } from 'nanoid';

import HomePage from './HomePage.vue';

const dopt = ref<Dopt>();

/**
 * Create a provider for dopt for all children.
 */
provide('dopt', readonly(dopt));

(async function () {
  /**
   * Create a static example user.
   */
  const user = {
    identifier: nanoid(),
    properties: {
      company: 'Dopt',
      role: 'admin',
      inTrial: true,
    },
  };

  const usersClient = new UsersApiClient({
    environment: import.meta.env.VITE_DOPT_USERS_SDK_BASE_URL,
    apiKey: import.meta.env.VITE_DOPT_USERS_API_KEY,
  });

  /**
   * Identify the example user to Dopt during App setup.
   */
  await usersClient.users.identifyUser(user);

  /**
   * Once the user has been created, we can initialize Dopt.
   */
  dopt.value = new Dopt({
    apiKey: import.meta.env.VITE_DOPT_BLOCKS_API_KEY,
    userId: user.identifier,
    flowVersions: { 'custom-tour-component': 1 },
  });
})();
</script>

<template>
  <template v-if="dopt">
    <HomePage />
  </template>
</template>

<style>
* {
  box-sizing: border-box;
}

:root {
  font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui,
    helvetica neue, helvetica, Cantarell, Ubuntu, roboto, noto, arial,
    sans-serif;
  line-height: 1.5;
}
</style>
