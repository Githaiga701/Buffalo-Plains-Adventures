import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    hmr: { overlay: false },
  },
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  build: {
    target: "esnext",
    minify: "esbuild",
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          "react-core": ["react", "react-dom", "react-router-dom"],
          "framer": ["framer-motion"],
          "radix-ui": [
            "@radix-ui/react-accordion", "@radix-ui/react-alert-dialog",
            "@radix-ui/react-avatar", "@radix-ui/react-checkbox",
            "@radix-ui/react-collapsible", "@radix-ui/react-context-menu",
            "@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-hover-card", "@radix-ui/react-label",
            "@radix-ui/react-menubar", "@radix-ui/react-navigation-menu",
            "@radix-ui/react-popover", "@radix-ui/react-progress",
            "@radix-ui/react-radio-group", "@radix-ui/react-scroll-area",
            "@radix-ui/react-select", "@radix-ui/react-separator",
            "@radix-ui/react-slider", "@radix-ui/react-slot",
            "@radix-ui/react-switch", "@radix-ui/react-tabs",
            "@radix-ui/react-toast", "@radix-ui/react-toggle",
            "@radix-ui/react-toggle-group", "@radix-ui/react-tooltip",
          ],
          "recharts": ["recharts"],
          "forms": ["react-hook-form", "@hookform/resolvers", "zod"],
          "query": ["@tanstack/react-query"],
          "carousel": ["embla-carousel-react"],
        },
      },
    },
  },
}));