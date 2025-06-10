import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// school : 172.23.2.107
// home : 192.168.14.210
//172.23.2.136 : 206
// 204 : 172.23.3.7
// 111 : 172.23.3.18

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost', // Replace with your desired IP address
    port: 3001,            // Port for Vite's dev server
    proxy: {
      '/api': {
        target: 'http://localhost:4576', // Backend server
        changeOrigin: true, // Ensure host headers match the target
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove /api prefix
      },
    },
  },
});
