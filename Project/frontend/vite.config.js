import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, 
    strictPort: true,
    port: 5173, 
    watch: {
      usePolling: true,
    }
  }
})
    
  //server: {
    //proxy: {
    //  '/api': {
    //    target: 'http://project-backend-svc:3000',
    //    changeOrigin: true,
    //    rewrite: (path) => path.replace(/^\/api/, ''),
    //    secure: false, // Disable SSL verification
    //    ws: true, // Proxy websockets
    //    configure: (proxy, options) => {
    //      // Proxy event handling
    //      proxy.on('error', (err, req, res) => {
    //        console.log('proxy error', err)
    //      })
    //      proxy.on('proxyReq', (proxyReq, req, res) => {
    //        console.log('Sending Request to the Target:', req.url)
    //      })
    //    }
    //  }
    //},
    
