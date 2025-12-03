import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/rahman-porfolio/', // Must match repo name EXACTLY
  build: {
    outDir: 'docs', // Correct if deploying from docs folder
  },
  plugins: [react()],
})
