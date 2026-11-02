import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ mode }) => {
  const isClient = mode === 'client'
  const isAdmin = mode === 'admin'
  
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@client': path.resolve(__dirname, './src/client'),
        '@admin': path.resolve(__dirname, './src/admin'),
        '@shared': path.resolve(__dirname, './src/shared'),
      },
    },
    server: {
      // Bind to all network interfaces so the app is reachable via IP
      host: '0.0.0.0',
      port: isClient ? 4200 : isAdmin ? 4100 : 3000,
    },
    build: {
      outDir: isClient ? 'dist/client' : isAdmin ? 'dist/admin' : 'dist',
    },
  }
}) // vite reload

