import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../server/public',
    emptyOutDir: true
  },
  resolve: {
    alias: {
      'picocss': path.resolve(__dirname, '../node_modules/@picocss/pico/css')
    }
  },
  server: {
    proxy: {
      '/locationsData': {
        target: 'http://localhost:3001',
        changeOrigin: true
      },
      '/eventsData': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
})