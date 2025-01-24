import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  preview: {
    port: process.env.PORT || 10000, // Use Render's environment variable for port
    strictPort: true, // Fail if port is unavailable
    host: true, // Expose to the network
    allowedHosts: [
      'canine-compass.onrender.com', // Allow your Render domain
      'localhost', // Allow local development
    ],
  },
  server: {
    port: 5173,
  },
});
