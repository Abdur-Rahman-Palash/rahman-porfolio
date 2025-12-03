import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // When deploying to GitHub Pages under a repository (not user/org root),
  // set `base` to the repo name so built asset URLs include the repo path.
  // Update this if your repository name changes.
  base: '/Frontend-Developer-Abdur-Rahman/',
  // Build into `docs` so GitHub Pages can serve from the `main` branch's `docs/` folder.
  build: {
    outDir: 'docs',
  },
  plugins: [react()],
})
