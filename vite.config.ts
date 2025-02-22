import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@i18n': path.resolve(__dirname, './src/i18n'),
    }
  },
  server: {
    host: true,
    port: 3000,
    watch: {
      usePolling: true
    }
  }
})
