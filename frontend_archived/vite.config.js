import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuration Vite pour NewsPulse frontend
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    proxy: {
      // Redirection des appels API vers le backend
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
