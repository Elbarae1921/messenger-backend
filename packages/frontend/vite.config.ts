import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import environmentPlugin from 'vite-plugin-environment';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), environmentPlugin('all')],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
