/*
 * Copyright (c) 2026 Chandrasen. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, distribution, or use is prohibited.
 */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    outDir: "docs",
    emptyOutDir: true,
  },
});
