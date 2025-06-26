import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env
  },
  server: {
    host: true,
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      '@tailwindConfig': path.resolve(__dirname, 'tailwind.config.js'),
      '@components': path.resolve(__dirname, './src/components'),
      '@LanguageContext': path.resolve(__dirname, './src/utils/LanguageContext'),
      '@tRFunc': path.resolve(__dirname, './src/components/functions'),
      "@allFunctions": path.resolve(__dirname, "./src/components/functions"),
      '@utils': path.resolve(__dirname, "./src/utils"),
      '@images': path.resolve(__dirname, "./src/images"),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
    include: [
      '@tailwindConfig',
    ]
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  }
})
