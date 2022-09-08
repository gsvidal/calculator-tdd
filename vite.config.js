import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()], // vite config to work with react
  test: {
    // vitest config
    environment: 'happy-dom',
  },
});
