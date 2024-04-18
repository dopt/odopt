<script setup lang="ts">
import { DoptApiClient as UsersApiClient } from '@dopt/users-javascript-client';
import { nanoid } from 'nanoid';
import { useUpdateUser } from '@dopt/vue';

import HomePage from './HomePage.vue';
const updateUser = useUpdateUser();

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
  updateUser(user.identifier);
})();
</script>

<template>
  <HomePage />
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
  background: #212529;
}
</style>
