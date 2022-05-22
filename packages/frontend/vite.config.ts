import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import environmentPlugin from 'vite-plugin-environment';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), environmentPlugin('all')]
});
