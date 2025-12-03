import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // <-- crucial for Render subpath deployment
  build: {
    outDir: 'docs', // keep docs as output folder
    emptyOutDir: true, // clears old build automatically
  },
});
