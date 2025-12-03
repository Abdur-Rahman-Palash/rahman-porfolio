import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/rahman-porfolio/',
  build: {
    outDir: 'docs', // <-- THIS IS IMPORTANT
  },
  plugins: [react()],
})
