import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

import fs from "fs";
import path from "path";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {
      name: 'ensure-generated-dir',
      buildStart() {
        const dir = path.resolve(__dirname, 'src/generated');
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
          console.log('✅ Created src/generated directory');
        }
      },
    },
    react(),
    TanStackRouterVite({
      generatedRouteTree: './src/generated/routeTree.gen.ts',
    }),
  ],
  define: {
    "process.env": {},
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
