import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://burrow-895563380.us-east-1.elb.amazonaws.com",
      },
      "/query-service": {
        target: "http://burrow-895563380.us-east-1.elb.amazonaws.com",
        changeOrigin: true,
      },
    },
  },
});
