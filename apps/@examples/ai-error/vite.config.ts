import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  base: process.env.NODE_ENV === 'production' ? `/ai-error/` : '/',
  plugins: [react()],
});
