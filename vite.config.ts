import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://test-lb-tf-791802287.us-east-1.elb.amazonaws.com"
      }
    }
  },
})
