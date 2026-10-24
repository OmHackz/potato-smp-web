import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: '**/*.svg',
      svgrOptions: {
        exportType: 'default',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'esbuild',
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: (id: string) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router') || id.includes('@tanstack/react-query')) {
              return 'vendor';
            }
            return 'vendor';
          }
          if (id.includes('/components/ui/')) {
            return 'ui';
          }
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || '';
          if (/\.(woff2?|ttf|eot)$/.test(name)) {
            return 'assets/fonts/[name]-[hash].[ext]';
          }
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(name)) {
            return 'assets/images/[name]-[hash].[ext]';
          }
          if (name.endsWith('.css')) {
            return 'assets/css/[name]-[hash].[ext]';
          }
          return 'assets/[name]-[hash].[ext]';
        },
      },
    },
  },
  server: {
    port: 5173,
    host: true,
    open: true,
    proxy: {
      // Forward /api/* to a locally-running `wrangler pages dev` so the same
      // relative paths work in dev as they will on .pages.dev.
      "/api": {
        target: "http://localhost:8788",
        changeOrigin: true,
      },
    },
  },
  preview: {
    port: 4173,
    host: true,
  },
});