import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isGitHubPages = process.env.DEPLOY_TARGET === 'github';
const outDir = isGitHubPages ? 'docs' : 'dist';
const base = isGitHubPages ? '/rahman-porfolio/' : '/';

export default defineConfig({
  plugins: [react()],
  base,
  build: {
    outDir,
    emptyOutDir: true,
  },
});
