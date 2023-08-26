import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // '/api': { 
      //   target: "localhost:4000/api/",
      //   changeOrigin: true,
      //   secure: false,
      // }
      '/api': 'http://localhost:4000/'
    }
  },
  plugins: [react()],
})
