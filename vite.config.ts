import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  // Update this base path to match your GitHub repository name
  // Example: if your repo is "john-portfolio", change to "/john-portfolio/"
  base: process.env.NODE_ENV === "production" ? "/" : "/",
});