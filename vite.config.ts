import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      include: ['buffer', 'process'],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        background: 'src/background.ts',
        content: 'src/content.ts', 
      },
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
  define: {
    'process.env': {},
    global: 'globalThis',
  },
})