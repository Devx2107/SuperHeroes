import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react()],
  publicDir: "public",
  server: {
    host: "127.0.0.1",
    port: 5173,
    proxy: { "/api": "http://127.0.0.1:3000" },
  },
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        ["heroes", "battle", "quiz", "trivia", "votes"].map((page) => [
          page,
          resolve(import.meta.dirname, `${page}.html`),
        ]),
      ),
      output: {
        manualChunks: {
          motion: ["framer-motion"],
          three: ["three"],
          gsap: ["gsap"],
        },
      },
    },
  },
});
