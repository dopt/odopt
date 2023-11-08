import { createApp } from 'vue';
import App from './pages/App.vue';
import { DoptPlugin } from '@dopt/vue';

const app = createApp(App);

app.use(DoptPlugin, {
  apiKey: import.meta.env.VITE_DOPT_BLOCKS_API_KEY,
  flowVersions: { 'custom-card-component': 1 },
  userId: undefined,
});

app.mount('#app');
