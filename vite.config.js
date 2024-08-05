import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


export default defineConfig(() => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  return {
    // vite config
    base: "/bhasha/",
    define: {
      // __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    plugins: [react()],
  }
})