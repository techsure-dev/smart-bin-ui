import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';

export default defineConfig({
   plugins: [react(),svgr()],
   server: {
    host: true, 
    allowedHosts: [
      'app-smart-bin.techsure.xyz'
    ],
    proxy: {
      '/api': {
        target: 'https://api-smart-bin.techsure.xyz', 
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});

