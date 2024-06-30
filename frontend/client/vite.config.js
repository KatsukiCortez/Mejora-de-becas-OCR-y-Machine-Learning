import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/octi': 'http://localhost:8080', //el backend corre en el puerto 8080
    }
  }
})
