import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';

export default defineConfig({
   plugins: [react(),svgr()],
   server: {
    proxy: {
      '/api': {
        target: 'http://octocat.thddns.net:8332', 
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});

