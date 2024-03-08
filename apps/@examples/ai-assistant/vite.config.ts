import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  base: process.env.NODE_ENV === 'production' ? `/ai-assistant/` : '/',
  plugins: [react(), vanillaExtractPlugin()],
});
