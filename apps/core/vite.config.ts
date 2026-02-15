import svg from "@poppanator/sveltekit-svg";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import devtoolsJson from "vite-plugin-devtools-json";

export default defineConfig({
  server: { port: 5001 },
  clearScreen: false,
  plugins: [sveltekit(), devtoolsJson(), svg()],
});
