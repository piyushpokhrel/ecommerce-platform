import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
plugins: [react()],
server: {
    proxy: {
    '/api': {
        target: 'http://backend:5000',
        changeOrigin: true,
        secure: false,
    }
    },
    port: 3000,
    host: true,
    open: true,
    hmr: {
        overlay: false
    }
},
build: {
    sourcemap: true,
    rollupOptions: {
    output: {
        manualChunks: {
        'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        'motion': ['framer-motion'],
        'store': ['zustand']
        }
    }
    }
}
});