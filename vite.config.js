import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    fs: {
      strict: false,
    },
  },
  logLevel: 'info', // Set log level to info for more detailed logs
  clearScreen: false, // Prevent clearing the console to keep logs visible
})
