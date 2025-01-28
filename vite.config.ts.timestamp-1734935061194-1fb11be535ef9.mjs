// vite.config.ts
import path from "path";
import react from "file:///D:/0_KingIT%20Solution/Serenity/serenity-wallet-extension-push/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///D:/0_KingIT%20Solution/Serenity/serenity-wallet-extension-push/node_modules/vite/dist/node/index.js";
import { nodePolyfills } from "file:///D:/0_KingIT%20Solution/Serenity/serenity-wallet-extension-push/node_modules/vite-plugin-node-polyfills/dist/index.js";
var __vite_injected_original_dirname = "D:\\0_KingIT Solution\\Serenity\\serenity-wallet-extension-push";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      include: ["buffer", "process"]
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: "index.html",
        background: "src/background.ts",
        content: "src/content.ts"
      },
      output: {
        entryFileNames: "[name].js"
      }
    }
  },
  define: {
    "process.env": {},
    global: "globalThis"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFwwX0tpbmdJVCBTb2x1dGlvblxcXFxTZXJlbml0eVxcXFxzZXJlbml0eS13YWxsZXQtZXh0ZW5zaW9uLXB1c2hcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXDBfS2luZ0lUIFNvbHV0aW9uXFxcXFNlcmVuaXR5XFxcXHNlcmVuaXR5LXdhbGxldC1leHRlbnNpb24tcHVzaFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovMF9LaW5nSVQlMjBTb2x1dGlvbi9TZXJlbml0eS9zZXJlbml0eS13YWxsZXQtZXh0ZW5zaW9uLXB1c2gvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiXHJcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIlxyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiXHJcbmltcG9ydCB7IG5vZGVQb2x5ZmlsbHMgfSBmcm9tICd2aXRlLXBsdWdpbi1ub2RlLXBvbHlmaWxscydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW1xyXG4gICAgcmVhY3QoKSxcclxuICAgIG5vZGVQb2x5ZmlsbHMoe1xyXG4gICAgICBpbmNsdWRlOiBbJ2J1ZmZlcicsICdwcm9jZXNzJ10sXHJcbiAgICB9KSxcclxuICBdLFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGJ1aWxkOiB7XHJcbiAgICBvdXREaXI6ICdkaXN0JyxcclxuICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgaW5wdXQ6IHtcclxuICAgICAgICBtYWluOiAnaW5kZXguaHRtbCcsXHJcbiAgICAgICAgYmFja2dyb3VuZDogJ3NyYy9iYWNrZ3JvdW5kLnRzJyxcclxuICAgICAgICBjb250ZW50OiAnc3JjL2NvbnRlbnQudHMnLCBcclxuICAgICAgfSxcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgZW50cnlGaWxlTmFtZXM6ICdbbmFtZV0uanMnLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGRlZmluZToge1xyXG4gICAgJ3Byb2Nlc3MuZW52Jzoge30sXHJcbiAgICBnbG9iYWw6ICdnbG9iYWxUaGlzJyxcclxuICB9LFxyXG59KSJdLAogICJtYXBwaW5ncyI6ICI7QUFBZ1gsT0FBTyxVQUFVO0FBQ2pZLE9BQU8sV0FBVztBQUNsQixTQUFTLG9CQUFvQjtBQUM3QixTQUFTLHFCQUFxQjtBQUg5QixJQUFNLG1DQUFtQztBQUt6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixjQUFjO0FBQUEsTUFDWixTQUFTLENBQUMsVUFBVSxTQUFTO0FBQUEsSUFDL0IsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLGVBQWU7QUFBQSxNQUNiLE9BQU87QUFBQSxRQUNMLE1BQU07QUFBQSxRQUNOLFlBQVk7QUFBQSxRQUNaLFNBQVM7QUFBQSxNQUNYO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDTixnQkFBZ0I7QUFBQSxNQUNsQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixlQUFlLENBQUM7QUFBQSxJQUNoQixRQUFRO0FBQUEsRUFDVjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
