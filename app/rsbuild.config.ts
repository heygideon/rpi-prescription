import { defineConfig } from "@rsbuild/core";
import tailwindcss from "tailwindcss";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  html: {
    template: "./index.html",
  },
  source: {
    entry: {
      index: "./src/main.tsx",
    },
  },
  plugins: [pluginReact()],
  tools: {
    postcss: (opts, { addPlugins }) => {
      addPlugins(tailwindcss);
    },
  },
  server: { port: 5173 },
});
